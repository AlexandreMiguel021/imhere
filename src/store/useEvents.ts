import { Event } from '@/models/events'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const eventsList: Event[] = [
  new Event({ title: 'Birthday Party', subtitle: 'A fun celebration', id: '1', key: '1' }),
  new Event({ title: 'Wedding', subtitle: 'A beautiful ceremony', id: '2', key: '2' }),
  new Event({ title: 'Conference', subtitle: 'Tech industry talks', id: '3', key: '3' })
]

export interface EventsStore {
  events: Event[]
  addEvent: (newEvent: Event) => void
  removeEvent: (eventId: string) => void
  updateEvent: (updatedEvent: Event) => void
  getEvent: (eventId: string) => Event | Error | undefined
}

const useEvents = create<EventsStore>()(
  immer((set, get) => ({
    events: eventsList,
    addEvent: (event) => {
      set((state) => {
        state.events.push(event)
      })
    },
    removeEvent: (eventId) => {
      set((state) => {
        const eventInd = state.events.findIndex((event) => event.id === eventId)

        if (eventInd !== -1) {
          state.events.splice(eventInd, 1)
        }
      })
    },
    updateEvent: (updatedEvent) => {
      set((state) => {
        const eventInd = state.events.findIndex((event) => event.id === updatedEvent.id)
        updatedEvent.key = new Date().toISOString()

        if (eventInd === -1) {
          throw new Error('Dados inválidos, não foi possível editar evento.')
        }

        state.events = [
          ...state.events.slice(0, eventInd),
          updatedEvent,
          ...state.events.slice(eventInd + 1)
        ]
      })
    },
    getEvent: (eventId) => {
      const event = get().events.find((event) => event.id === eventId)

      if (!event) {
        throw new Error('Não foi possível obter evento com id selecionado.')
      }

      return get().events.find((event) => event.id === eventId)
    }
  }))
)

export { useEvents }
