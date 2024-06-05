import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../components/HomeHeader';
import { ButtonDelete } from '../components/ButtonDelete';
import { ButtonEdit } from '../components/ButtonEdit';
import Icon from 'react-native-vector-icons/Ionicons';

export interface UserData {
  userId: number;
  name: string;
  email: string;
  products: {
    productId: number;
    name: string;
    quantity: number;
  }[];
}

export function Home({ route }: { route: any }) {
  const { userData } = route.params;

  return (
    <SafeAreaView className="bg-white flex-1">
      <View>
        <FlatList
          ListHeaderComponent={<HomeHeader name={userData.name} />}
          data={userData.products}
          keyExtractor={(item) => item.productId.toString()}
          renderItem={({ item }) => (
            <View className="p-4 mx-3 mb-3 flex flex-col bg-white rounded-md border border-[#F9A826]">
              <Text className="text-base font-semibold text-gray-900">{item.name}</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-sm text-gray-500">Quantidade: {item.quantity}</Text>
                <View className="flex-row space-x-2">
                  <ButtonEdit />
                  <ButtonDelete />
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity className="items-end mr-3">
        <Icon name="add-circle-sharp" size={55} color={'#F9A826'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
