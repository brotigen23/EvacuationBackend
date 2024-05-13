import { Link } from "react-router-dom";


function Main(){
    return(
        <div>
            <Link to="/articles"> Статьи </Link>
            <Link to="/tests"> Тесты </Link>
            <Link to="/map"> Карта </Link>
        </div>
    )
}

export default Main;