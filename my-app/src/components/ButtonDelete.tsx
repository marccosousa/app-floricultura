import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export function ButtonDelete() {
  return (
    <TouchableOpacity className="inline-flex items-center px-4 py-2 bg-red-600 rounded-md ml-2">
      <Icon name="trash-2" size={20} />
    </TouchableOpacity>
  );
}
