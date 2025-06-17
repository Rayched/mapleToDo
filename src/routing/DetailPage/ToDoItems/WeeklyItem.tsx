import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { S_MapleToDos } from "../../../Atoms";
import BasedToDo from "./BasedToDo";

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

function WeeklyItem(){
    const WeeklyData = useRecoilValue(S_MapleToDos);
 
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