import { Event } from '@/models/events'
import { useEvents } from '@/store/useEvents'
import { colors } from '@/theme/colors'
import { Link } from 'expo-router'
import { memo } from 'react'
import { Alert, Text, TouchableOpacity } from 'react-native'
import Animated, { FadeOut } from 'react-native-reanimated'

interface EventCardProps {
  event: Event
}

function _EventCard({ event }: EventCardProps) {
  const removeEvent = useEvents((state) => state.removeEvent)

  return (
    <Link href={{ pathname: '/create-edit-event', params: { eventId: event.id } }} asChild>
      <TouchableOpacity
        onLongPress={() => {
          Alert.alert('Desejar remover?', 'Ação não pode ser revertida após exclusão!', [
            { text: 'Remover', onPress: () => removeEvent(event.id) },
            { text: 'Cancelar', onPress: undefined }
          ])
        }}
      >
        <Animated.View
          exiting={FadeOut}
          style={{
            backgroundColor: colors.teal400,
            padding: 12,
            borderRadius: 4,
            gap: 4
          }}
        >
          <Text
            numberOfLines={1}
            style={{ fontSize: 18, color: colors.lightOffWhite, fontWeight: 600 }}
          >
            {event.title}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.lightOffWhite + 80 }}>
            {event.subtitle}
          </Text>
          <Link
            asChild
            href={{
              pathname: '/event-details/[id]',
              params: { id: event.id }
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: colors.teal600,
                alignSelf: 'flex-end',
                padding: 4,
                paddingHorizontal: 8,
                borderRadius: 4,
                marginTop: 4
              }}
            >
              <Text style={{ color: colors.lightOffWhite + 90 }}>Detalhes</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  )
}

export const EventCard = memo(_EventCard)
