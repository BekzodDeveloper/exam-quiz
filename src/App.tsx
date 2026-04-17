import React, { ChangeEvent, useState } from 'react';

import { GlobalStyle, Wrapper, PasswordCard, PasswordInput, CategoryGrid, CategoryCard, SectionLabel } from "./App.styles";

import LoadingIMG from "./images/loading-gif.gif";
import nextArrowIMG from "./images/next.svg";
import { AnswerType, dataQuestions, ex, QuestionState, QuestionType } from "./state/state";
import { shuffleArray } from "./utils";
import { QuestionCardComponent } from "./components/QuestionCardComponent";
import { NavLink, Route, Routes } from "react-router-dom";


const concatToJSON: boolean = true;
type QuestionObj = {
    title: string, category: string, btnClass: string, path: string
}
type AllQuestions = Array<QuestionType>;

const App = () => {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<Array<QuestionState>>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Array<AnswerType>>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [totalQuestions, setTotalQuestions] = useState<number>(36)

    const startExamQuiz = async (category: string) => {
        setLoading(true)
        setGameOver(false)

        let allQuestions: AllQuestions;

        switch (category) {
            case "РК":
                allQuestions = dataQuestions.questionsCapital;
                break;
            case "ПМ":
                allQuestions = dataQuestions.questionsProd;
                break
            case "ИЭУ":
                allQuestions = dataQuestions.questionsHistory;
                break
            case "ЦЭ":
                allQuestions = dataQuestions.questionsDigEco;
                break
            case "ПТ":
                allQuestions = dataQuestions.questionsProdTech;
                break
            case "PR":
                allQuestions = dataQuestions.questionsPR;
                break
            case "МИ":
                allQuestions = dataQuestions.questionsMoR;
                break
            case "PM":
                allQuestions = dataQuestions.questionsPM;
                break
            case "МИ1":
                allQuestions = dataQuestions.questionsMoR1;
                break
            case "PM1":
                allQuestions = dataQuestions.questionsPM1;
                break
            case "Риск":
                allQuestions = dataQuestions.questionRisk;
                break
            case "Риск1":
                allQuestions = dataQuestions.questionRisk1;
                break
            case "Банк":
                allQuestions = dataQuestions.questionsBank;
                break
            case "Тайм":
                allQuestions = dataQuestions.questionsTime;
                break
            case "БизСтр":
                allQuestions = dataQuestions.questionsBusStr;
                break
            default:
                allQuestions = [];
        }

        const newQuestions: any = shuffleArray(allQuestions.map(questionItem => ({
            ...questionItem,
            answers: shuffleArray([...questionItem.incorrect_answers, questionItem.correct_answer])
        })));


        setTotalQuestions(newQuestions.length)
        setQuestions(newQuestions);
        setScore(0)
        setUserAnswers([])
        setNumber(0);
        setLoading(false)
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = e.currentTarget.value;

            const correct = questions[number].correct_answer === answer;

            if (correct) setScore(prev => prev + 1);
            const answerObj = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            };
            setUserAnswers(prev => [...prev, answerObj]);
        }
    }

    const nextQuestion = () => {
        const nextQuestion = number + 1;
        if (nextQuestion === totalQuestions) {
            setGameOver(true);
        } else if (nextQuestion === totalQuestions) {
            setGameOver(true);
        } else {
            setNumber(nextQuestion)
        }
    }

    function sliceArray(array: Array<string>) {
        let size: number = 5;
        let subarray: Array<Array<string>> = [];
        for (let i = 0; i < Math.ceil(array.length / size); i++) {
            subarray[i] = array.slice((i * size), (i * size) + size);
        }
        const objs: Array<QuestionType> = subarray.map(sub => (
            {
                category: "Тайм",
                type: "multiple",
                difficulty: "easy",
                question: sub[0],
                correct_answer: sub[1],
                incorrect_answers: [sub[2], sub[3], sub[4]]
            }
        ))
        return objs;
    }


    const questionArrays: Array<QuestionType> = sliceArray(ex.questions);

    const questionObjs: Array<QuestionObj> = [
        { title: "Банк и деньги", category: "Банк", btnClass: "next", path: "/bank" },
        { title: "Тайм Менеджмент", category: "Тайм", btnClass: "next", path: "/time" },
        { title: "Бизнес Стратегия", category: "БизСтр", btnClass: "next", path: "/busstr" },
    ];
    const questionObjs1: Array<QuestionObj> = [
        { title: "Риск Менеджмент", category: "Риск1", btnClass: "next", path: "/risk1" },
    ];


    type InputValue = string;
    const pass = "MNP31";
    const pass1 = "BBB31";
    const [inputValue, setInputValue] = useState<InputValue>("");

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }


    return (<>
        <GlobalStyle />
        <Wrapper>
            <h1>Exam Quiz</h1>

            <PasswordCard>
                <SectionLabel style={{ margin: 0 }}>Введите пароль для доступа</SectionLabel>
                <PasswordInput
                    type="password"
                    value={inputValue}
                    placeholder="Введите пароль"
                    onChange={inputChange}
                />
            </PasswordCard>

            {inputValue === pass ?
                <>
                    <SectionLabel>Выберите предмет</SectionLabel>
                    <Buttons startExamQuiz={startExamQuiz}
                        questionObjs={questionObjs} />
                </>
                : inputValue === pass1 ?
                    <>
                        <SectionLabel>Выберите предмет</SectionLabel>
                        <Buttons
                            startExamQuiz={startExamQuiz}
                            questionObjs={questionObjs1} />
                    </>
                    : null
            }

            {loading && (
                <div style={{ marginTop: '40px' }}>
                    <img style={{ width: '80px', opacity: 0.8 }} src={LoadingIMG} alt="Loading..." />
                </div>
            )}

            {!loading && !gameOver && (inputValue === pass || inputValue === pass1) && (

                <Routes>
                    {
                        (inputValue === pass ? questionObjs :
                            inputValue === pass1 ?
                                questionObjs1 : []).map(q => {
                                    return <Route path={q.path} element={
                                        <QuestionCardComponent
                                            questionNum={number + 1}
                                            totalQuestions={totalQuestions}
                                            question={questions[number].question}
                                            answers={questions[number].answers}
                                            userAnswer={userAnswers ? userAnswers[number] : undefined}
                                            checkAnswer={checkAnswer}
                                            gameOver={gameOver}
                                            userAnswers={userAnswers}
                                            startExamQuiz={startExamQuiz}
                                            questionCategory={questions[0].category}
                                            score={score}
                                        />
                                    } />
                                })

                    }
                </Routes>
            )}
            {!gameOver &&
                !loading &&
                userAnswers.length === number + 1 &&
                number !== totalQuestions - 1 && (inputValue === pass || inputValue === pass1) &&
                <button className='next' onClick={nextQuestion}>
                    Следующий вопрос{' '}
                    <img style={{ paddingLeft: '5px', filter: 'brightness(0) invert(1)' }} src={nextArrowIMG} alt="" />
                </button>
            }
            <div className='powered'></div>

        </Wrapper>
        <>
            {
                concatToJSON && questionArrays.map(myQ => {

                    return <p>
                        {`{`}
                        category: "{myQ.category}",
                        type: "{myQ.type}",
                        difficulty: "{myQ.difficulty}",
                        question: "{myQ.question}",
                        correct_answer: "{myQ.correct_answer}",
                        incorrect_answers: [{myQ.incorrect_answers.map(ia => `"${ia}",`)}]
                        {`},`}
                    </p>

                })

            }

        </>

    </>
    );
}


type ButtonsType = {
    startExamQuiz: (category: string) => void
    questionObjs: Array<QuestionObj>
}

const Buttons: React.FC<ButtonsType> = ({ startExamQuiz, questionObjs }) => {
    return (
        <CategoryGrid>
            {questionObjs.map(q => (
                <CategoryCard key={q.category}>
                    <NavLink
                        to={q.path}
                        onClick={() => startExamQuiz(q.category)}
                    >
                        {q.title}
                    </NavLink>
                </CategoryCard>
            ))}
        </CategoryGrid>
    );
}

export default App;
