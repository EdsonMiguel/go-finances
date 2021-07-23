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


export function Register(){
  const [transactionType, setTansactionType] = useState('');

  function handleTransactionTypeChange(type: 'up' | 'down'){
    setTansactionType(type)
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

      </Fields>


    <Button
      title="Enviar"
    />
    </Form>

    </Container>
  );
}

