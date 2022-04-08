import React, {useState} from 'react';
import Axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Recipe from './components/Recipe';
import Alert from './components/Alert';

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const APP_ID = 'e6ec93d6';
  const APP_KEY = 'ee6b8ff7f62b441c7fad563dfda2baca';
  const url = `https://api.edamam.com/search?q=${query}&to=30&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async() => {
    if(query !== ""){
      const result = await Axios.get(url);
      if(!result.data.more){
        return setAlert('Your search did not give any results')
      }
      setRecipes(result.data.hits)
      setAlert("");
      setQuery("");
    } else {
      setAlert('Please fill the form');
    }
  
  };
  
  const onChange = (e) => {
     setQuery(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }
  return (
    <div className="App">
      <h1>Mastry Media Recipe Search</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert}/>}
        <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query}/>
        <input type="submit" value="search"/>
      </form>
      <div id="edamam-badge" data-color="transparent"></div>
      <div className="recipes">
  {recipes !== [] && recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)}
      </div>
    </div>
  );
}

export default App;
