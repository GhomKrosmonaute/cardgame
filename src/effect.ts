export interface EffectOptions {
  name: () => string
  description: () => string
}

export abstract class Effect {
  protected constructor(public readonly options: EffectOptions) {}
}

export interface TriggerEffectOptions extends EffectOptions {
  trigger: () => boolean
}

export class TriggerEffect extends Effect {
  constructor(public readonly options: TriggerEffectOptions) {
    super(options)
  }
}

export interface PassiveEffectOptions extends EffectOptions {
  condition: () => boolean
}

export class PassiveEffect extends Effect {
  constructor(public readonly options: PassiveEffectOptions) {
    super(options)
  }
}

const effect = new PassiveEffect({
  name: () => "My Effect",
  description: () => "My Effect Description",
  condition: () => true,
})
