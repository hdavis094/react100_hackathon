import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import RecipeList from '../components/RecipeList';
import WeeklyPlanTable from '../components/WeeklyPlanTable';
import RecipeDetails from '../components/RecipeDetails';
import GroceryList from '../components/GroceryList';
import RecipeBook from '../components/RecipeBook';
import './App.css';



function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [plan, setPlan] = useState({
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: [], });
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);


  const handleGenerateMenu = async () => {
    //todo add try and catch for error handling 
    const res = await fetch(
      `/api/recipes?ingredient=${encodeURIComponent(ingredient)}`
    );
    const data = await res.json();
    console.log(data);
    setRecipes(data);
  };

  const handleAddToDay = (recipe) => {
    setPlan((prevPlan) => ({
      ...prevPlan,
      [selectedDay]: [...prevPlan[selectedDay],recipe],
    }));
  };

  const handleRemoveFromDay = (day, idMeal) => {
    setPlan((prevPlan) => ({
      ...prevPlan,
      [day]: prevPlan[day].filter((recipe) => recipe.idMeal !== idMeal),
    }));
  };

  const handleSelectRecipe = async (idMeal) => {
    setLoadingRecipe(true);
    try {
      const res = await fetch(`/api/recipe/${idMeal}`);
      const data = await res.json();
      setSelectedRecipe(data);
    } catch (err) {
      console.error('Failed to fetch recipe details:', err);
    } finally {
      setLoadingRecipe(false);
    }
  };
      

  return (
    <div className="container-fluid py-4">
      <h1>What's For Dinner?</h1>
      
      <SearchForm ingredient={ingredient} setIngredient={setIngredient} selectedDay={selectedDay} setSelectedDay={setSelectedDay} onGenerate={handleGenerateMenu} />

      <div className="row">
        <div className="col-md-4">
      <WeeklyPlanTable plan={plan} onRemoveFromDay={handleRemoveFromDay} onSelectRecipe={handleSelectRecipe}/>
      
      <button className="btn btn-primary no-print mb-2" onClick={() => window.print()}>Print/Export</button>
      
      <RecipeBook plan={plan} />
          
          
  
        </div>

        <div className="col-md-4">
      <RecipeList recipes={recipes} selectedDay={selectedDay} onAddToDay={handleAddToDay} />
        </div>
        
        <div className="col-md-4">
      
      <GroceryList plan={plan} />
        </div>

      </div>
      
      
    </div>
  )
}

export default App
