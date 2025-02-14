import { motion } from 'framer-motion'
import {
  Box,
  Button,
  Flex,
  Text,
  BoxProps,
  ButtonProps,
  FlexProps,
  TextProps,
} from '@chakra-ui/react'
import { HTMLMotionProps } from 'framer-motion'

export type MotionBoxProps = BoxProps & HTMLMotionProps<'div'>
export type MotionFlexProps = FlexProps & HTMLMotionProps<'div'>
export type MotionTextProps = TextProps & HTMLMotionProps<'div'>
export type MotionButtonProps = ButtonProps & HTMLMotionProps<'button'>

export const MotionBox = motion<BoxProps>(Box) as React.ComponentType<MotionBoxProps>
export const MotionFlex = motion<FlexProps>(Flex) as React.ComponentType<MotionFlexProps>
export const MotionText = motion<TextProps>(Text) as React.ComponentType<MotionTextProps>
export const MotionButton = motion<ButtonProps>(Button) as React.ComponentType<MotionButtonProps> 