import { Card } from "./card"

export interface StackOptions {
  cards: Card[]
  onAddToEnd?: (from: Stack, ...cards: Card[]) => boolean
  onAddToStart?: (from: Stack, ...cards: Card[]) => boolean
  onShuffle?: () => boolean
  onRemove?: (...cards: Card[]) => boolean
  onCancel?: () => void
}

export class Stack {
  constructor(public readonly options: StackOptions) {}

  addToEnd(from: Stack, ...cards: Card[]): boolean {
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

  addToStart(from: Stack, ...cards: Card[]): boolean {
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

  remove(...cards: Card[]): boolean {
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
