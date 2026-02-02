import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default function AddToDosPage(){
    const Navigate = useNavigate();
    return (
        <Wrapper>
            <h4>Test</h4>
            <div onClick={() => Navigate("..")}>Return</div>
        </Wrapper>
    );
}