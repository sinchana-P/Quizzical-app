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

    const [answersArray, setAnswersArray] = React.useState(props.answers)
    console.log(answersArray)
    
    
    
    function selectAnswer(event,a_id){
     
        
        setAnswersArray(answersArray.map(each => {
            if(each.o_id != a_id){
                return {...each, isSelected : false}
            }else {
                return {...each, isSelected : true}
            }
        }
        ))
        
                console.log(answersArray[a_id].isSelected, a_id)
                // console.log(" -- ")

        //    styles()
        
    }


    function styles(answer,a_id){

        console.log(answer.text , answer.isSelected)


         const option = answer.text
        
       
            if(answer.isSelected == true){
                return({backgroundColor: "lightblue"})
            }
            // else if(props.answers[index].selected_answer === index){
            //     return({backgroundColor: "#F8BCBC"})
            // }
            else{
                return({backgroundColor: "transparent"})
            }
         
    }

    

    const answerElement = 
    answersArray.map((answer,a_id) => {
        return <li 
                    className="quiz-option" 
                    onClick={() => selectAnswer(event,a_id)} 
                    style={styles(answer ,a_id)}
                    key={a_id}
                >
                {answer.text}
                </li>
    })


    return(
        <div className="quiz-comp" >
            <h2 className="quiz-question">{props.question}</h2>
            <ul className="quiz-list">
                {answerElement}                
            </ul>
        </div>
    )
}

function Quiz(props) {
    
    const myQuiz = props.quizArray
    

    const displayElements = myQuiz.map((quiz,id) => {
        // const q_id = id
        // console.log(q_id)
        return  <EachQuiz 
                    question ={quiz.questionText}
                    answers ={quiz.answers}
                    q_id={id}                   
                    key={quiz.id} 
                    myQuiz={myQuiz}                  
                    />
    })

    function checkAnswers (){
        console.log("checking")

        // if(answer.isCorrect == true){
        //     return({backgroundColor: "lightgreen"})
        // }else{
        //     return({backgroundColor: "lightred"})
        // }

    }


    return (
        <div>
            <h2 className="quiz-title">Choose your answer </h2>
            {displayElements}
            <button className="quiz-check-btn" onClick={checkAnswers}>Check answers</button>
        </div>
    )
}

function App (){

    const [start, setStart] = React.useState(false)
    const [quizArray, setQuizArray] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
            .then(res => res.json())
            .then(data => setQuizArray(data.results.map((each, index) => {
                return (
                    {
                       id: index,
                       questionText: each.question,
                       answers: [                     
                        ...each.incorrect_answers.map(((answer,o_id) => {
                            return (
                                {
                                    text: answer,
                                    isCorrect: false,
                                    isSelected: false,
                                    o_id: o_id                                  
                                }
                            )
                        })),
                        {   
                            text: each.correct_answer,
                            isCorrect: true,
                            isSelected: false,
                            o_id:3 
                            
                        }
                       ],
                       gotScore: false 
                    }
                )
            })))
            
        },[])
        // console.log(quizArray)
       

    

     function held() {
        

        console.log("held!")
     }   
  



    function startQuiz() {
        setStart(true)
        console.log("started quiz!")
    }

   


    return(
        <main>
           { 
            start ? 
            <Quiz 
                 quizArray={quizArray}
                 held={held}

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



// rough >>>> lol 

// console.log(option,a_id)

        // answersArray.map(each => {
        //     if(each.isSelected == true) {
        //         return({backgroundColor: "blue"})
        //     }else{
        //         return({backgroundColor: "pink"})
        //     }
        // })

        // console.log(answer.text == option)
        // console.log(answer)
        // console.log("--------")


            // console.log(isSelected)
    
    // const styles = answersArray.map(each => {
    //         if(each.isSelected == true){
    //             console.log("yes")
    //            return ({backgroundColor: "pink"})
    //         }else{
    //             console.log("no")
                
    //             return ({backgroundColor : "white"})
    //         }
    //     })
    //      console.log("----*----")

       // console.log("In SelectAnswer")
        // console.log(event,a_id)
        
        // console.log(answersArray[a_id].o_id)

        