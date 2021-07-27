import React, {useState} from 'react';

import { 
  Container, 
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import {CategorySelectButton} from '../../components/Form/CategorySelectButton';

import {CategorySelect} from '../CategorySelect';
import {Modal} from 'react-native'
export function Register(){
  const [transactionType, setTansactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  function handleTransactionTypeChange(type: 'up' | 'down'){
    setTansactionType(type)
  }

  function handleCloseCategoryModal(){
    setCategoryModalOpen(false)
  }

  function handleOpenCategoryModal(){
    setCategoryModalOpen(true)
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
    <Form>
      <Fields>
        <Input 
          placeholder="Nome"
        />
        <Input 
          placeholder="Preço"
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

