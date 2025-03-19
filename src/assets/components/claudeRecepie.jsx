import ReactMarkdown from 'react-markdown'

export default function ClaudeRecepie(props){
    // Escape special characters in the recipe
    const escapedRecipe = props.recepie.replace(/([#*\-_`])/g, '\\$1');//doubt...
    return(
        <section className="recipe-section">
            <h2>Chef Claude Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                <ReactMarkdown>
                    {escapedRecipe}
                </ReactMarkdown>
            </article>
        </section>
    )
}