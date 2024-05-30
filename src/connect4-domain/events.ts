export enum EventTypes {
  PLAYER_MOVE_FAILED = 'PLAYER_MOVE_FAILED',
  PLAYER_MOVED = 'PLAYER_MOVED',
}

type EventPayload = {
  message?: string
}
export interface Event {
  type: EventTypes
  payload?: EventPayload
}

interface PlayerMoveFailedEventPayload extends EventPayload {}
interface PlayerMovedEventPayload extends EventPayload {}
export class PlayerMoveFailedEvent implements Event {
  type: EventTypes.PLAYER_MOVE_FAILED
  payload?: PlayerMoveFailedEventPayload

  constructor(eventPayload: PlayerMoveFailedEventPayload) {
    this.type = EventTypes.PLAYER_MOVE_FAILED
    this.payload = eventPayload
  }
}

export class PlayerMovedEvent implements Event {
  type: EventTypes.PLAYER_MOVED
  payload?: PlayerMovedEventPayload

  constructor(eventPayload?: PlayerMovedEventPayload) {
    this.type = EventTypes.PLAYER_MOVED
    this.payload = eventPayload
  }
}

const createPlayerMoveFailedEvent = (
  eventPayload: PlayerMoveFailedEventPayload,
): PlayerMoveFailedEvent => new PlayerMoveFailedEvent(eventPayload)

const createPlayerMovedEvent = (eventPayload?: PlayerMovedEventPayload): PlayerMovedEvent =>
  new PlayerMovedEvent(eventPayload)
export { createPlayerMoveFailedEvent, createPlayerMovedEvent }
