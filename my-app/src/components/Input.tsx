import { View, Text, TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  title: string;
  placeholder: string;
  secureTextEntry: boolean;
}
export function Input({ title, placeholder, secureTextEntry, ...props }: InputProps) {
  return (
    <View>
      <Text className="font-bold mb-2">{title}</Text>
      <TextInput
        {...props}
        placeholder={placeholder}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        className="bg-gray-50 rounded-md p-2 mb-4 border border-slate-200 focus:bg-gray-200 focus:outline-none focus:border-[#F9A826] focus:border-[2px]"
      />
    </View>
  );
}
