import { View, Text, ScrollView, StatusBar } from 'react-native';
import ImgLogin from '../assets/imgs/ImgLogin';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export function Login() {
  const handleOnPress = async () => {
    console.log('clicou');
  };

  const { navigate } = useNavigation();

  return (
    <View className="flex-1 items-center justify-center bg-white pb-10">
      <View className="w-full p-6 mt-10">
        <Text className="text-2xl font-bold">Login</Text>
        <Text className="text-slate-400">Bem-vindo de volta!</Text>
      </View>
      <ImgLogin />
      <View className="w-full max-w-md rounded-lg p-6 bg-transparent">
        <View>
          <Input title="E-mail" placeholder="Digite seu e-mail" secureTextEntry={false} />
          <Input title="Senha" placeholder="Digite sua senha" secureTextEntry={true} />
          <View className="items-end mb-2">
            <Text className="font-bold">Esqueceu a senha?</Text>
          </View>
          <Button
            text="Entrar"
            customStyle={'py-2 px-4 rounded-md mt-2 bg-[#F9A826] items-center justify-center h-14'}
            onPress={handleOnPress}
          />
          <Button
            text="Cadastre-se"
            customStyle={
              'py-2 px-4 rounded-md mt-2 bg-[#f9a82644] items-center justify-center h-14'
            }
            styleText="text-[#FF9D00]"
            onPress={() => navigate('Register' as never)}
          />
        </View>
      </View>
    </View>
  );
}
