import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface HomeHeaderProps {
  name: string;
}

export function HomeHeader({ name }: HomeHeaderProps) {
  return (
    <View className="flex flex-col w-full">
      <View className="flex mt-3 p-4">
        <View className="flex-row justify-between items-center mb-1">
          <Text className="font-semibold text-2xl">Olá, {name}</Text>
          <Icon name="star" size={30} color="#F9A826" className="ml-auto" />
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-base">Bem-vindo de volta!</Text>
          <Text className="font-semibold 2x1">Plano Full</Text>
        </View>
        <Text className="mt-5">Esses são os produtos no seu estoque: </Text>
      </View>
    </View>
  );
}
