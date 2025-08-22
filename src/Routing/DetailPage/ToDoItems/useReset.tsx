import { useRecoilState, useRecoilValue } from "recoil";
import { A_MapleToDos, CategoriesAtom, I_DataFormat, I_MapleToDos } from "../../../Atoms";
import { useState } from "react";

export default function useReset(charNm: string){
    const [ToDoDatas, setToDoData] = useRecoilState(A_MapleToDos);

    const ToDoReset = () => {
        const Idx = ToDoDatas.findIndex((data) => data.charNm === charNm);
        const Targets = ToDoDatas[Idx];
        
        //주간 컨텐츠, 완료 기록 초기화
        const ModifyWeeklys = Targets.WeeklyToDos?.map((weeklys) => {
            if(!weeklys.IsDone){
                return weeklys;
            } else {
                const newValue: I_DataFormat = {
                    ContentsId: weeklys.ContentsId,
                    ContentsNm: weeklys.ContentsNm,
                    IsDone: false
                };
                return newValue;
            }
        });

        //보스 컨텐츠, 완료 기록 초기화
        const ModifyBossToDos = Targets.BossToDos?.map((bossToDo) => {
            if(!bossToDo.IsDone){
                return bossToDo;
            } else {
                const NewValue: I_DataFormat = {
                    ContentsId: bossToDo.ContentsId,
                    ContentsNm: bossToDo.ContentsNm,
                    IsDone: false,
                    Rank: bossToDo.Rank,
                    Ranks: bossToDo.Ranks
                };
                return NewValue;
            }
        });

        //기타 메할일, 완료 기록 초기화
        const ModifyCustomToDos = Targets.CustomToDos?.map((customs) => {
            if(!customs.IsDone){
                return customs;
            } else {
                const NewValue: I_DataFormat = {
                    ContentsId: customs.ContentsId,
                    ContentsNm: customs.ContentsNm,
                    IsDone: false,
                    openDt: customs.openDt,
                    endDt: customs.endDt
                };
                return NewValue;
            }
        });
            
        //초기화 기록, Update
        const EditCharData: I_MapleToDos = {
            charNm: Targets.charNm,
            ocids: Targets.ocids,
            WeeklyToDos: ModifyWeeklys,
            BossToDos: ModifyBossToDos,
            CustomToDos: ModifyCustomToDos
        };

        setToDoData((oldData) => [
            ...oldData.slice(0, Idx),
            EditCharData,
            ...oldData.slice(Idx + 1)
        ]);
    }

    return {ToDoReset};
};