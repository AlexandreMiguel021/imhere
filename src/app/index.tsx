import { EventCard } from '@/components/event-card.component'
import { FabButton } from '@/components/fab-button.component'
import { Event } from '@/models/events'
import { useEvents } from '@/store/useEvents'
import { colors } from '@/theme/colors'
import { useCallback } from 'react'
import { ListRenderItem, Text, View } from 'react-native'
import Animated, { CurvedTransition } from 'react-native-reanimated'

export default function Home() {
  const events = useEvents((state) => state.events)

  const renderitem: ListRenderItem<Event> = useCallback(({ item: event }) => {
    return <EventCard event={event} />
  }, [])

  return (
    <View style={{ backgroundColor: colors.teal500, flex: 1, padding: 16, gap: 16 }}>
      <Animated.FlatList
        data={events}
        contentContainerStyle={{ gap: 16 }}
        keyExtractor={(item) => item.key}
        renderItem={renderitem}
        itemLayoutAnimation={CurvedTransition.delay(250)}
        ListEmptyComponent={
          <Text style={{ color: colors.lightOffWhite, textAlign: 'center', fontSize: 16 }}>
            Não há eventos para serem listados, aperta no botão "+" para adicionar um novo evento.
          </Text>
        }
      />

      <FabButton link={{ href: '/create-edit-event' }} />
    </View>
  )
}
