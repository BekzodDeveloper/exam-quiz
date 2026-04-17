import styled, {createGlobalStyle, keyframes} from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const GlobalStyle = createGlobalStyle`
  :root {
    --clr-bg:             #0f0f1a;
    --clr-surface:        #1a1a2e;
    --clr-surface-2:      #22223b;
    --clr-primary:        #6c63ff;
    --clr-primary-dark:   #4b44cc;
    --clr-primary-glow:   rgba(108,99,255,0.25);
    --clr-correct:        #22c55e;
    --clr-correct-glow:   rgba(34,197,94,0.3);
    --clr-wrong:          #ef4444;
    --clr-wrong-glow:     rgba(239,68,68,0.3);
    --clr-text:           #f1f5f9;
    --clr-text-muted:     #94a3b8;
    --clr-border:         rgba(255,255,255,0.1);
    --clr-hr:             rgba(255,255,255,0.08);
  }

  html {
    min-height: 100%;
  }

  body {
    background: radial-gradient(ellipse at top, #1a1a3e 0%, #0f0f1a 70%);
    min-height: 100vh;
    margin: 0;
    padding: 0 20px 100px;
    display: flex;
    justify-content: center;
  }

  * {
    box-sizing: border-box;
    font-family: 'Ubuntu', sans-serif;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-bottom: 50px;
  animation: ${fadeIn} 0.35s ease both;

  > p {
    color: var(--clr-text-muted);
  }

  .score {
    color: var(--clr-text);
    font-size: 20px;
    line-height: 26px;
    margin: 20px 0px 10px;
    font-weight: 400;
  }

  h1 {
    background: linear-gradient(135deg, #a78bfa 0%, #67e8f9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2rem;
    font-weight: 700;
    margin: 40px auto 20px;
    padding: 0 10px;
    text-align: center;
    letter-spacing: -0.5px;
  }

  hr {
    width: 100%;
    border: none;
    border-top: 1px solid var(--clr-hr);
    margin: 8px 0 20px;
  }

  .start, .next {
    cursor: pointer;
    background: var(--clr-primary);
    border: none;
    border-radius: 12px;
    height: 44px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;

    &:hover {
      background: var(--clr-primary-dark);
      box-shadow: 0 0 16px var(--clr-primary-glow);
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }

    a {
      font-size: 14px;
      font-weight: 500;
      display: inline-flex;
      height: 100%;
      align-items: center;
      width: 100%;
      padding: 0 10px;
      color: #fff;
      text-decoration: none;

      &.active {
        text-decoration: none;
      }
    }
  }

  .dnone {
    display: none;
  }

  .start {
    max-width: 200px;
  }

  .next {
    margin-top: 20px;
  }

  .powered {
    position: fixed;
    bottom: 0;
    background: var(--clr-surface);
    border-top: 1px solid var(--clr-border);
    z-index: 10;
    width: 100%;
    padding: 10px;
    text-align: center;

    a {
      color: var(--clr-text-muted);
    }
  }
`;

export const PasswordCard = styled.div`
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 16px;
  padding: 32px 40px;
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  margin-top: 16px;
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: var(--clr-surface-2);
  border: 1px solid var(--clr-border);
  border-radius: 10px;
  color: var(--clr-text);
  font-size: 1rem;
  font-family: 'Ubuntu', sans-serif;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: var(--clr-text-muted);
  }

  &:focus {
    border-color: var(--clr-primary);
    box-shadow: 0 0 0 3px var(--clr-primary-glow);
  }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
  width: 100%;
  max-width: 620px;
  margin-top: 8px;
`;

export const CategoryCard = styled.button`
  background: var(--clr-surface);
  border: 1px solid var(--clr-border);
  border-radius: 14px;
  padding: 0;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease,
              box-shadow 0.2s ease, transform 0.15s ease;

  &:hover {
    background: var(--clr-surface-2);
    border-color: var(--clr-primary);
    box-shadow: 0 0 18px var(--clr-primary-glow);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    padding: 0 16px;
    color: var(--clr-text);
    text-decoration: none;
    font-size: 15px;
    font-weight: 500;
    text-align: center;

    &.active {
      color: var(--clr-primary);
    }
  }
`;

export const SectionLabel = styled.p`
  color: var(--clr-text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 20px 0 4px;
`;
