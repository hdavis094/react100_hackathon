import { useState } from 'react';
import { mealToIngredientLines } from '../src/utils';



function GroceryList({ plan }) {
    const [shoppingList, setShoppingList] = useState([]);
    const [totalCost, setTotalCost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    
    const handleGenerateShoppingList = async () => {
        

        const allRecipes = Object.values(plan).flat();
        if (allRecipes.length === 0) return;

        setLoading(true);
        try {
            const uniqueIds = [...new Set(allRecipes.map((r) => r.idMeal))];

            const fullRecipes = await Promise.all(
                uniqueIds.map((id) => fetch(`/api/recipe/${id}`).then((res) => res.json()))
            );
            const recipeById = Object.fromEntries(fullRecipes.map((meal) => [meal.idMeal, meal]));

            const allLines = allRecipes.flatMap((recipe) => mealToIngredientLines(recipeById[recipe.idMeal]));

            const priceRes = await fetch('/api/price', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients: allLines }),
            });
            const priceData = await priceRes.json();

            setShoppingList(priceData.items);
            setTotalCost(priceData.totalCost);
            setCheckedItems({});
        } catch (err) {
            console.error('Failed to generate shopping list:', err);
        } finally {
            setLoading(false);
        }

        };

        const toggleChecked = (index) => {
            setCheckedItems((prev) => ({ ...prev, [index]: !prev[index] }));
        };
        
        return (
        <div className="card mt-4 p-3">
            <button className="btn btn-primary no-print" onClick={handleGenerateShoppingList} disabled={loading}>
            {loading ? 'Calculating...' : 'Generate Shopping List'}
            </button>

            {shoppingList.length > 0 && (
            <div className="mt-3">
                <h3>Shopping List</h3>
                <ul className="list-group mb-2">
                {shoppingList.map((item, i) => (
                    <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={!!checkedItems[i]}
                            onChange={() => toggleChecked(i)}
                            />
                            <span style={{ textDecoration: checkedItems[i] ? 'line-through' : 'none' }}>
                            {item.name}
                            </span>
                        </div>
                    <span>${item.costDollars.toFixed(2)}</span>
                    </li>
                ))}
                </ul>
                <p className="fw-bold">Total: ${totalCost}</p>
            </div>
            )}
        </div>
        );
        }

export default GroceryList;