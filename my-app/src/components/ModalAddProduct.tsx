import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Input } from './Input';
import { Button } from './Button';
import { useState } from 'react';
import axios from 'axios';

interface ModalAddProductProps {
  handleClose: () => void;
  userId: number;
  name?: string;
  quantity?: number;
}

export function ModalAddProduct({ handleClose, userId }: ModalAddProductProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addProduct = async () => {
    if (!name || !quantity) {
      Alert.alert('Erro', 'Por favor, insira o nome e a quantidade do produto');
      return;
    }
    try {
      const response = await axios.post(
        `http://192.168.0.10:5032/api/products/user-products/${userId}`,
        {
          name,
          quantity,
        }
      );

      if (response.status) {
        Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
        handleClose();
      } else {
        Alert.alert('Erro', 'Falha ao adicionar produto');
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar o produto');
    }
  };

  return (
    <SafeAreaView className="justify-center items-center flex-1">
      <View className="w-full items-center justify-center">
        <TouchableOpacity
          className="w-full h-3/5 bg-[#00000069]"
          onPress={handleClose}
        ></TouchableOpacity>

        <View className=" w-full max-w-md rounded-3x1 p-6 bg-white">
          <Text>Preencha os dados do produto: </Text>
          <Input
            title={'Nome do produto'}
            placeholder={'Digite o nome do produto'}
            secureTextEntry={false}
            onChangeText={setName}
          />
          <Input
            title={'Quantidade inicial'}
            placeholder={'Digite a quantidade inicial'}
            secureTextEntry={false}
            onChangeText={setQuantity}
          />
          <Button
            text={'Inserir produto'}
            customStyle={'py-2 px-4 rounded-md mt-2 bg-[#F9A826] items-center justify-center h-14'}
            onPress={addProduct}
          />
        </View>
        <TouchableOpacity
          className="w-full h-3/5 bg-[#00000069]"
          onPress={handleClose}
        ></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
