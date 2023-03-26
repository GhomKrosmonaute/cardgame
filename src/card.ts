import { Effect } from "./effect"

export interface CardOptions<StackNames extends string> {
  /**
   * The name of the card.
   */
  name: () => string

  /**
   * The description of the card.
   */
  description: () => string

  /**
   * The effects of the card.
   */
  effects: Effect<StackNames>[]
}

/**
 * A card.
 */
export class Card<StackNames extends string> {
  constructor(public readonly options: CardOptions<StackNames>) {}
}
