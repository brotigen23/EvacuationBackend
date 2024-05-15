import { Link } from "react-router-dom";



function NavBar(){
	return(
		<div className='NavBar'>
            <Link to="/articles"> Статьи </Link>
            <Link to="/tests"> Тесты </Link>
            <Link to="/map"> Карта </Link>
		</div>
	)
}

export default NavBar;