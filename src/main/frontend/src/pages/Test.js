import { useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect } from "react";


// Фетчить вопросы и ответы определённого теста (по айди)
// отправлять ответы используя некоторую форму заполнения поля имени или что-то такое

function Question({question, answers}){
    return(       
        <div>
            <legend>{question}</legend>
            {answers.map(answer =>
                <div key={answer.id}>
                    <input type="radio" name={answer.question.id} value={answer.id} required></input>
                    <label>{answer.answer}</label>
                </div>
            )}
        </div>
    )
}


function Test(){

    const {id} = useParams();

    const [testName, setTestName] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/tests/" + id)
        .then((resp) =>{
            const data = resp.data;
            setQuestions(data.q); 
            setAnswers(data.a); 
            setTestName(data.t.name);
        }
        );
    }, []);

    return(
        <div className="Test">
            <form>   
                <h1>{testName}</h1>   
                <input type="text" placeholder="Введи свое имя" name="userName"></input>
                {questions.map(question =>
                    <Question question={question.question} answers={answers.filter(answers => answers.question.id === question.id)}/>
                )}

                <input type="submit"></input>
            </form>
        </div>
    )
}

export default Test;