import { Card } from "./card"

export interface StackOptions<StackNames extends string> {
  cards: Card<StackNames>[]
  onAddToEnd?: (
    from: Stack<StackNames>,
    ...cards: Card<StackNames>[]
  ) => boolean
  onAddToStart?: (
    from: Stack<StackNames>,
    ...cards: Card<StackNames>[]
  ) => boolean
  onShuffle?: () => boolean
  onRemove?: (...cards: Card<StackNames>[]) => boolean
  onCancel?: () => void
}

export class Stack<StackNames extends string> {
  constructor(public readonly options: StackOptions<StackNames>) {}

  addToEnd(from: Stack<StackNames>, ...cards: Card<StackNames>[]): boolean {
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

  addToStart(from: Stack<StackNames>, ...cards: Card<StackNames>[]): boolean {
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
