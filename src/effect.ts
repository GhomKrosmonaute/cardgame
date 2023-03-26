export interface EffectOptions<StackNames extends string> {
  name: () => string
  description: () => string
}

export interface TriggerEffectOptions<StackNames extends string>
  extends EffectOptions<StackNames> {
  trigger: () => boolean
}

export interface PassiveEffectOptions<StackNames extends string>
  extends EffectOptions<StackNames> {
  condition: () => boolean
}

export abstract class Effect<StackNames extends string> {
  protected constructor(public readonly options: EffectOptions<StackNames>) {}
}

export class TriggerEffect<
  StackNames extends string
> extends Effect<StackNames> {
  constructor(public readonly options: TriggerEffectOptions<StackNames>) {
    super(options)
  }
}

export class PassiveEffect<
  StackNames extends string
> extends Effect<StackNames> {
  constructor(public readonly options: PassiveEffectOptions<StackNames>) {
    super(options)
  }
}
