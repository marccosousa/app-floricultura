import { View, Text, TextInput, ButtonProps } from 'react-native';

interface InputProps extends ButtonProps {
  title: string;
  placeholder: string;
  secureTextEntry: boolean;
}
export function Input({ title, placeholder, secureTextEntry }: InputProps) {
  return (
    <View>
      <Text className="font-bold mb-2">{title}</Text>
      <TextInput
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        className="bg-gray-50 rounded-md p-2 mb-4 border border-slate-200 focus:bg-gray-200 focus:outline-none focus:border-[#F9A826] focus:border-[2px]"
      />
    </View>
  );
}
