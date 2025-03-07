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
            return WeeklyData;
        } else if(NowCategory.Id === "Boss"){
            const BossData = get(BossAtoms);
            return BossData;
        } else if(NowCategory.Id === "Customs"){

        } else {
            return;
        }
    }
})