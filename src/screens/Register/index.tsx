import React, {useState} from 'react';
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
import { yupResolver } from '@hookform/resolvers/yup'


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

  const [transactionType, setTansactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const {
    control, 
    handleSubmit,
    formState: { errors }
  } = useForm({resolver: yupResolver(schema)});

  function handleTransactionTypeChange(type: 'up' | 'down'){
    setTansactionType(type)
  }

  function handleCloseCategoryModal(){
    setCategoryModalOpen(false)
  }

  function handleOpenCategoryModal(){
    setCategoryModalOpen(true)
  }

  function handleRegister(form: FormData){
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação.');
    
    if(category.key === 'catehory')
      return Alert.alert('Selecione a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    };
    console.log(data)
  }


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
                onPress={() => handleTransactionTypeChange('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton 
                type="down"
                title="Income"
                onPress={() => handleTransactionTypeChange('down')}
                isActive={transactionType === 'down'}
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

