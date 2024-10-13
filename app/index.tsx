import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useProductStore } from '@/store/store';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { Product } from '@/types/Product';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { randomUUID } from 'expo-crypto';
import ProductCard from '@/components/Product/ProductCard';

const formSchema = z.object({
  name: z.string().min(2).max(30),
  quantity: z.coerce
    .number({ message: 'Quantidade inválida' })
    .int()
    .positive({ message: 'Quantidade precisa ser positiva' }),
  unity: z.enum(['Un.', 'Kg', 'L']),
  category: z.string(),
});

const Home = () => {
  const { products, addProduct } = useProductStore();
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingAddProduct, setLoadingAddProduct] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      quantity: 1,
      unity: 'Un.',
      category: 'bakery',
    },
  });

  async function getOrCreateUserId() {
    try {
      let userId = await AsyncStorage.getItem('userId');

      if (!userId) {
        userId = randomUUID();
        await AsyncStorage.setItem('userId', userId);
      }

      return userId;
    } catch (error) {
      console.error('Erro ao acessar o AsyncStorage:', error);
      return null;
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoadingAddProduct(true);
    const newProduct = { ...values, checked: false };
    const userId = await getOrCreateUserId();

    try {
      const { id } = await addDoc(collection(db, 'products'), {
        ...newProduct,
        userId,
      });
      addProduct({ ...newProduct, id });
      reset();
    } catch (error) {
      Alert.alert(
        'Erro',
        'Um erro inesperado aconteceu ao adicionar o produto'
      );
      console.error(error);
    } finally {
      setLoadingAddProduct(false);
    }
  };

  const getProductsByUser = async () => {
    try {
      const userId = await getOrCreateUserId();
      const q = query(
        collection(db, 'products'),
        where('userId', '==', userId)
      );
      const productSnapshot = await getDocs(q);

      productSnapshot.docs.forEach((doc) => {
        const product: Product = {
          id: doc.id,
          name: doc.data().name,
          category: doc.data().category,
          quantity: doc.data().quantity,
          unity: doc.data().unity,
          checked: doc.data().checked,
        };
        addProduct(product);
      });
      setLoadingProducts(false);
    } catch (error) {
      Alert.alert(
        'Erro',
        'Um erro inesperado aconteceu ao carregar os produtos'
      );
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsByUser();
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: '#f0f0f0' }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          marginBottom: 16,
          marginTop: 24,
        }}
      >
        Lista de Compras
      </Text>

      {loadingProducts ? (
        <Text>Carregando...</Text>
      ) : (
        <>
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.label}>Item</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    borderWidth: 1,
                    padding: 8,
                    borderColor: '#0FA968',
                    marginBottom: 12,
                    borderRadius: 8,
                    width: '100%',
                    minHeight: 50,
                  }}
                  placeholder="Item"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  width: '48%',
                }}
              >
                <Text style={styles.label}>Quantidade</Text>
                <Controller
                  control={control}
                  name="quantity"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        borderWidth: 1,
                        padding: 8,
                        borderRadius: 8,
                        minHeight: 51,
                        borderColor: '#0FA968',
                      }}
                      placeholder="Quantidade"
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value?.toString()}
                    />
                  )}
                />
              </View>

              <View
                style={{
                  width: '50%',
                  maxHeight: 48,
                }}
              >
                <Text style={styles.label}>Unidade</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: '#0FA968',
                  }}
                >
                  <Controller
                    control={control}
                    name="unity"
                    render={({ field: { onChange, value } }) => (
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={{
                          borderWidth: 1,
                          minHeight: 50,
                          borderRadius: 8,
                        }}
                      >
                        <Picker.Item label="Un." value="Un." />
                        <Picker.Item label="Kg" value="Kg" />
                        <Picker.Item label="L" value="L" />
                      </Picker>
                    )}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                width: '100%',
              }}
            >
              <Text style={styles.label}>Categoria</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  width: '100%',
                  marginBottom: 6,
                  borderColor: '#0FA968',
                }}
              >
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, value } }) => (
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={{ minHeight: 50 }}
                    >
                      <Picker.Item label="Padaria" value="bakery" />
                      <Picker.Item label="Hortifruti" value="hortifruti" />
                      <Picker.Item label="Proteína" value="protein" />
                      <Picker.Item label="Bebida" value="beverage" />
                      <Picker.Item label="Mercearia" value="grocery" />
                    </Picker>
                  )}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={loadingAddProduct}
              style={[
                styles.addButton,
                loadingAddProduct && styles.buttonDisabled,
              ]}
            >
              <Text style={styles.addButtonText}>
                {loadingAddProduct ? 'Adicionando...' : 'Adicionar'}
              </Text>
            </TouchableOpacity>
          </View>

          {products.map((product, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <ProductCard product={product} />
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: '#0FA968',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: '50%',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: '50%',
  },
});

export default Home;
