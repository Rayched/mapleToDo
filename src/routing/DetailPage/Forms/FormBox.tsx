import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CategoriesAtom } from "../../../Atoms";
import AddWeeklyForm from "./WeeklyForms";
import AddBossForm from "./BossForms";
import AddCustomForms from "./ToDoForms";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0%;
    right: 0%;
    position: absolute;
    background-color: rgba(10, 10, 10, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 30em;
    height: 38em;
    background-color: rgba(245, 245, 245, 1.0);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
`;

const ToDoHeader = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    padding: 8px;
`;

const ToDoBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .CategoryNm {
        font-size: 1.2rem;
    };
`;

export interface I_AddToDoParams {
    setHide: Function;
};

function FormBox({setHide}: I_AddToDoParams){
    const NowCategories = useRecoilValue(CategoriesAtom);
    
    return (
        <Wrapper>
            <Container>
                <ToDoHeader>
                    <button onClick={() => setHide(false)}>취소</button>
                </ToDoHeader>
                <ToDoBody>
                    <div className="CategoryNm">{NowCategories.name}</div>
                    <div className="ToDoSelect">
                        {NowCategories.Id === "Weeklys" ? <AddWeeklyForm setHide={setHide}/> : null}
                        {NowCategories.Id === "Boss" ? <AddBossForm setHide={setHide}/> : null}
                        {NowCategories.Id === "Customs" ? <AddCustomForms setHide={setHide}/> : null}
                    </div>
                </ToDoBody>
            </Container>
        </Wrapper>
    );
};

export default FormBox;