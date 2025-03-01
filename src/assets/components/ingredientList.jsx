export default function ingredientList(props){
    
    const ingredientListItems = props.ingredients.map((ingredient) => {
        return <li key={ingredient}>{ingredient}</li>
    })

    return (
        <div id="lower-container">
                <h2>Ingredients on hand:</h2>
                <ul className='ingredient-list' aria-live="polite">
                    {ingredientListItems}
                </ul>
                {props.ingredients.length > 3 && <div className="get-recipe-container">
                    <div ref={props.ref}>
                        <h3>Ready for a recipe ?</h3>
                        <p>Generate a recepie from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecepie}>Get a recepie</button>
                </div>}
        </div>
    )
    
   // <button onClick={props.toggleRecepieShown}>Get a recepie</button>
}