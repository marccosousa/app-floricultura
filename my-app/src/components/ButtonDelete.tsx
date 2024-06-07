import axios from 'axios';
import { TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface ButtonDeleteProps {
  id: number;
  onDelete: () => void;
}

export function ButtonDelete({ id, onDelete }: ButtonDeleteProps) {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://192.168.0.10:5032/api/products/${id}`);

      if (response) {
        Alert.alert('Sucesso', 'Produto removido com sucesso!');
        onDelete();
      } else {
        Alert.alert('Erro', 'Falha ao remover produto');
      }
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao remover o produto');
    }
  };

  return (
    <TouchableOpacity
      className="inline-flex items-center px-4 py-2 bg-red-600 rounded-md ml-2"
      onPress={handleDelete}
    >
      <Icon name="trash-2" size={20} />
    </TouchableOpacity>
  );
}
