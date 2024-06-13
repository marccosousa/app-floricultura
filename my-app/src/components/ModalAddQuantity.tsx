import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Input } from './Input';
import { Button } from './Button';
import { useState } from 'react';
import axios from 'axios';

interface ModalAddQuantityProps {
  handleClose: () => void;
  productId: number;
  refreshProducts: () => void;
}

export function ModalAddQuantity({
  handleClose,
  productId,
  refreshProducts,
}: ModalAddQuantityProps) {
  const [quantity, setQuantity] = useState<number>(0);

  const addQuantity = async () => {
    if (!quantity) {
      Alert.alert('Erro', 'Por favor, insira a quantidade a ser adicionada');
      console.log(productId);
      return;
    }
    try {
      const response = await axios.post(
        `http://192.168.0.10:5032/api/Products/add-quantity/${productId}?quantity=${quantity}`
      );

      if (response.status) {
        console.log(response.status);
        console.log(quantity);
        console.log(response.data);
        Alert.alert('Sucesso', 'Quantidade adicionada com sucesso!');
        handleClose();
        refreshProducts();
      } else {
        Alert.alert('Erro', 'Falha ao adicionar quantidade');
      }
    } catch (error) {
      console.error('Erro ao adicionar quantidade:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar a quantidade');
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
          <Input
            title={'Quantidade a adicionar'}
            placeholder={'Digite a quantidade a adicionar'}
            secureTextEntry={false}
            keyboardType="numeric"
            onChangeText={(text) => setQuantity(Number(text))}
          />
          <Button
            text={'Adicionar quantidade'}
            customStyle={'py-2 px-4 rounded-md mt-2 bg-[#F9A826] items-center justify-center h-14'}
            onPress={addQuantity}
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
