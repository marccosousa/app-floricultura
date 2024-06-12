import { View, Text } from 'react-native';
import { UserData } from '../screens/Home';
import { ButtonEdit } from './ButtonEdit';
import { ButtonDelete } from './ButtonDelete';

interface CardProductProps {
  item: UserData['products'][number];
  onDelete: () => void;
}

export function CardProduct({ item, onDelete }: CardProductProps) {
  return (
    <View className="p-4 mx-3 mb-3 flex flex-col bg-white rounded-md border border-[#F9A826]">
      <Text className="text-base font-semibold text-gray-900">{item.name}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-gray-500">Quantidade: {item.quantity}</Text>
        <View className="flex-row space-x-2">
          <ButtonEdit />
          <ButtonDelete id={item.productId} onDelete={onDelete} />
        </View>
      </View>
    </View>
  );
}
