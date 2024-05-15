import {useParams} from "react-router-dom"


// TODO: фетчить запись с помощью айдишника

const arts = [
    {id: 1, name: 'Первая статья', content: 'Это первая статья'},
    {id: 2, name: 'Вторая статья', content: 'Это Вторая статья'},    
    {id: 3, name: 'Третья статья', content: 'Это Третья статья'},    
    {id: 4, name: 'Четвертая статья', content: 'Это Четвертая статья'},
]

function Article(){
    const {id} = useParams();
    const article = arts[id - 1];

    return(
        <div className="article">
            <h1>{article.name}</h1>
            <p>{article.content}</p>
        </div>
    )
}

export default Article;