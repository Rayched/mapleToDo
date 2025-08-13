import styled from "styled-components";
import Routers from "./Routing/Router";
import { useState } from "react";

interface I_SideBar {
  SideBarHide: boolean;
}

const Wrapper = styled.div`
  width: 100vw;
  max-width: 550px;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SideBar = styled.aside<I_SideBar>`
  display: ${(props) => props.SideBarHide ? "none" : "flex"};
  position: absolute;
  right: 0%;
  width: 13em;
  height: 100%;
  background-color: rgba(150, 150, 150, 0.5);
`;

const Footers = styled.footer`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 11px;
    width: 100%;
    height: 1%;
    padding: 1px 0px;
`;

function App(){
  const [SideBarHide, SetSideBarHide] = useState(true);

  return (
    <Wrapper>
        <Routers />
        <SideBar SideBarHide={SideBarHide}>사이드 바 테스트</SideBar>
        <Footers>Data based on NEXON Open API</Footers>
    </Wrapper>
  );
}

export default App;