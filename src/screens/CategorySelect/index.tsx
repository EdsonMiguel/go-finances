import React from 'react';

import {
  Container,
  Header, 
  Title,
  Category,
  Icon,
  Name,
  Separetor, 
  Footer
} from './styles';

import {FlatList} from 'react-native'
import {Button} from '../../components/Form/Button'
import { categories } from '../../utils/category';

interface Category{
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCagtegory: (category: Category) => void;
  closeSelectCategory: () => void;
}


export function CategorySelect({
  category, 
  setCagtegory,
  closeSelectCategory
}:Props){

  function handleCategorySelect(category: Category){
    setCagtegory(category)
  }
  return(
    <Container>
      <Header>
        <Title>Categorias</Title>
      </Header>
      <FlatList 
        data={categories}
        keyExtractor={item => item.key}
        style={{flex: 1, width: '100%'}}
        renderItem={({ item }) => (
          <Category
            onPress={ () => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
              <Icon name={item.icon}/>
              <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separetor/>}
      />
      <Footer>
          <Button title="Selecionar" onPress={closeSelectCategory}/>
      </Footer>
    </Container>
  )
}