import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { S_MapleToDos} from "../../../Atoms";
import BasedToDo from "./BasedToDo";

const Container = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContentsBox = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
`;

const ToDoText = styled.div`
    display: flex;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 3px;
`;

const DateBox = styled.div<{isDone?: boolean}>`
    width: 100%;
    background-color: ${(props) => props.isDone ? "rgb(99, 110, 114)" : "rgb(236, 236, 238)"};
`;

function CustomToDoItem(){
    //const [Customs, setCustoms] = useRecoilState(S_MapleToDos);
    const CustomToDos = useRecoilValue(S_MapleToDos);

    return (
        <Container>
            {
                CustomToDos?.map((todoData) => {
                    return (
                        <BasedToDo key={todoData.ContentsId} ToDoId={todoData.ContentsId} isDones={todoData.DoneInfo?.isDone}>
                            <ContentsBox>
                                <ToDoText>{todoData.ContentsId}</ToDoText>
                                {
                                    todoData.openDt !== "" && todoData.endDt !== ""
                                    ? <DateBox isDone={todoData.DoneInfo?.isDone}>{todoData.openDt} ~ {todoData.endDt}</DateBox> : null
                                }
                            </ContentsBox>
                        </BasedToDo>
                    );
                })
            }
        </Container>
    );
};

export default CustomToDoItem;