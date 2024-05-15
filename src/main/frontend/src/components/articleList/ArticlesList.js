import { Link } from 'react-router-dom';

//TODO: фетчить список статей (названия и айдишники)

const arts = [
    {id: 1, name: 'Первая статья', content: 'Это первая статья'},
    {id: 2, name: 'Вторая статья', content: 'Это Вторая статья'},    
    {id: 3, name: 'Третья статья', content: 'Это Третья статья'},    
    {id: 4, name: 'Четвертая статья', content: 'Это Четвертая статья'},
]

function ArticleLink(props){
    return(
        <div>
            <div className="Article">
                <h1>{props.name}</h1>
                <p>{props.content}</p>
            </div>
        </div>
    )
}

function ArticlesList(){
    return(
        <div>
            {arts.map(art => 
                <Link to={"/articles/" + art.id}>{art.name}</Link>
            )}
        </div>
    )
}

export default ArticlesList;