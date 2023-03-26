import { Effect } from "./effect"

export interface CardOptions<StackNames extends string> {
  name: () => string
  description: () => string
  effects: Effect<StackNames>[]
}

export class Card<StackNames extends string> {
  constructor(public readonly options: CardOptions<StackNames>) {}
}
