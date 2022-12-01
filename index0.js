function Intro (props) {
    return (
        <div className="intro">
            <h1 className="intro-title">Quizzical</h1>
            <p className="intro-text">Let's test ur knowledge 💡</p>
            <button className="intro-btn" onClick={props.startQuiz}>Start quiz  🎯</button>
        </div>
    )
}

function EachQuiz(props){


    return(
        <div className="quiz-comp" >
            <h2 className="quiz-question">{props.question}</h2>
            <ul className="quiz-list">
                <li className="quiz-option" >{props.a}</li>
                <li className="quiz-option" >{props.b}</li>
                <li className="quiz-option" >{props.c}</li>
                <li className="quiz-option" >{props.d}</li>
            </ul>
        </div>
    )
}

function Quiz(props) {

    const [myQuiz, setMyQuiz] = React.useState(props.quizArray)
    // console.log(myQuiz)


    const displayElements = myQuiz.map(quiz => {
        return  <EachQuiz 
                    question ={quiz.question}
                    a={quiz.correct_answer}
                    b={quiz.incorrect_answers[0]}
                    c={quiz.incorrect_answers[1]}
                    d={quiz.incorrect_answers[2]}

                    />
    })

    return (
        <div>
            <h2 className="quiz-title">Choose your answer </h2>
            {displayElements}
            <button className="quiz-check-btn" onClick={props.checkAnswers}>Check answers</button>
        </div>
    )
}

function App (){

    const [start, setStart] = React.useState(false)
    const [quizArray, setQuizArray] = React.useState([])

    console.log(quizArray)



    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
            .then(res => res.json()
            .then(data => setQuizArray(data.results)))

    },[])


    function startQuiz() {
        setStart(true)
        console.log("started quiz!")
    }

    // function checkAnswers() {

       

    // }




















    return(
        <main>
           { 
            start ? 
            <Quiz 
                 quizArray={quizArray}
                // checkAnswers={checkAnswers}
            /> :

            <Intro 
                startQuiz={startQuiz}
                 quizArray={quizArray}

            />
            
           }



        
        </main>
    )
}

ReactDOM.render(<App />,document.getElementById("root"))