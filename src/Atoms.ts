import { atom, selector } from "recoil";
import {recoilPersist} from "recoil-persist";

//ocid 관련 (ocid => 일종의 캐릭터 고유 id)
export interface I_Ocids {
    ocid: string;
    charNm?: string;
}

export const OcidAtoms = atom<I_Ocids>({
    key: "OcidAtom",
    default: {ocid: "", charNm: ""}
});

//Category 관련
export interface I_Categories {
    Id: string;
    name: string;
};

export enum Categories {
    Weeklys = "Weeklys",
    Boss = "Boss",
    Customs = "Customs"
};

export const CategoriesAtom = atom<I_Categories>({
    key: "CategoriesAtom",
    default: { Id: "Weeklys", name: "주간 컨텐츠" }
});

//ToDo Data 관련
const {persistAtom: ToDoSave} = recoilPersist();

export interface I_DataFormat {
    ContentsId?: string;
    ContentsNm?: string;
    IsDone?: boolean;
    Rank?: string;
    Ranks?: string[];
    openDt?: string;
    endDt?: string;
}

export interface I_MapleToDos {
    charNm: string;
    ocids: string;
    WeeklyToDos?: I_DataFormat[];
    BossToDos?: I_DataFormat[];
    CustomToDos?: I_DataFormat[];
};

export const A_MapleToDos = atom<I_MapleToDos[]>({
    key: "A_MapleToDos",
    default: [],
    effects_UNSTABLE: [ToDoSave]
});

export const S_MapleToDos = selector({
    key: "MapleToDos_Selector",
    get: ({get}) => {
        const CharId = get(OcidAtoms);
        const MapleToDos = get(A_MapleToDos);
        const NowCategory = get(CategoriesAtom).Id;

        const Idx = MapleToDos.findIndex((data) => data.charNm === CharId.charNm);

        if(Idx === -1){
            return null;
        } else {
            const CharData = MapleToDos[Idx];

            if(NowCategory === Categories.Weeklys){
                const WeeklyDatas = CharData.WeeklyToDos;
                return WeeklyDatas;
            } else if(NowCategory === Categories.Boss){
                const BossDatas = CharData.BossToDos;
                return BossDatas;
            } else {
                const CustomToDos = CharData.CustomToDos;
                return CustomToDos;
            }
        }
    },
    set: ({set, get}, newValue) => {
        const CharNm = get(OcidAtoms).charNm;
        const Idx = get(A_MapleToDos).findIndex((data) => data.charNm === CharNm);
        const CharData = get(A_MapleToDos)[Idx];

        const NowCategory = get(CategoriesAtom).Id;

        if(NowCategory === Categories.Weeklys){
            set(A_MapleToDos, (oldData) => {
                const Convert: I_MapleToDos = {
                    charNm: CharData.charNm,
                    ocids: CharData.ocids,
                    WeeklyToDos: newValue as I_DataFormat[],
                    BossToDos: CharData.BossToDos,
                    CustomToDos: CharData.CustomToDos
                };

                return [
                    ...oldData.slice(0, Idx),
                    Convert,
                    ...oldData.slice(Idx + 1)
                ];
            })
        } else if(NowCategory === Categories.Boss){
            set(A_MapleToDos, (oldData) => {
                const Convert: I_MapleToDos = {
                    charNm: CharData.charNm,
                    ocids: CharData.ocids,
                    WeeklyToDos: CharData.WeeklyToDos,
                    BossToDos: newValue as I_DataFormat[],
                    CustomToDos: CharData.CustomToDos
                };

                return [
                    ...oldData.slice(0, Idx),
                    Convert,
                    ...oldData.slice(Idx + 1)
                ];
            });
        } else if(NowCategory === Categories.Customs){
            set(A_MapleToDos, (oldData) => {
                const Convert: I_MapleToDos = {
                    charNm: CharData.charNm,
                    ocids: CharData.ocids,
                    WeeklyToDos: CharData.WeeklyToDos,
                    BossToDos: CharData.BossToDos,
                    CustomToDos: newValue as I_DataFormat[]
                };
                return [
                    ...oldData.slice(0, Idx),
                    Convert,
                    ...oldData.slice(Idx + 1)
                ];
            })
        }
    }
});

//캐릭터 닉네임 저장, 북마크 관련

const {persistAtom: charNmPersist} = recoilPersist()

export const A_CharNmSaves = atom<string[]>({
    key: "SaveCharacterNm",
    default: [],
    effects_UNSTABLE: [charNmPersist]
});

//사용자가 '일정 편집' 모드에 들어갔는지 여부를 관장하는 atom
export const IsEditMode = atom({
    key: "IsEditModeAtoms",
    default: false
});

/**
 * 해당 atom은 전체 ToDoItem을 묶어서 보여주는 <ToDoList />와
 * 각 ToDoItem에서 공통된 부분을 모아둔 추상 컴포넌트 <BasedToDo />
 * 총 두 개의 컴포넌트에서 참조
 * 
 * 편집모드 진입 여부를 관리하는 state를
 * props로 전달하면 props drilling 이슈가 발생할 것이기에
 * 전역 상태로 관리하는 편이 더 좋겠다는 생각이 들어서
 * 해당 상태를 atom으로 정의해서 관리한다.
 * (편집모드 진입 여부 관리하는 state)
 */