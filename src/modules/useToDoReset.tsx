import { useRecoilState } from "recoil";
import { A_MapleToDos, I_DataFormat, I_MapleToDos } from "../Atoms";
import { GetNowDateInfos } from "./GetDateInfos";

export default function useToDoReset(){
    const [ToDos, setToDos] = useRecoilState(A_MapleToDos);

    const AllToDoReset = () => {
        const DoneRecordReset = ToDos.map((data) => {
            const Weeklys = data.WeeklyToDos?.map((data) => {
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

            const BossDatas = data.BossToDos?.map((data) => {
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

            const Customs = data.CustomToDos?.map((data) => {
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

            const UpdataValue: I_MapleToDos = {
                charNm: data.charNm,
                ocids: data.ocids,
                latestResetDt: data.latestResetDt,
                WeeklyToDos: Weeklys,
                BossToDos: BossDatas,
                CustomToDos: Customs,
            };

            return UpdataValue;
        });

        setToDos(DoneRecordReset);
    };

    return {
        ToDoReset: AllToDoReset
    }
};