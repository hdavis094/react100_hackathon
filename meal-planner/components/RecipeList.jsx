import { useState } from 'react';


function RecipeList({ recipes, selectedDay, onAddToDay }) {
    const [visible, setVisible] = useState(true);

    if (recipes.length ===0) return null;

    return (
        <div className="no-print">
            <button className="btn btn-secondary mb-2" onClick={()=>setVisible(!visible)}>Hide
            </button>
            {visible && (
            <div className="row row-cols-1 row-cols-md-3 g-3 mb-4">
                {recipes.map((recipe) => (
                <div className="col" key={recipe.idMeal}>
                    <div className="card h-100">
                        <img className="card-img-top" src={recipe.strMealThumb} alt={recipe.strMeal}/>
                        <h5 className="card-title">{recipe.strMeal}</h5>
                        <button className="btn btn-outline-primary mt-auto" onClick={()=>onAddToDay(recipe)}>Add to {selectedDay}</button>
                        </div>
                    </div>
            
                ))}
            </div>
            )}
            </div>    
    );
}

export default RecipeList;