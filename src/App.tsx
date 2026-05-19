import React, { useState } from 'react';

import { GlobalStyle, Wrapper, CategoryGrid, CategoryCard, SectionLabel } from "./App.styles";

import LoadingIMG from "./images/loading-gif.gif";
import nextArrowIMG from "./images/next.svg";
import { AnswerType, dataQuestions, QuestionState, QuestionType } from "./state/state";
import { shuffleArray } from "./utils";
import { QuestionCardComponent } from "./components/QuestionCardComponent";
import { NavLink, Route, Routes } from "react-router-dom";


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
            case "HRM-7":
                allQuestions = dataQuestions.questionsHRM7;
                break
            case "HRM-8":
                allQuestions = dataQuestions.questionsHRM8;
                break
            case "HRM-9":
                allQuestions = dataQuestions.questionsHRM9;
                break
            case "HRM-10":
                allQuestions = dataQuestions.questionsHRM10;
                break
            case "HRM-11":
                allQuestions = dataQuestions.questionsHRM11;
                break
            case "HRM-12":
                allQuestions = dataQuestions.questionsHRM12;
                break
            case "ACC-4":
                allQuestions = dataQuestions.questionsACC4;
                break
            case "ACC-10":
                allQuestions = dataQuestions.questionsACC10;
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
        const next = number + 1;
        if (next === totalQuestions) {
            setGameOver(true);
        } else {
            setNumber(next)
        }
    }

    const allQuestionObjs: Array<QuestionObj> = [
        { title: "Банк и деньги", category: "Банк", btnClass: "next", path: "/bank" },
        { title: "Тайм Менеджмент", category: "Тайм", btnClass: "next", path: "/time" },
        { title: "Бизнес Стратегия", category: "БизСтр", btnClass: "next", path: "/busstr" },
        { title: "Риск Менеджмент", category: "Риск1", btnClass: "next", path: "/risk1" },
        { title: "Ch.7 — Retention & Motivation", category: "HRM-7", btnClass: "next", path: "/hrm7" },
        { title: "Ch.8 — Training & Development", category: "HRM-8", btnClass: "next", path: "/hrm8" },
        { title: "Ch.9 — Employee Communication", category: "HRM-9", btnClass: "next", path: "/hrm9" },
        { title: "Ch.10 — Managing Performance", category: "HRM-10", btnClass: "next", path: "/hrm10" },
        { title: "Ch.11 — Employee Assessment", category: "HRM-11", btnClass: "next", path: "/hrm11" },
        { title: "Ch.12 — Labor Unions", category: "HRM-12", btnClass: "next", path: "/hrm12" },
        { title: "ACC Ch.4 — Tangible Assets", category: "ACC-4", btnClass: "next", path: "/acc4" },
        { title: "ACC Ch.10 — Revenue & Expenses", category: "ACC-10", btnClass: "next", path: "/acc10" },
    ];

    return (<>
        <GlobalStyle />
        <Wrapper>
            <h1>Exam Quiz</h1>

            <SectionLabel>Выберите предмет</SectionLabel>
            <Buttons startExamQuiz={startExamQuiz} questionObjs={allQuestionObjs} />

            {loading && (
                <div style={{ marginTop: '40px' }}>
                    <img style={{ width: '80px', opacity: 0.8 }} src={LoadingIMG} alt="Loading..." />
                </div>
            )}

            {!loading && !gameOver && (
                <Routes>
                    {allQuestionObjs.map(q => (
                        <Route key={q.path} path={q.path} element={
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
                    ))}
                </Routes>
            )}

            {!gameOver &&
                !loading &&
                userAnswers.length === number + 1 &&
                number !== totalQuestions - 1 &&
                <button className='next' onClick={nextQuestion}>
                    Следующий вопрос{' '}
                    <img style={{ paddingLeft: '5px', filter: 'brightness(0) invert(1)' }} src={nextArrowIMG} alt="" />
                </button>
            }
            <div className='powered'></div>

        </Wrapper>
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
