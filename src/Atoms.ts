import { atom, selector } from "recoil";

interface I_Ocids {
    ocid: string;
}

export interface I_ToDos {
    category?: string;
}

export interface I_Categories {
    Id: string;
    name: string;
};

export interface I_WeeklyAtoms {
    contentsNm?: string;
    contentsId?: string;
    isDone?: boolean;
};

export interface I_BossAtoms {
    monsterId: string;
    monsterNm: string;
    ranks: string;
    isDone: boolean;
}

interface I_ToDoSelector {
    Id?: string;
    Name?: string;
}

//Character ID Save
export const OcidAtoms = atom<I_Ocids>({
    key: "OcidAtom",
    default: undefined
});

//사용자가 선택한 Category 기억해두는 atom
export const CategoriesAtom = atom<I_Categories>({
    key: "CategoriesAtom",
    default: { Id: "", name: "" }
});

export const WeeklyAtoms = atom<I_WeeklyAtoms[]>({
    key: "WeeklyAtom",
    default: []
})

export const BossAtoms = atom<I_BossAtoms[]>({
    key: "BossAtom",
    default: [],
});

export const ToDosSelect = selector({
    key: "ToDosSelector",
    get: ({get}) => {
        const NowCategory = get(CategoriesAtom);
        
        if(NowCategory.Id === "Weeklys"){
            const WeeklyData = get(WeeklyAtoms);
            const convertData: I_ToDoSelector[] = WeeklyData.map((data) => {
                return {Id: data.contentsId, Name: data.contentsNm}
            })
            return convertData;
        } else if(NowCategory.Id === "Boss"){
            const BossData = get(BossAtoms);

            const convertData: I_ToDoSelector[] = BossData.map(((data) => {
                return {Id: data.monsterId, Name: data.monsterNm}
            }))
            return convertData;
        } else if(NowCategory.Id === "Customs"){
            return;
        } else {
            return;
        }
    }
});

//localStorage 저장할 데이터 type sample
interface I_LocalDatas {
    charNm: string;
    WeeklyData: {
        key: "WeeklyData",
        values: [
            {
                BossId: string,
                BossNm: string,
                BossRank: string,
                isDone: boolean
            }
        ]
    };
    BossData: {
        key: "BossData",
        values: [
            {
                ContentsId: string,
                ContentsNm: string,
                isDone: boolean
            }
        ]
    };
    ToDoData: {
        key: "ToDoData",
        values: [
            {
                ToDoId: string,
                ToDoNm: string,
                isDone: boolean
            }
        ]
    };
}