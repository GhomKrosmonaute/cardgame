import { Stack } from "./stack"
import { TriggerEffect } from "./effect"

export interface CoreOptions<StackNames extends string> {
  stacks: Record<StackNames, Stack<StackNames>>
  onEffectTrigger?: (effect: TriggerEffect<StackNames>) => boolean
}

export class Core<StackNames extends string> {
  constructor(public readonly options: CoreOptions<StackNames>) {}

  triggerEffect(effect: TriggerEffect<StackNames>): boolean {
    if (this.options.onEffectTrigger) {
      if (!this.options.onEffectTrigger(effect)) {
        return false
      }
    }

    return true
  }
}
