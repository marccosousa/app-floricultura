import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  customStyle: string;
  styleText?: string;
}
export function Button({ text, customStyle, styleText, ...props }: ButtonProps) {
  return (
    <View>
      <TouchableOpacity {...props} className={customStyle}>
        <Text className={`font-bold ${styleText ? styleText : ''}`}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
