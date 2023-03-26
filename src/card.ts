import { Effect } from "./effect"

export interface CardOptions {
  name: () => string
  description: () => string
  effects: Effect[]
}

export class Card {
  constructor(public readonly options: CardOptions) {}
}
