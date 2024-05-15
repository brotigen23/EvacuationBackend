import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


//TODO: фетчить список тестов для вывода названия

/*
class Tests extends React.Component{

}

*/

function Tests(){
    const [tests, setTests] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/tests").then(
            (resp) => setTests(resp.data)
        );
    }, [])
    return(
        <div>
            {tests.map(test => 
                <Link to={"/tests/" + test.id}>{test.name}</Link>
            )}
        </div>
    )
}

export default Tests;