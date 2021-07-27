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
import {Modal} from 'react-native'
import { InputForm } from '../../components/Form/InputForm';
import { useForm } from 'react-hook-form';


interface FormData{
  name: string;
  amount: string;
}

export function Register(){

  const [transactionType, setTansactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const {control, handleSubmit} = useForm();

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
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    };
    console.log(data)
  }

  return (
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
        />

        <InputForm 
          placeholder="Preço"
          name="amount"
          control={control}
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
  );
}

