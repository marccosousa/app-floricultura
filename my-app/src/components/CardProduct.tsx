import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { UserData } from '../screens/Home';
import { ButtonDelete } from './ButtonDelete';
import { ButtonAddQuantity } from './ButtonAddQuantity';
import { ButtonRemoveQuantity } from './ButtonRemoveQuantity';
import React, { useState } from 'react';
import { ModalAddQuantity } from './ModalAddQuantity';
import { ModalRemoveQuantity } from './ModalRemoveQuantity';

interface CardProductProps {
  item: UserData['products'][number];
  onDelete: () => void;
  refreshProducts: () => void;
}

export function CardProduct({ item, onDelete, refreshProducts }: CardProductProps) {
  const [visibleAddModal, setVisibleAddModal] = useState(false);
  const [visibleRemoveModal, setVisibleRemoveModal] = useState(false);
  return (
    <View className="p-4 mx-3 mb-3 flex flex-col bg-white rounded-md border border-[#F9A826]">
      <Text className="text-base font-semibold text-gray-900">{item.name}</Text>
      <View className="flex-row justify-between items-center">
        <Text className="text-sm text-gray-500">Quantidade: {item.quantity}</Text>
        <View className="flex-row">
          <ButtonAddQuantity onPress={() => setVisibleAddModal(true)} />
          <ButtonRemoveQuantity onPress={() => setVisibleRemoveModal(true)} />
          <ButtonDelete id={item.productId} onDelete={onDelete} />
        </View>
      </View>

      <Modal
        visible={visibleAddModal}
        transparent={true}
        onRequestClose={() => setVisibleAddModal(false)}
      >
        <ModalAddQuantity
          productId={item.productId}
          handleClose={() => {
            setVisibleAddModal(false);
          }}
          refreshProducts={refreshProducts}
        />
      </Modal>

      <Modal
        visible={visibleRemoveModal}
        transparent={true}
        onRequestClose={() => setVisibleRemoveModal(false)}
      >
        <ModalRemoveQuantity
          productId={item.productId}
          handleClose={() => {
            setVisibleRemoveModal(false);
          }}
          refreshProducts={refreshProducts}
        />
      </Modal>
    </View>
  );
}
