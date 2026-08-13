import { mealToIngredientLines } from '../src/utils';

function RecipeDetails({ recipe, loading }) {
    if (loading) return <p>Loading Recipe...</p>
    if (!recipe) return null;

    const ingredientLines = mealToIngredientLines(recipe);

    return (
        <div className="card mt-4 p-3 text-black">
            <h3>{recipe.strMeal}</h3>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width ="200" className="mb-3" />

            <h5>Ingredients</h5>
            <ul>
                {ingredientLines.map((line,i) => (
                    <li key={i}>{line}</li>
                ))}
            </ul>
            <h5>Instructions</h5>
            <p style={{ whiteSpace: 'pre-line' }}>{recipe.strInstructions}</p>

        </div>
    );
}


export default RecipeDetails;