import { Card } from "./card"

export interface StackOptions<StackNames extends string> {
  /**
   * The cards in the stack.
   */
  cards: Card<StackNames>[]

  /**
   * Called when cards are added to the stack.
   * Return false to cancel the addition.
   */
  onAdd?: (from: Stack<StackNames>, ...cards: Card<StackNames>[]) => boolean

  /**
   * Called when cards are added to the end of the stack.
   * Return false to cancel the addition.
   */
  onAddToEnd?: (
    from: Stack<StackNames>,
    ...cards: Card<StackNames>[]
  ) => boolean

  /**
   * Called when cards are added to the start of the stack.
   * Return false to cancel the addition.
   */
  onAddToStart?: (
    from: Stack<StackNames>,
    ...cards: Card<StackNames>[]
  ) => boolean

  /**
   * Called when cards are shuffled.
   * Return false to cancel the shuffle.
   */
  onShuffle?: () => boolean

  /**
   * Called when cards are removed from the stack.
   * Return false to cancel the removal.
   */
  onRemove?: (...cards: Card<StackNames>[]) => boolean

  /**
   * Called when a stack action is cancelled.
   */
  onCancel?: () => void
}

/**
 * A stack of cards.
 */
export class Stack<StackNames extends string> {
  constructor(public readonly options: StackOptions<StackNames>) {}

  /**
   * Add cards to the end of the stack.
   * Returns true if the cards were added, false otherwise.
   */
  addToEnd(from: Stack<StackNames>, ...cards: Card<StackNames>[]): boolean {
    if (this.options.onAdd) {
      if (!this.options.onAdd(from, ...cards)) {
        this.options.onCancel?.()

        return false
      }
    }

    if (this.options.onAddToEnd) {
      if (!this.options.onAddToEnd(from, ...cards)) {
        this.options.onCancel?.()

        return false
      }
    }

    if (!from.remove(...cards)) {
      return false
    }

    this.options.cards.push(...cards)

    return true
  }

  /**
   * Add cards to the start of the stack.
   * Returns true if the cards were added, false otherwise.
   */
  addToStart(from: Stack<StackNames>, ...cards: Card<StackNames>[]): boolean {
    if (this.options.onAdd) {
      if (!this.options.onAdd(from, ...cards)) {
        this.options.onCancel?.()

        return false
      }
    }

    if (this.options.onAddToStart) {
      if (!this.options.onAddToStart(from, ...cards)) {
        this.options.onCancel?.()

        return false
      }
    }

    if (!from.remove(...cards)) {
      return false
    }

    this.options.cards.unshift(...cards)

    return true
  }

  /**
   * Shuffle the cards in the stack.
   * Returns true if the cards were shuffled, false otherwise.
   */
  shuffle(): boolean {
    if (this.options.onShuffle) {
      if (!this.options.onShuffle()) {
        this.options.onCancel?.()

        return false
      }
    }

    this.options.cards.sort(() => Math.random() - 0.5)

    return true
  }

  /**
   * Remove cards from the stack.
   * Returns true if the cards were removed, false otherwise.
   */
  remove(...cards: Card<StackNames>[]): boolean {
    if (this.options.onRemove) {
      if (!this.options.onRemove(...cards)) {
        this.options.onCancel?.()

        return false
      }
    }

    this.options.cards = this.options.cards.filter(
      (card) => !cards.includes(card)
    )

    return true
  }
}
