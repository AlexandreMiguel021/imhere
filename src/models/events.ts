import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export class Event {
  public title!: string
  public subtitle!: string
  public key!: string
  public readonly id!: string

  constructor(event: Partial<Event>) {
    Object.assign(this, { ...event, key: event.key || new Date().toISOString(), id: uuidv4() })
  }
}
