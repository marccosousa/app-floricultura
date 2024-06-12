import { View, Text, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';
import ImgLogin from '../assets/imgs/ImgLogin';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import CryptoJS from 'crypto-js';

export function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const handleOnPress = async () => {
    setLoading(true);
    const hashedPassword = CryptoJS.SHA256(password).toString();
    const responseBd = await axios
      .post('http://192.168.0.10:5032/api/Users/login', {
        email,
        password: hashedPassword,
      })
      .then((responseBd) => {
        console.log(responseBd.data);
        const userData = responseBd.data;
        console.log(userData);
        navigate('Home', { userData });
      })
      .catch(() => {
        setErrorMessage('Usuário ou senha inválidos.');
      });
    setLoading(false);
  };

  const handleOnChangeEmail = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setErrorMessage('');
    setEmail(event.nativeEvent.text);
  };

  const handleOnChangePassword = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setErrorMessage('');
    setPassword(event.nativeEvent.text);
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
          <Input
            value={email}
            title="E-mail"
            placeholder="Digite seu e-mail"
            secureTextEntry={false}
            onChange={handleOnChangeEmail}
          />
          <Input
            value={password}
            title="Senha"
            placeholder="Digite sua senha"
            secureTextEntry={true}
            onChange={handleOnChangePassword}
          />
          {errorMessage ? <Text className="text-red-500">{errorMessage}</Text> : <Text></Text>}
          <View className="items-end mb-2">
            <Text className="font-bold">Esqueceu a senha?</Text>
          </View>
          <Button
            text="Entrar"
            customStyle={'py-2 px-4 rounded-md mt-2 bg-[#F9A826] items-center justify-center h-14'}
            loading={loading}
            onPress={handleOnPress}
          />
          <Button
            text="Cadastre-se"
            customStyle={
              'py-2 px-4 rounded-md mt-2 bg-[#f9a82644] items-center justify-center h-14'
            }
            styleText="text-[#FF9D00]"
            onPress={() => navigate('Register')}
          />
        </View>
      </View>
    </View>
  );
}
