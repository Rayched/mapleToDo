import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ToDos } from "../../../Atoms";
import { I_ToDoItemProps } from "../ToDoList";

interface I_DelBtn {
    isDelete: boolean;
};

const Container = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ToDoItem = styled.li`
    display: flex;
    align-items: center;
    width: 18em;
    background-color: rgb(220, 221, 225);
    border: 2px solid rgb(220, 221, 225);
    border-radius: 12px;
    padding: 3px;
    margin: 3px 0px;
`;

const ContentsBox = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
`;

const ToDoText = styled.div`
    display: flex;
    font-size: 17px;
    font-weight: bold;
`;

const DateBox = styled.div`
    width: 100%;
    background-color: rgb(236, 236, 238);
`;

const DelBtn = styled.button<I_DelBtn>`
    display: ${(props) => props.isDelete ? "flex" : "none"};
`;

function CustomToDoItem({Delete, setDelete}: I_ToDoItemProps){
    const [Customs, setCustoms] = useRecoilState(ToDos);

    const ToDoDelete = (TargetId?: string) => {
        const Targets = Customs?.find((data) => data.ContentsId === TargetId);
        const isDelete = window.confirm(`{ 일정 명: ${Targets?.ContentsId} }를 삭제하겠습니까?`);

        if(isDelete){
            const ModifyData = Customs?.filter((customToDo) => {
                if(customToDo.ContentsId === Targets?.ContentsId){
                    return;
                } else {
                    return customToDo;
                }
            });
            setCustoms(ModifyData);
            alert("일정을 삭제했습니다.");
            setDelete(false);
            return;
        } else {
            alert("일정을 삭제하지 않았습니다.");
            setDelete(false);
            return;
        }
    };

    return (
        <Container>
            {
                Customs?.map((todoData) => {
                    return (
                        <ToDoItem key={todoData.ContentsId}>
                            <input type="checkbox"/>
                            <ContentsBox>
                                <ToDoText>{todoData.ContentsId}</ToDoText>
                                {
                                    todoData.openDt !== "" && todoData.endDt !== ""
                                    ? <DateBox>{todoData.openDt} ~ {todoData.endDt}</DateBox> : null
                                }
                            </ContentsBox>
                            <DelBtn isDelete={Delete} onClick={() => ToDoDelete(todoData.ContentsId)}>X</DelBtn>
                        </ToDoItem>
                    );
                })
            }
        </Container>
    );
};

export default CustomToDoItem;