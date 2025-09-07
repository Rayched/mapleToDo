import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { CategoriesAtom } from "../../../Atoms";
import AddWeeklyForm from "./WeeklyForms";
import AddBossForm from "./BossForms";
import AddCustomForms from "./ToDoForms";

const Container = styled.div`
    width: 20em;
    height: 30em;
    background-color: rgba(245, 245, 245, 1.0);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
`;

const ToDoHeader = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;
    padding: 8px;
`;

const CloseBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid rgb(83, 92, 104);
    border-radius: 25px;
    width: 1em;
    height: 1em;
    padding: 2px;
    color: rgb(250, 250, 250);
    background-color: rgb(83, 92, 104);
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
        <Container>
            <ToDoHeader>
                <CloseBtn onClick={() => setHide(false)}>×</CloseBtn>
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
    );
};

export default FormBox;