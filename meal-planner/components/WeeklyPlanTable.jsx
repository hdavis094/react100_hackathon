
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function WeeklyPlanTable({ plan, onRemoveFromDay, onSelectRecipe }) {
    return (
    <table className="table table-bordered">
        <thead>
        <tr>
            <th>Day</th>
            <th>Recipes</th>
        </tr>
        </thead>
        <tbody>
        {days.map((day) => (
            <tr key={day}>
            <td className="fw-bold">{day}</td>
            <td>
                <ul className="list-unstyled mb-0">
                {plan[day].map((recipe) => (
                    <li key={recipe.idMeal} className="mb-1">
                    <div className="card">
                    <p className="text-center">
                        {recipe.strMeal}
                    </p>
                    <button
                        className="btn btn-sm btn-link text-danger p-0 ms-2 no-print"
                        onClick={() => onRemoveFromDay(day, recipe.idMeal)}
                    >
                        Remove
                    </button>
                    </div>
                    </li>
                ))}
                </ul>
            </td>
            </tr>
        ))}
        </tbody>
    </table>
    );
    }


export default WeeklyPlanTable;