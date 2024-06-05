import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export function ButtonEdit() {
  return (
    <TouchableOpacity className="inline-flex items-center px-4 py-2 bg-green-600 rounded-md">
      <Icon name="edit" size={20} />
    </TouchableOpacity>
  );
}
