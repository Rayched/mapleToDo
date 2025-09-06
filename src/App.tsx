//Maple To Do Version II 작업 시작
//2025-08-13 기준

import styled from "styled-components"
import Routers from "./Routing/Router";

const Wrapper = styled.div<{maxHeight: number}>`
  width: 100vw;
  height: 100vh;
  max-height: ${(props) => props.maxHeight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Messages = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

function App(){
  return (
    <Wrapper maxHeight={window.innerHeight}>
      <Routers />
      <Messages>Data based on NEXON Open API</Messages>
    </Wrapper>
  );
};

export default App;