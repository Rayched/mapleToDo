import { atom, selector } from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist();

export interface I_Ocids {
    ocid: string;
    charNm?: string;
}

//Character ID Save
export const OcidAtoms = atom<I_Ocids>({
    key: "OcidAtom",
    default: {ocid: "", charNm: ""}
});

export interface I_Categories {
    Id: string;
    name: string;
};

enum Categories {
    Weeklys = "Weeklys",
    Boss = "Boss",
    Customs = "Customs"
};

//사용자가 선택한 Category 기억해두는 atom
export const CategoriesAtom = atom<I_Categories>({
    key: "CategoriesAtom",
    default: { Id: "", name: "" }
});

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
    effects_UNSTABLE: [persistAtom]
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

const {persistAtom: charNmPersist} = recoilPersist()

export const A_CharNmSaves = atom<string[]>({
    key: "SaveCharacterNm",
    default: [],
    effects_UNSTABLE: [charNmPersist]
});