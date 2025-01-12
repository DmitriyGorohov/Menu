import React, { type FC, useMemo } from 'react'
import {
  type StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Colors from '../styles/Colors.ts'

interface CustomCheckboxProps {
  value: boolean
  onChange: () => void
  borderWidth?: number
  customBorderRadius?: number
  size?: number
  boxType?: 'circle' | 'square'
  checkColor?: string
  checkBackgroundColor?: string
  borderColor?: string
  checkBorderColor?: string
  label?: string
  labelPosition?: 'left' | 'right'
  labelStyle?: StyleProp<ViewStyle>
  colorLabel?: string
  containerStyle?: StyleProp<ViewStyle>
}

const defaultSize = 24

export const Checkbox: FC<CustomCheckboxProps> = ({
  value,
  onChange,
  size = defaultSize,
  boxType,
  customBorderRadius = 6,
  checkColor,
  borderWidth,
  checkBackgroundColor,
  checkBorderColor,
  borderColor: customBorderColor,
  label,
  labelPosition = 'right',
  labelStyle,
  colorLabel,
  containerStyle,
}): React.JSX.Element => {
  const isCircle = useMemo(() => boxType === 'circle', [boxType])
  const backgroundColorAnimation = useSharedValue(0)

  const borderRadius = useMemo(() => {
    if (customBorderRadius && !isCircle) {
      return customBorderRadius
    }
    if (isCircle) {
      if (size) {
        return size / 2
      }
      return defaultSize / 2
    }
    return 0
  }, [customBorderRadius, isCircle, size])

  const borderColor = useMemo(() => {
    if (value) {
      return checkBorderColor ?? Colors.black
    }
    return customBorderColor ?? Colors.black
  }, [customBorderColor, checkBorderColor, value])

  const animationBackgroundColor = useAnimatedStyle(() => {
    const backgroundInterpolate = interpolateColor(
      backgroundColorAnimation.value,
      [0, 1],
      ['transparent', checkBackgroundColor ?? Colors.black]
    )

    return {
      backgroundColor: backgroundInterpolate,
    }
  })

  const stylesWrapper: StyleProp<ViewStyle> = useMemo(
    () => ({
      width: size,
      height: size,
      borderWidth: borderWidth ?? 1.5,
      borderColor,
      borderRadius,
    }),
    [borderColor, borderRadius, borderWidth, size]
  )

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onChange()
        backgroundColorAnimation.value = withTiming(value ? 0 : 1)
      }}
      style={[styles.container, containerStyle]}
    >
      {labelPosition === 'left' && (
        <Text style={[styles.label, labelStyle, { color: colorLabel }]}>
          {label}
        </Text>
      )}
      <Animated.View
        style={[styles.wrapper, stylesWrapper, animationBackgroundColor]}
      >
        {value && <Text style={{ color: Colors.white, fontSize: 10 }}>✓</Text>}
      </Animated.View>
      {labelPosition === 'right' && (
        <Text style={[styles.label, labelStyle, { color: colorLabel }]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginHorizontal: 8,
  },
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
})
