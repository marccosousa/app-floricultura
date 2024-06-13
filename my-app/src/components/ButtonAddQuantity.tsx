import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
interface ButtonAddQuantityProps extends TouchableOpacityProps {
  onPress: () => void;
}
export function ButtonAddQuantity({ onPress, ...props }: ButtonAddQuantityProps) {
  return (
    <TouchableOpacity
      className="inline-flex items-center px-4 py-2 bg-green-600 rounded-md mr-2"
      onPress={onPress}
      {...props}
    >
      <Icon name="plus" size={20} />
    </TouchableOpacity>
  );
}
