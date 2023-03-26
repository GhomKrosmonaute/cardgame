export interface EffectOptions<StackNames extends string> {
  name: () => string
  description: () => string
}

export interface TriggerEffectOptions<StackNames extends string>
  extends EffectOptions<StackNames> {
  /**
   * Returns true if the effect can be triggered, false otherwise.
   */
  condition: () => boolean

  /**
   * Trigger the effect.
   */
  trigger: () => void
}

export interface PassiveEffectOptions<StackNames extends string>
  extends EffectOptions<StackNames> {
  /**
   * Returns true if the effect can be set up, false otherwise.
   */
  condition: () => boolean

  /**
   * Set up the effect.
   */
  setup: () => void

  /**
   * Remove the effect.
   */
  teardown: () => void

  /**
   * Returns true if the effect can be torn down, false otherwise.
   */
  onTeardown?: () => boolean
}

export abstract class Effect<StackNames extends string> {
  protected constructor(public readonly options: EffectOptions<StackNames>) {}
}

/**
 * A trigger effect is an effect that can be triggered only when the condition is met.
 */
export class TriggerEffect<
  StackNames extends string
> extends Effect<StackNames> {
  constructor(public readonly options: TriggerEffectOptions<StackNames>) {
    super(options)
  }

  /**
   * Trigger the effect.
   * Returns true if the effect was triggered, false otherwise.
   */
  trigger(): boolean {
    if (!this.options.condition()) {
      return false
    }

    this.options.trigger()

    return true
  }
}

/**
 * A passive effect is an effect that is always active.
 */
export class PassiveEffect<
  StackNames extends string
> extends Effect<StackNames> {
  constructor(public readonly options: PassiveEffectOptions<StackNames>) {
    super(options)
  }

  /**
   * Set up the effect.
   * Returns true if the effect was set up, false otherwise.
   */
  public setup(): boolean {
    if (!this.options.condition()) {
      return false
    }

    this.options.setup()

    return true
  }

  /**
   * Update the effect.
   * Tear down the effect if the condition is no longer met.
   */
  public update(): void {
    if (!this.options.condition()) {
      this.teardown()
    }
  }

  /**
   * Tear down the effect.
   * If the effect has an onTeardown callback, it will be called before tearing down the effect.
   */
  public teardown(): void {
    if (this.options.onTeardown) {
      if (!this.options.onTeardown()) {
        return
      }
    }

    this.options.teardown()
  }
}
