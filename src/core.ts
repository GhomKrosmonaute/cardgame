import { Stack } from "./stack"
import { TriggerEffect } from "./effect"

export interface CoreOptions<StackNames extends string> {
  stacks: Record<StackNames, Stack>
  onEffectTrigger?: (effect: TriggerEffect) => boolean
}

export class Core<StackNames extends string> {
  constructor(public readonly options: CoreOptions<StackNames>) {}

  triggerEffect(effect: TriggerEffect): boolean {
    if (this.options.onEffectTrigger) {
      if (!this.options.onEffectTrigger(effect)) {
        return false
      }
    }

    return true
  }
}
