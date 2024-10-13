import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Product } from '@/types/Product';
import { Trash } from 'lucide-react-native';
import Checkbox from './Checkbox';

import { useProductStore } from '../../store/store';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebaseConfig';

interface ProductCardProps {
  product: Product;
}

const productUnits = {
  'Un.': 'unidade(s)',
  Kg: 'kg',
  L: 'litro(s)',
};

const productCategories = {
  bakery: ['Padaria', '#fee2e2'],
  hortifruti: ['Hortifruti', '#dcfce7'],
  protein: ['Proteína', '#fef9c3'],
  beverage: ['Bebida', '#cffafe'],
  grocery: ['Mercearia', '#fbcfe8'],
};

export default function ProductCard({ product }: ProductCardProps) {
  const [label, color] =
    productCategories[product.category as keyof typeof productCategories];
  const [removeProductLoading, setRemoveProductLoading] = useState(false);

  const { removeProduct, toggleProductChecked } = useProductStore();

  async function onRemoveProduct() {
    try {
      setRemoveProductLoading(true);
      await deleteDoc(doc(db, 'products', product.id));
      removeProduct(product.id);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Um erro inesperado aconteceu ao tentar remover o produto'
      );
      console.error(error);
    } finally {
      setRemoveProductLoading(false);
    }
  }

  async function toggleProductStatus() {
    try {
      await updateDoc(doc(db, 'products', product.id), {
        checked: !product.checked,
      });
      toggleProductChecked(product.id);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Um erro inesperado aconteceu ao mudar o status do produto'
      );
      console.error(error);
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.leftContainer}>
          <Checkbox
            checked={product.checked}
            onChange={toggleProductStatus}
            aria-label={`Selecionar ${product.name}`}
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.productName,
                product.checked && styles.strikeThrough,
              ]}
            >
              {product.name}
            </Text>
            <Text style={styles.productQuantity}>
              {`${product.quantity} ${productUnits[product.unity]}`}
            </Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <Text style={[styles.label, { backgroundColor: color }]}>
            {label}
          </Text>

          <TouchableOpacity
            onPress={onRemoveProduct}
            disabled={removeProductLoading}
            aria-label={`Remover ${product.name}`}
          >
            <Trash size={16} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    borderColor: '#43E5A0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    padding: 16,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 8,
  },
  productName: {
    fontSize: 16,

    fontWeight: 'bold',
    color: '#0FA968',
  },
  productQuantity: {
    fontSize: 12,
    color: '#777',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    opacity: 0.75,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 4,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: 'bold',
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
});
