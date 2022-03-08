import React,{useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = '83cc9947';
  const APP_KEY = 'ef8a264fe8364066f2948266550389ad';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('shrimp');

  useEffect( ()=> {
    getRecipes();
  }, [query]);
  //[]이 비어있으면 오직 첫 렌더시에만 작동하나. counter 를 삽입하며 counter 가 변경시 useEffect가 작동한다
  //search를 입력시 유저가 입력할시마다 아래의 페치가 렌더된다..그럼 페치가 너무 자주 됨.
  //그래서 query 를 만들어서 query 삽입=> now submit 버튼 누를 떄만 렌더가 됨

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
    // console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    //search 한 후에 입력창 다시 비게 만듬
    setSearch('');
  }

  return (
    <div className='App'>
      <form onSubmit={ getSearch } 
            className='search-form'>
        <input 
          className='search-bar' 
          type='text' 
          value={search}
          onChange={updateSearch}>
        </input> 

        <button 
          className='search-button' 
          type='submit'
        > Search
        </button>
        </form>
        <div className='recipes'>
          {recipes.map(recipe => (
            <Recipe 
            key = {recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            cuisineType={recipe.recipe.cuisineType} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}   />
          ))}
        </div>
    </div>
  );
}

export default App;
