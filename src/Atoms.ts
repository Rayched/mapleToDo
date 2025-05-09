import { atom, selector } from "recoil";

export interface I_Ocids {
    ocid: string;
    charNm?: string;
}

//Character ID Save
export const OcidAtoms = atom<I_Ocids>({
    key: "OcidAtom",
    default: {ocid: "", charNm: ""}
});

//사용자가 선택한 Category 기억해두는 atom
export const CategoriesAtom = atom<I_Categories>({
    key: "CategoriesAtom",
    default: { Id: "", name: "" }
});

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

export interface I_CustomToDoAtoms {
    ToDo_Title: string;
    ToDo_Bodys?: string;
    StartDate?: string;
    EndDate?: string;
}

export const WeeklyAtoms = atom<I_WeeklyAtoms[]>({
    key: "WeeklyAtom",
    default: []
})

export const BossAtoms = atom<I_BossAtoms[]>({
    key: "BossAtom",
    default: []
});

export const CustomToDoAtoms = atom<I_CustomToDoAtoms[]>({
    key: "CustomToDoAtom",
    default: []
})

interface I_ToDoSelector {
    Id?: string;
    Name?: string;
}

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
            const ToDoDatas = get(CustomToDoAtoms);

            const convertData: I_ToDoSelector[] = ToDoDatas.map((data) => {
                return {Id: data.ToDo_Title, Name: data.ToDo_Title}
            })

            return convertData;
        } else {
            return;
        }
    }
});

export interface I_WeeklyToDos {
    ContentsId: string;
    ContentsNm: string;
    IsDone: boolean;
};

export interface I_BossToDos {
    BossId: string;
    BossNm: string;
    Rank: string;
    IsDone: boolean;
};

export interface I_CustomToDos {
    Title: string;
    Bodys?: string;
    openDts?: string;
    endDts?: string;
};

export interface I_MapleToDos {
    charNm: string;
    ocids: string;
    WeeklyToDos?: I_WeeklyToDos[];
    BossToDos?: I_BossToDos[];
    CustomToDos?: I_CustomToDos[];
};

export const A_MapleToDos = atom<I_MapleToDos[]>({
    key: "A_MapleToDos",
    default: []
});

export const ToDos = selector({
    key: "ToDos",
    get: ({get}) => {}
});