import { useState } from 'react';
import { mealToIngredientLines } from '../src/utils'

function RecipeBook({ plan }) {
    const [recipesDetails, setRecipesDetails] =useState([]);
    const [loading, setLoading] =useState(false);

    const handleGenerateRecipes = async () => {
        const allRecipes = Object.values(plan).flat();
        const uniqueIds = [...new Set(allRecipes.map((r) => r.idMeal))];
        if (uniqueIds.length ===0) return;

        setLoading(true);
        try {
            const fullRecipes = await Promise.all(
                uniqueIds.map((id) => fetch(`http://localhost:3000/api/recipe/${id}`).then((res) => res.json()))
            );
            setRecipesDetails(fullRecipes);
        } catch (err) {
            console.error('Failed to fecth recipes:',err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button className="btn btn-primary no-print" onClick={handleGenerateRecipes} disabled={loading}>
                {loading ? 'Loading...' : 'Generate All Recipes'}
            </button>

            {recipesDetails.map((recipe) => (
                <div className="card mt-3 p-3" key={recipe.idMeal}>
                    <h3>{recipe.strMeal}</h3>
                    <img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" className="mb-3" />
                    <h5>Ingredients</h5>
                    <ul>
                        {mealToIngredientLines(recipe).map((line,i) => <li key={i}>{line}</li>)}
                    </ul>
                    <h5>Instructions</h5>
                    <p style={{ whiteSpace: 'pre-line' }}>{recipe.strInstructions}</p>
                </div>
            ))}
        </div>
    );
}

export default RecipeBook;