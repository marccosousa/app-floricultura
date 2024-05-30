import { View, Text, ScrollView } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import ImgRegister from '../assets/imgs/ImgRegister';

export function Register() {
  return (
    <ScrollView>
      <View className="flex-1 items-center justify-center bg-white pb-10">
        <View className="w-full p-6 mt-10">
          <Text className="text-2xl font-bold">Preencha seus dados</Text>
          <Text className="text-slate-400">Tenha o melhor app de gestão do mercado!</Text>
        </View>
        <ImgRegister />
        <View className="w-full max-w-md rounded-lg p-6 bg-transparent">
          <Input title={'Nome'} placeholder={'Digite seu nome'} secureTextEntry={false} />
          <Input title={'E-mail'} placeholder={'Digite seu e-mail'} secureTextEntry={false} />
          <Input title={'Senha'} placeholder={'Digite sua senha'} secureTextEntry={true} />
          <Input
            title={'Confirme a senha'}
            placeholder={'Confirme sua senha'}
            secureTextEntry={true}
          />
          <Button
            text={'Cadastre'}
            customStyle={'py-2 px-4 rounded-md mt-2 bg-[#F9A826] items-center justify-center h-14'}
          />
        </View>
      </View>
    </ScrollView>
  );
}
