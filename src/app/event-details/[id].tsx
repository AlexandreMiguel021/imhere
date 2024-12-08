import { Event } from '@/models/events'
import { useEvents } from '@/store/useEvents'
import { colors } from '@/theme/colors'
import { useGlobalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export default function EventDetails() {
  const { id } = useGlobalSearchParams()

  if (!id) {
    throw new Error('ID não encontrado')
  }

  if (typeof id !== 'string') {
    throw new Error('Formato do ID inválido.')
  }

  const event = useEvents.getState().getEvent(id)

  if (event instanceof Event) {
    return (
      <View style={{ backgroundColor: colors.teal500, flex: 1, padding: 16, gap: 4 }}>
        <Text style={{ fontSize: 28, color: colors.lightOffWhite }}>{event.title}</Text>
        <Text style={{ fontSize: 14, color: colors.lightOffWhite }}>{event.subtitle}</Text>
      </View>
    )
  }

  throw new Error('Formato Evento inválido!')
}
