import { Stack } from "./stack"
import { TriggerEffect } from "./effect"
import { Card } from "./card"

export interface CoreOptions<StackNames extends string> {
  /**
   * The stacks in the game.
   * Example: ```
   * {
   *    draw: new Stack(),
   *    board: new Stack(),
   *    discard: new Stack(),
   *    hand: new Stack(),
   * }
   * ```
   */
  stacks: Record<StackNames, Stack<StackNames>>

  /**
   * Called when an effect is triggered.
   * Return false to cancel the trigger.
   */
  onEffectTrigger?: (effect: TriggerEffect<StackNames>) => boolean

  /**
   * Called when a card is removed from all stacks.
   * Return false to cancel the removal.
   */
  onCardRemoved?: (card: Card<StackNames>) => boolean
}

/**
 * The core of the card system.
 */
export class Core<StackNames extends string> {
  constructor(public readonly options: CoreOptions<StackNames>) {}

  /**
   * Trigger an effect.
   * Returns true if the effect was triggered, false otherwise.
   */
  triggerEffect(effect: TriggerEffect<StackNames>): boolean {
    if (this.options.onEffectTrigger) {
      if (!this.options.onEffectTrigger(effect)) {
        return false
      }
    }

    return effect.trigger()
  }

  /**
   * Remove a card from all stacks.
   * Returns true if the card was removed, false otherwise.
   */
  removeCard(card: Card<StackNames>): boolean {
    if (this.options.onCardRemoved) {
      if (!this.options.onCardRemoved(card)) {
        return false
      }
    }

    for (const stackName in this.options.stacks) {
      this.options.stacks[stackName].remove(card)
    }

    return true
  }
}
