import { Event } from '@/models/events'
import { useEvents } from '@/store/useEvents'
import { colors } from '@/theme/colors'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function CreateEditEvent() {
  const addEvent = useEvents((state) => state.addEvent)
  const getEvent = useEvents((state) => state.getEvent)
  const updateEvent = useEvents((state) => state.updateEvent)

  const [title, setTitle] = useState<string>('')
  const [subtitle, setSubtitle] = useState<string>('')

  const { eventId }: { eventId: string } = useLocalSearchParams()
  const { setOptions, goBack } = useNavigation()

  const isEditOperation = eventId!!

  const handleSaveEvent = () => {
    try {
      const fields = { title, subtitle }
      const areFieldsValid = Object.entries(fields).every(([key, value]) => {
        return value && value.trim() !== ''
      })

      if (!areFieldsValid) {
        throw new Error('Por favor, informe os campos do Evento.')
      }

      if (isEditOperation) {
        const event = getEvent(eventId)

        if (event instanceof Event) {
          event.title = title
          event.subtitle = subtitle
          updateEvent(event)
        }
      } else {
        const newEvent = new Event({ title, subtitle })
        addEvent(newEvent)
      }

      goBack()
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message)
      }
    }
  }

  useEffect(() => {
    try {
      if (isEditOperation) {
        setOptions({ title: 'Editar evento' })

        const event = getEvent(eventId)

        if (event instanceof Event) {
          setTitle(event.title)
          setSubtitle(event.subtitle)
        } else {
          throw new Error('Não foi possível localizar evento.')
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Erro', error.message)
      }
    }
  }, [])

  return (
    <View style={{ backgroundColor: colors.teal500, flex: 1, padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 18, color: colors.lightOffWhite, fontWeight: 300 }}>
        Preencha os detalhes do seu evento abaixo.
      </Text>
      <View style={styleSheet.inputContainer}>
        <Text style={styleSheet.label}>Título</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styleSheet.textInput}
          cursorColor={colors.lightOffWhite}
          selectionColor={colors.lightOffWhite}
          placeholder="Informe o título..."
          placeholderTextColor={colors.lightOffWhite + 70}
        />
      </View>
      <View style={styleSheet.inputContainer}>
        <Text style={styleSheet.label}>Subtítulo</Text>
        <TextInput
          value={subtitle}
          onChangeText={setSubtitle}
          style={styleSheet.textInput}
          cursorColor={colors.lightOffWhite}
          selectionColor={colors.lightOffWhite}
          placeholder="Informe o subtítulo..."
          placeholderTextColor={colors.lightOffWhite + 70}
        />
      </View>

      <TouchableOpacity style={styleSheet.button} onPress={handleSaveEvent}>
        <Text style={styleSheet.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styleSheet = StyleSheet.create({
  textInput: {
    backgroundColor: colors.teal600,
    padding: 16,
    borderRadius: 4,
    fontSize: 14,
    color: colors.lightOffWhite,
    tintColor: colors.lightOffWhite
  },
  label: {
    color: colors.lightOffWhite,
    fontSize: 12
  },
  inputContainer: {
    gap: 8
  },
  button: {
    backgroundColor: colors.teal200,
    padding: 16,
    borderRadius: 4,
    alignItems: 'center'
  },
  buttonText: {
    color: colors.lightOffWhite,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.5
  }
})
