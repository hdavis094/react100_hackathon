

export function mealToIngredientLines(meal) {
    const lines = [];
    for (let i=1;i<=20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            lines.push(`${measure ? measure.trim() : ''} ${ingredient.trim()}`.trim());
        }
    }
    return lines;
}