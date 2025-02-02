import ReactMarkdown from 'react-markdown'

export default function ClaudeRecepie(props){
    return(
        <section className="recipe-section">
            <h2>Chef Claude Recommends:</h2>
            <article className="suggested-recipe-container" aria-live="polite">
                <ReactMarkdown>
                    {props.recepie}
                </ReactMarkdown>
            </article>
        </section>
    )
}