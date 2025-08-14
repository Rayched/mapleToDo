//Maple To Do Version II 작업 시작
//2025-08-13 기준

import styled from "styled-components"
import Routers from "./Routing/Router";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

function App(){
  return (
    <Wrapper>
      <Routers />
    </Wrapper>
  );
};

export default App;