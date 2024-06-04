import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  customStyle: string;
  styleText?: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}
export function Button({
  text,
  customStyle,
  styleText,
  loading,
  disabled,
  onPress,
  ...props
}: ButtonProps) {
  const handleOnPress = () => {
    if (!loading && !disabled && onPress) {
      onPress();
    }
  };

  const renderText = () => {
    if (loading) {
      return <ActivityIndicator color="#000" />;
    } else {
      return <Text className={`font-bold ${styleText ? styleText : ''}`}>{text}</Text>;
    }
  };

  return (
    <View>
      <TouchableOpacity {...props} className={customStyle} onPress={handleOnPress}>
        {renderText()}
      </TouchableOpacity>
    </View>
  );
}
