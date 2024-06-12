import {
  View,
  Text,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import ImgRegister from '../assets/imgs/ImgRegister';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { navigate } = useNavigation();

  const handleOnPress = async () => {
    setLoading(true);
    const hashedPassword = CryptoJS.SHA256(password).toString();
    await axios
      .post('http://192.168.0.10:5032/api/Users', {
        name,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      })
      .then(() => {
        Alert.alert('Sucesso', 'Conta registrada com sucesso');
        navigate('Login');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          Alert.alert('Erro', error.response.data.message);
        } else {
          Alert.alert('Erro', 'Erro ao efetuar cadastro, tente novamente');
        }
      });
    setLoading(false);
  };

  function handleOnChangeName(event: NativeSyntheticEvent<TextInputChangeEventData>): void {
    setName(event.nativeEvent.text);
  }

  function handleOnChangeEmail(event: NativeSyntheticEvent<TextInputChangeEventData>): void {
    setEmail(event.nativeEvent.text);
  }

  function handleOnChangePassword(event: NativeSyntheticEvent<TextInputChangeEventData>): void {
    setPassword(event.nativeEvent.text);
  }

  function handleOnChangeConfirmPassword(
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ): void {
    setConfirmPassword(event.nativeEvent.text);
  }

  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center bg-white pb-10">
        <View className="w-full p-6 mt-10">
          <Text className="text-2xl font-bold">Preencha seus dados</Text>
          <Text className="text-slate-400">Tenha o melhor app de gestão do mercado!</Text>
        </View>
        <ImgRegister />
        <View className="w-full max-w-md rounded-lg p-6 bg-transparent">
          <Input
            title={'Nome'}
            placeholder={'Digite seu nome'}
            secureTextEntry={false}
            onChange={handleOnChangeName}
          />
          <Input
            title={'E-mail'}
            placeholder={'Digite seu e-mail'}
            secureTextEntry={false}
            onChange={handleOnChangeEmail}
          />
          <Input
            title={'Senha'}
            placeholder={'Digite sua senha'}
            secureTextEntry={true}
            onChange={handleOnChangePassword}
          />
          <Input
            title={'Confirme a senha'}
            placeholder={'Confirme sua senha'}
            secureTextEntry={true}
            onChange={handleOnChangeConfirmPassword}
          />
          <Button
            text={'Cadastre'}
            customStyle={'py-2 px-4 rounded-md mt-2 bg-[#F9A826] items-center justify-center h-14'}
            loading={loading}
            onPress={handleOnPress}
          />
        </View>
      </View>
    </ScrollView>
  );
}
