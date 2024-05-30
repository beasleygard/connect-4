export enum EventTypes {
  PLAYER_MOVE_FAILED = 'PLAYER_MOVE_FAILED',
}

type EventPayload = {
  message: string
}
export interface Event {
  type: EventTypes
  payload: EventPayload
}

interface PlayerMoveFailedEventPayload extends EventPayload {}
export class PlayerMoveFailedEvent implements Event {
  type: EventTypes.PLAYER_MOVE_FAILED
  payload: PlayerMoveFailedEventPayload

  constructor(eventPayload: PlayerMoveFailedEventPayload) {
    this.type = EventTypes.PLAYER_MOVE_FAILED
    this.payload = eventPayload
  }
}

const createPlayerMoveFailedEvent = (
  eventPayload: PlayerMoveFailedEventPayload,
): PlayerMoveFailedEvent => new PlayerMoveFailedEvent(eventPayload)

export { createPlayerMoveFailedEvent }
