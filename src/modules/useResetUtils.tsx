import { useRecoilState, useRecoilValue } from "recoil";
import { A_MapleToDos, I_DataFormat, I_MapleToDos, S_MapleToDos, ToDoResetStore } from "../Atoms";
import { GetNowDateInfos, GetResetDts } from "./GetDateInfos";
import { useStore } from "zustand";
import useToDoReset from "./useToDoReset";

export default function useResetUtils(){
    const MapleToDos = useRecoilValue(A_MapleToDos);
    const [CharToDo, setCharToDo] = useRecoilState(S_MapleToDos);
    const {
        CurrentResetTargetDt,
        NextResetTargetDt,
        setResetTargetDts
    } = useStore(ToDoResetStore);

    const ToDays = GetNowDateInfos();

    //일정 완료와 관련된 정보를 업데이트하는 함수
    //일정 완료 여부, 완료 날짜를 업데이트
    const isToDoDone = (ToDoId: string) => {
        const Modifys = CharToDo?.map((todoData) => {
            if(ToDoId !== todoData.ContentsId){
                return todoData;
            } else {
                const UpdateValue: I_DataFormat = {
                    ContentsId: todoData.ContentsId,
                    ContentsNm: todoData.ContentsNm,
                    IsDone: true,
                    DoneTime: ToDays.FullDate,
                    Rank: todoData.Rank,
                    Ranks: todoData.Ranks,
                    openDt: todoData.openDt,
                    endDt: todoData.endDt
                };

                return UpdateValue;
            }
        });

        setCharToDo(Modifys);
    };

    return {
        ToDoDone: isToDoDone,
    };
};