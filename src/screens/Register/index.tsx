import React, {useState, useEffect} from 'react';
import { 
  Container, 
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import {CategorySelectButton} from '../../components/Form/CategorySelectButton';
import {CategorySelect} from '../CategorySelect';
import {Modal, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import { InputForm } from '../../components/Form/InputForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native'


interface FormData{
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
  .string()
  .required('Nome é obrigatório'),
  amount: Yup
  .number()
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obirgatório')
})



export function Register(){
  const dataKey = "@gofinances:tramsactions";
  const [transactionType, setTansactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const {
    control, 
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({resolver: yupResolver(schema)});

  const navigation = useNavigation();

  function handleTransactionTypeChange(type: 'positive' | 'negative'){
    setTansactionType(type)
  }

  function handleCloseCategoryModal(){
    setCategoryModalOpen(false)
  }

  function handleOpenCategoryModal(){
    setCategoryModalOpen(true)
  }

  async function handleRegister(form: FormData){
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação.');
    
    if(category.key === 'catehory')
      return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const formatedData = data ? JSON.parse(data) : [];
      const transactions = [
        ...formatedData,
        newTransaction
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(transactions));
      
      reset();
      setCategory({
        key: 'category',
        name: 'Categoria',
      })
      setTansactionType('');
      navigation.navigate('Listagem')

    } catch (error) {
      Alert.alert("Não foi possivél salvar")
    }
  }

  useEffect(() =>{
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
    }
    loadData();

  },[])
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm 
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm 
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypes>
              <TransactionTypeButton 
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeChange('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton 
                type="down"
                title="Income"
                onPress={() => handleTransactionTypeChange('negative')}
                isActive={transactionType === 'negative'}
              />
            </TransactionTypes>
            <CategorySelectButton 
              onPress={handleOpenCategoryModal}
              title={category.name}
            />
          </Fields>
      <Button
        title="Enviar"
        onPress={handleSubmit(handleRegister)}
        />
      </Form>
      <Modal visible={categoryModalOpen} >
        <CategorySelect
          closeSelectCategory={handleCloseCategoryModal}
          category={category}
          setCagtegory={setCategory}
          />
      </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}

