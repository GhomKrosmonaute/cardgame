import { Card } from "./card"
import { Stack } from "./stack"
import { Core } from "./core"
import { PassiveEffect, TriggerEffect } from "./effect"

const core = new Core({
  stacks: {
    draw: new Stack({
      cards: [
        new Card({
          name: () => "My Card",
          description: () => "My Card Description",
          effects: [
            new PassiveEffect({
              name: () => "My Effect",
              description: () => "My Effect Description",
              condition: () => true,
            }),
          ],
        }),
      ],
    }),
    board: new Stack({
      cards: [
        new Card({
          name: () => "My Card",
          description: () => "My Card Description",
          effects: [
            new TriggerEffect({
              name: () => "My Effect",
              description: () => "My Effect Description",
              trigger: () => true,
            }),
          ],
        }),
      ],
    }),
  },
})
