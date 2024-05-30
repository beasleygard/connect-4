export enum EventTypes {
  PLAYER_MOVE_FAILED = 'PLAYER_MOVE_FAILED',
}
type PlayerMoveFailedEventPayload = {
  message: string
}
export class PlayerMoveFailedEvent {
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
