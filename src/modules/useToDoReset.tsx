import { useRecoilState, useRecoilValue } from "recoil";
import { I_DataFormat, S_MapleToDos, ToDoResetStore } from "../Atoms";
import { GetNowDateInfos } from "./GetFullDate";
import { GetResetDts } from "./GetDateInfos";
import { useStore } from "zustand";


export default function useToDoReset(){
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

    //리셋 날짜를 Setting하는 함수
    const UpdateResetDt = () => {
        const ResetDts = GetResetDts();

        //Current, Next 둘중 하나라도 ""인 경우
        if(CurrentResetTargetDt === "" || NextResetTargetDt === ""){
            setResetTargetDts({
                CurrentFullDate: ResetDts.CurrentResetDt,
                NextFullDate: ResetDts.NextResetDt
            });
        } else {
            const NowToMS = ToDays.Millies;
            const CurrentToMS = new Date(ResetDts.CurrentResetDt).getTime();
            const NextToMS = new Date(ResetDts.NextResetDt).getTime();

            const Diffs = NowToMS - CurrentToMS;
            const WeeksPassed = Math.floor(Diffs / (7 * 24 * 60 * 60 * 1000));

            if(WeeksPassed >= 1){
                if(NowToMS >= CurrentToMS && NowToMS < NextToMS){
                    return;
                } else {
                    setResetTargetDts({
                        CurrentFullDate: ResetDts.CurrentResetDt,
                        NextFullDate: ResetDts.NextResetDt
                    })
                }
            }
        }
    };

    return {
        ToDoDone: isToDoDone,
        UpdateResetDt: UpdateResetDt,
    };
};