import styled from "styled-components";
import Routers from "./Router";
import { QueryClientProvider, useQueryClient } from "react-query";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Footers = styled.footer`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 13px;
    width: 100%;
    height: 1%;
`;

function App(){
  return (
    <Wrapper>
        <Routers />
        <Footers>Data based on NEXON Open API</Footers>
    </Wrapper>
  );
}

export default App;