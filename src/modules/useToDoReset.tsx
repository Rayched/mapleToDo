import { useRecoilState } from "recoil";
import { A_MapleToDos, I_DataFormat, I_MapleToDos } from "../Atoms";
import { GetNowDateInfos } from "./GetDateInfos";

export default function useToDoReset(){
    const [ToDos, setToDos] = useRecoilState(A_MapleToDos);

    const ToDoReset = (targetNm?: string) => {
        const Idx = ToDos.findIndex((data) => data.charNm === targetNm);

        if(Idx === -1){
            return;
        } else {
            const GetCharToDos = ToDos[Idx];

            const WeeklyToDos = GetCharToDos.WeeklyToDos?.map((data) => {
                if(data.IsDone){
                    const UpdateValue: I_DataFormat = {
                        ContentsId: data.ContentsId,
                        ContentsNm: data.ContentsNm,
                        IsDone: false,
                        DoneTime: "",
                    };
                    return UpdateValue;
                } else {
                    return data;
                }
            });

            const BossToDos = GetCharToDos.BossToDos?.map((data) => {
                if(data.IsDone){
                    const UpdateValue: I_DataFormat = {
                        ContentsId: data.ContentsId,
                        ContentsNm: data.ContentsNm,
                        IsDone: false,
                        DoneTime: "",
                        Rank: data.Rank,
                        Ranks: data.Ranks
                    };

                    return UpdateValue;
                } else {
                    return data;
                }
            });

            const CustomToDos = GetCharToDos.CustomToDos?.map((data) => {
                if(data.IsDone){
                    const UpdateValue: I_DataFormat = {
                        ContentsId: data.ContentsId,
                        ContentsNm: data.ContentsNm,
                        IsDone: false,
                        openDt: data.openDt,
                        endDt: data.endDt
                    };

                    return UpdateValue;
                } else {
                    return data;
                }
            });

            setToDos((s) => {
                const UpdateCharData: I_MapleToDos = {
                    charNm: s[Idx].charNm,
                    ocids: s[Idx].ocids,
                    latestResetDt: "",
                    WeeklyToDos: WeeklyToDos,
                    BossToDos: BossToDos,
                    CustomToDos: CustomToDos
                };

                return [
                    ...s.slice(0, Idx),
                    UpdateCharData,
                    ...s.slice(Idx + 1)
                ];
            })
        };
    };

    return {
        ToDoReset: ToDoReset
    }
};