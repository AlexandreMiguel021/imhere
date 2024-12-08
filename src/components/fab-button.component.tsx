import { colors } from '@/theme/colors'
import { Link } from 'expo-router'
import { LinkComponent, LinkProps } from 'expo-router/build/link/Link'
import { Text, TouchableOpacity } from 'react-native'

interface FabButtonProps {
  link: LinkProps
}

export function FabButton({ link }: FabButtonProps) {
  return (
    <Link {...link} asChild>
      <TouchableOpacity
        style={{
          height: 56,
          width: 56,
          borderRadius: 56,
          bottom: 56,
          right: 16,
          position: 'absolute',
          backgroundColor: colors.teal100,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ color: colors.lightOffWhite, fontSize: 32 }}>+</Text>
      </TouchableOpacity>
    </Link>
  )
}
