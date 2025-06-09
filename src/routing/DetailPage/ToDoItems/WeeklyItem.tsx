import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { I_DataFormat, S_MapleToDos } from "../../../Atoms";
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

const ToDoItem = styled.li<{isDones?: boolean}>`
    display: flex;
    align-items: center;
    width: 18em;
    background-color: ${(props) => props.isDones ? "rgb(85, 85, 85)" : "rgb(220, 221, 225)"};
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

const WeeklyText = styled.div<{isDones?: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    color: ${(props) => props.isDones ? "lightgray" : "black"};
    text-decoration: ${(props) => props.isDones ? "line-through" : "none"};
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

    const onChange = (ContentsId?: string) => {
        const Idx = WeeklyData?.findIndex((data) => data.ContentsId === ContentsId);
        const getWeeklyDatas = WeeklyData?.find((data) => data.ContentsId === ContentsId);
        
        if(Idx !== -1 && getWeeklyDatas !== undefined){
            const ModifyData = WeeklyData?.map((data) => {
                if(data.ContentsId === ContentsId){
                    const IsDoneToDos: I_DataFormat = {
                        ContentsId: getWeeklyDatas.ContentsId,
                        ContentsNm: getWeeklyDatas.ContentsNm,
                        IsDone: !(getWeeklyDatas.IsDone) ? true : false,
                        Rank: getWeeklyDatas.Rank,
                        Ranks: getWeeklyDatas.Ranks,
                        openDt: getWeeklyDatas.openDt,
                        endDt: getWeeklyDatas.endDt
                    };
                    return IsDoneToDos;
                } else {
                    return data;
                }
            });
            setWeeklyData(ModifyData);
        } else {
            return;
        }
    };

    return (
        <Container>
            {
                WeeklyData?.map((weeklys) => {
                    return (
                        <ToDoItem key={weeklys.ContentsId} isDones={weeklys.IsDone}>
                            <input type="checkbox" onChange={() => onChange(weeklys.ContentsId)}/>
                            <ContentsBox>
                                <WeeklyText isDones={weeklys.IsDone}>{weeklys.ContentsNm}</WeeklyText>
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