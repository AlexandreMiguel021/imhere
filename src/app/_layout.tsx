import { colors } from '@/theme/colors'
import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function HomeLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.teal600 },
          headerTintColor: colors.lightOffWhite,
          headerTitleStyle: { fontWeight: 'bold' }
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Eventos' }} />
        <Stack.Screen name="create-edit-event" options={{ title: 'Criar Evento' }} />
      </Stack>
    </>
  )
}
