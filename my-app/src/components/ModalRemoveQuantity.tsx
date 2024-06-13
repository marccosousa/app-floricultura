import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Input } from './Input';
import { Button } from './Button';
import { useState } from 'react';
import axios from 'axios';

interface ModalRemoveQuantityProps {
  handleClose: () => void;
  productId: number;
  quantity?: number;
  refreshProducts: () => void;
}

export function ModalRemoveQuantity({
  handleClose,
  productId,
  refreshProducts,
}: ModalRemoveQuantityProps) {
  const [quantity, setQuantity] = useState<number>(0);

  const removeQuantity = async () => {
    if (!quantity) {
      Alert.alert('Erro', 'Por favor, insira a quantidade a ser removida');
      console.log(productId);
      return;
    }
    try {
      const response = await axios.delete(
        `https://api-floricultura.azurewebsites.net/api/Products/remove-quantity/${productId}?quantity=${quantity}`
      );

      if (response.status) {
        console.log(response.status);
        console.log(quantity);
        console.log(response.data);
        Alert.alert('Sucesso', 'Quantidade removida com sucesso!');
        handleClose();
        refreshProducts();
      } else {
        Alert.alert('Erro', 'Falha ao adicionar quantidade');
      }
    } catch (error) {
      console.error('Erro ao remover quantidade:', error);
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
            title={'Quantidade para ser removida'}
            placeholder={'Digite a quantidade a ser removidade'}
            secureTextEntry={false}
            keyboardType="numeric"
            onChangeText={(text) => setQuantity(Number(text))}
          />
          <Button
            text={'Remover quantidade'}
            customStyle={'py-2 px-4 rounded-md mt-2 bg-[#F9A826] items-center justify-center h-14'}
            onPress={removeQuantity}
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
