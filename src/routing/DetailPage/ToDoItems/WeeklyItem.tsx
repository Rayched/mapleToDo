import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { I_DataFormat, S_MapleToDos } from "../../../Atoms";
import { I_ToDoItemProps } from "../ToDoList";
import BasedToDo from "./BasedToDo";

interface I_DelBtn {
    isDelete: boolean;
};

const Container = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WeeklyText = styled.div`
    color: inherit;
    text-decoration: inherit;
`;

const DelBtn = styled.button<I_DelBtn>`
    display: ${(props) => props.isDelete ? "flex" : "none"};
`;

function WeeklyItem({Delete, setDelete}: I_ToDoItemProps){
    const [WeeklyData, setWeeklyData] = useRecoilState(S_MapleToDos);

    const ToDoDelete = (TargetId?: string) => {
        const FindTarget = WeeklyData?.find((data) => data.ContentsId === TargetId);
        const isDelete = window.confirm(`'{ Id: ${FindTarget?.ContentsId} / Name: ${FindTarget?.ContentsNm} }'을 삭제하겠습니까?`);

        if(isDelete){
            const ModifyData = WeeklyData?.filter((data) => {
                if(data.ContentsId === FindTarget?.ContentsId){
                    return;
                } else {
                    return data;
                }
            });
            setWeeklyData(ModifyData);
            alert(`주간 컨텐츠, ${FindTarget?.ContentsNm}을 삭제했습니다.`);
            setDelete(false);
        } else {
            alert("일정 삭제를 취소했습니다.");
            setDelete(false);
            return;
        }
    };
    
    /*
    return (
        <Container>
            {
                WeeklyData?.map((weeklys) => {
                    return (
                        <ToDoItem key={weeklys.ContentsId} isDones={weeklys.IsDone}>
                            <input 
                                type="checkbox" 
                                onChange={() => onChange(weeklys.ContentsId)}
                                checked={weeklys.IsDone}
                            />
                            <ContentsBox>
                                <WeeklyText isDones={weeklys.IsDone}>{weeklys.ContentsNm}</WeeklyText>
                            </ContentsBox>
                            <DelBtn isDelete={Delete} onClick={() => ToDoDelete(weeklys.ContentsId)}>X</DelBtn>
                        </ToDoItem>
                    );
                })
            }
        </Container>
    );*/
    return (
        <Container>
            {
                WeeklyData?.map((weeklys) => {
                    return (
                        <BasedToDo key={weeklys.ContentsId} ToDoId={weeklys.ContentsId} isDones={weeklys.IsDone}>
                            <WeeklyText>{weeklys.ContentsNm}</WeeklyText>
                        </BasedToDo>
                    );
                })
            }
        </Container>
    );
};

export default WeeklyItem;