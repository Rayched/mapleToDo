import { useState } from "react";
import styled from "styled-components";

interface I_SideBar {
    isShow: boolean;
}

const SideBar_Wrapper = styled.div<I_SideBar>`
    position: absolute;
    width: 20em;
    height: 100%;
    right: 0%;
    background-color: rgba(100, 100, 100, 0.5);
`;

function SideBar(){
    const [isShow, setShow] = useState(false);
    return (
        <SideBar_Wrapper isShow={isShow}>
            <button onClick={() => setShow((prev) => !prev)}>Hide</button>
        </SideBar_Wrapper>
    );
};

export default SideBar;