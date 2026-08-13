const cors = require('cors');
const express = require('express');
const app = express();

require('dotenv').config({ path: __dirname + '/.env' });

app.use(cors());
app.use(express.json());

app.get('/api/recipes', async (req,res) => {
    const { ingredient } = req.query;
    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
        );
        const data = await response.json();
        res.json(data.meals || []);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

app.get('/api/recipe/:id', async (req, res) => {
    try {
        const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`
        );
        const data = await response.json();
        res.json(data.meals ? data.meals[0] : null);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch recipe details' });
    }
});

app.post('/api/price', async (req, res) => {
    const { ingredients } = req.body;
    try {
        const body = new URLSearchParams();
        body.append('ingredientList', ingredients.join('\n'));
        body.append('servings','1');

        const response = await fetch (
            'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/parseIngredients',
            {
            method: 'POST', 
            headers: {
                'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        }
        );

        const data = await response.json();

        const items = data.map(item => ({
            name: item.name,
            costDollars: (item.estimatedCost?.value || 0) /100,
        }));
        const totalCost = items.reduce((sum, item) => sum + item.costDollars, 0).toFixed(2);

        res.json({ items, totalCost });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get price estimate' });
    }
});









module.exports = app;

