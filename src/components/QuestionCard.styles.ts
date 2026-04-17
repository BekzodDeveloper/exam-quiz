import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 760px;
  width: 100%;
  margin: 0 10px;
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 20px;
  padding: 28px 28px 24px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
  text-align: center;

  p {
    font-size: 1rem;
    font-weight: 400;
    color: var(--clr-text);
    line-height: 1.6;
  }
`;

export type ButtonWrapperProps = {
    correct: boolean
    userClicked: boolean
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${({userClicked, correct}) =>
      (correct || userClicked) ? 1 : 0.85};
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 0.95rem;
    font-weight: 500;
    width: 100%;
    height: 100%;
    min-height: 52px;
    margin: 5px 0;
    padding: 10px 16px;
    border-radius: 12px;
    transition: background 0.25s ease, border-color 0.25s ease,
                color 0.25s ease, box-shadow 0.25s ease;

    background: ${({correct, userClicked}) =>
      correct
        ? 'var(--clr-correct)'
        : userClicked && !correct
          ? 'var(--clr-wrong)'
          : 'var(--clr-surface-2)'};

    border: 2px solid ${({correct, userClicked}) =>
      correct
        ? 'var(--clr-correct)'
        : userClicked && !correct
          ? 'var(--clr-wrong)'
          : 'var(--clr-border)'};

    box-shadow: ${({correct, userClicked}) =>
      correct
        ? '0 0 14px var(--clr-correct-glow)'
        : userClicked && !correct
          ? '0 0 14px var(--clr-wrong-glow)'
          : 'none'};

    color: ${({correct, userClicked}) =>
      (correct || userClicked) ? '#fff' : 'var(--clr-text)'};
  }
`;

export const AnswerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 8px;
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background: var(--clr-surface-2);
  border-radius: 999px;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({percent}) => percent}%;
  background: linear-gradient(90deg, var(--clr-primary), #a78bfa);
  border-radius: 999px;
  transition: width 0.4s ease;
`;
