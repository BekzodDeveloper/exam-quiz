import React from 'react';
import { AnswerWrapper, ButtonWrapper, ProgressBarFill, ProgressBarTrack, Wrapper } from "./QuestionCard.styles";
import { AnswerType } from "../state/state";

type QuestionCardType = {
    question: string
    answers: Array<string>
    userAnswer: AnswerType | undefined
    questionNum: number
    totalQuestions: number
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void,
    gameOver: boolean,
    userAnswers: Array<AnswerType>
    startExamQuiz: (category: string) => void,
    questionCategory: string
    score: number
}


export const QuestionCardComponent: React.FC<QuestionCardType> =
    ({
        checkAnswer,
        question,
        answers,
        userAnswer,
        questionNum,
        totalQuestions,
        gameOver,
        userAnswers,
        startExamQuiz,
        questionCategory,
        score
    }) => {
        const percent = Math.round((questionNum / totalQuestions) * 100);

        return (
            <>
                <Wrapper>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ color: 'var(--clr-text-muted)', fontSize: '14px' }}>
                            Вопрос {questionNum} / {totalQuestions}
                        </span>
                        <span style={{ color: 'var(--clr-text-muted)', fontSize: '14px' }}>
                            Счёт:{' '}
                            <span style={{ color: 'var(--clr-correct)', fontWeight: 600 }}>{score}</span>
                            {' '}/ {questionNum}
                        </span>
                    </div>
                    <ProgressBarTrack>
                        <ProgressBarFill percent={percent} />
                    </ProgressBarTrack>

                    <p style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--clr-text)', lineHeight: '1.7', margin: '0 0 16px' }}
                        dangerouslySetInnerHTML={{ __html: question }} />

                    <AnswerWrapper>
                        {answers.map(ans => (
                            <ButtonWrapper
                                key={ans}
                                correct={userAnswer?.correctAnswer === ans}
                                userClicked={userAnswer?.answer === ans}>
                                <button value={ans} disabled={!!userAnswer} onClick={checkAnswer}>
                                    <span dangerouslySetInnerHTML={{ __html: ans }} />
                                </button>
                            </ButtonWrapper>))}
                    </AnswerWrapper>

                    {gameOver || userAnswers.length === totalQuestions
                        ? <button
                            className='start'
                            style={{ marginTop: '28px', backgroundColor: 'var(--clr-correct)', borderColor: 'var(--clr-correct)' }}
                            onClick={() => startExamQuiz(questionCategory)}>
                            Рестарт ▶
                          </button>
                        : null}
                </Wrapper>
            </>
        );
    }
