import { useRecoilState, useRecoilValue } from "recoil";
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
    width: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const WeeklyText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 17px;
    font-weight: bold;
`;

const DelBtn = styled.button<I_DelBtn>`
    display: ${(props) => props.isDelete ? "flex" : "none"};
`;

function WeeklyItem({Delete, setDelete}: I_ToDoItemProps){
    const [WeeklyData, setWeeklyData] = useRecoilState(ToDos);

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

    return (
        <Container>
            {
                WeeklyData?.map((weeklys) => {
                    return (
                        <ToDoItem key={weeklys.ContentsId}>
                            <input type="checkbox"/>
                            <ContentsBox>
                                <WeeklyText>{weeklys.ContentsNm}</WeeklyText>
                            </ContentsBox>
                            <DelBtn isDelete={Delete} onClick={() => ToDoDelete(weeklys.ContentsId)}>X</DelBtn>
                        </ToDoItem>
                    );
                })
            }
        </Container>
    );
};

export default WeeklyItem;