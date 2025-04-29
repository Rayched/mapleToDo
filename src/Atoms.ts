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

export interface I_CustomToDoAtoms {
    ToDo_Title: string;
    ToDo_Bodys?: string;
    StartDate?: string;
    EndDate?: string;
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
    default: []
});

export const CustomToDoAtoms = atom<I_CustomToDoAtoms[]>({
    key: "CustomToDoAtom",
    default: []
})

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

interface I_Schedules {
    charNm: string;
    WeeklyContents: I_WeeklyAtoms[];
    BossContents: I_BossAtoms[];
    CustomToDos: [];
};

//전체 ToDo 관리하는 ScheduleAtoms
const ScheduleAtoms = atom<I_Schedules[]>({
    key: "ScheduleAtoms",
    default: []
});