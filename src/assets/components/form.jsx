import React from 'react'
import ClaudeRecepie from './claudeRecepie'
import IngredientULList from './ingredientList'
import {getRecipeFromMistral} from './ai'

export default function formFunction(){
    const [ingredients, setMyIngredients] = React.useState([ ])
    const [recepie, setRecepie] = React.useState("")
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false);
    const recepieSection = React.useRef(null)
    
    function handleSubmit(event){
        event.preventDefault()//To prevent our page from being refreshed and url being changed
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient").trim()//to remove whitespace
        console.log(newIngredient)
        ingredients.push(newIngredient);
        console.log(ingredients)
        console.log(Object.fromEntries(formData))

        //input validation
        if(!newIngredient || /^\s*$/.test(newIngredient)){
            setError("Please enter an ingredient")
            return
        }

        //clear any previous error
        setError()

        setMyIngredients(prevMyIngedients => [
            ...prevMyIngedients],
            newIngredient
        )
        event.target.reset();
    }

    React.useEffect(()=>{
        console.log(recepieSection.current)
        if (recepie !== "" && recepieSection) {
            setTimeout(() => {
                recepieSection.scrollIntoView({ behavior: 'smooth' });
            }, 100); // Delay to ensure DOM updates
        }
    },[recepie])

    async function getRecepie() {
        setLoading(true);//Show loading message before fetching data
        setError("");

        try{
            const recepieMarkdown = await getRecipeFromMistral(ingredients)
            setRecepie(recepieMarkdown)
        } catch(error) {
            console.error("API error:", error);
            setError("Failed to fetch recepie. Please try again.")
        } finally {
            setLoading(false)//Hide loading message after fetching data
        }
    }

    return(
        <main>
            <form 
                className="form"
                onSubmit={handleSubmit}    
            >
            <input
                type="text" 
                placeholder="e.g. onion"
                aria-label="Add ingredient"
                name="ingredient"
                required
                pattern="\S(.*\S)?" // HTML5 pattern to prevent whitespace-only input
                title="Please enter a valid ingredient (not just spaces)"
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
                <IngredientULList
                    ref={recepieSection} 
                    ingredients={ingredients}
                    getRecepie={getRecepie}/>}
            {/* Show loading message when fetching */}
            {loading ? (<p className='loading-message'>Fetching recipe, please wait...</p>) : error ? (
                <p className="error-message">{error}</p>
            ) : recepie && <ClaudeRecepie recepie={recepie}/>}
        </main>
    )
}