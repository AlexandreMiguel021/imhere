import { colors } from '@/theme/colors'
import { Stack, type ErrorBoundaryProps } from 'expo-router'
import { Try } from 'expo-router/build/views/Try'
import { StatusBar } from 'expo-status-bar'
import { Text, TouchableOpacity, View } from 'react-native'

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.teal500,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
      }}
    >
      <Text style={{ color: colors.lightOffWhite, fontSize: 18 }}>Ops... Ocorreu um erro!</Text>
      <Text style={{ color: colors.lightOffWhite, fontSize: 14 }}>{error.message}</Text>
      <TouchableOpacity style={{ backgroundColor: colors.teal300, padding: 8, borderRadius: 4 }}>
        <Text onPress={retry} style={{ color: colors.lightOffWhite, fontSize: 14 }}>
          Tentar novamente?
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default function HomeLayout() {
  return (
    <>
      <Try catch={ErrorBoundary}>
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
          <Stack.Screen name="event-details/[id]" options={{ title: 'Detalhes Evento' }} />
        </Stack>
      </Try>
    </>
  )
}
