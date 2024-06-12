import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  ListRenderItemInfo,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeHeader } from '../components/HomeHeader';
import { ButtonDelete } from '../components/ButtonDelete';
import { ButtonEdit } from '../components/ButtonEdit';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { ModalAddProduct } from '../components/ModalAddProduct';
import axios from 'axios';
import { CardProduct } from '../components/CardProduct';

export interface UserData {
  quantity: any;
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
  const [visibleModal, setVisibleModal] = useState(false);
  const [products, setProducts] = useState(userData.products);

  const refreshProducts = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.10:5032/api/products/user-products/${userData.userId}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os produtos');
    }
  };

  function renderItem({ item }: { item: UserData['products'][number] }) {
    return <CardProduct item={item} onDelete={refreshProducts} />;
  }

  return (
    <SafeAreaView className="bg-white flex-1">
      <View>
        <FlatList
          ListHeaderComponent={<HomeHeader name={userData.name} />}
          data={products}
          keyExtractor={(item) => item.productId.toString()}
          renderItem={renderItem}
          ListFooterComponent={
            <TouchableOpacity className="items-center" onPress={() => setVisibleModal(true)}>
              <Icon name="add-circle-sharp" size={55} color={'#F9A826'} />
            </TouchableOpacity>
          }
        />
      </View>

      <Modal
        visible={visibleModal}
        transparent={true}
        onRequestClose={() => setVisibleModal(false)}
      >
        <ModalAddProduct
          userId={userData.userId}
          handleClose={() => {
            setVisibleModal(false);
            refreshProducts();
          }}
        />
      </Modal>
    </SafeAreaView>
  );
}
