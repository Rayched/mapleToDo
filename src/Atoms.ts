import { atom } from "recoil";

interface I_Ocids {
    ocid: string;
}

export interface I_ToDos {
    category?: string;
}

export interface I_charID {
    charNm: string;
    ocid: string;
};

interface I_AllToDos {
    WeeklyQuest: I_WeeklyQuest[];
    WeeklyContents: [],
    WeeklyBoss: []
}

export interface I_WeeklyQuest {
    questId: string,
    questNm: string
}

export const charID_Atoms = atom<I_charID>({
    key: "CharID",
    default: {
        charNm: "",
        ocid: ""
    }
});

export const ToDosAtom = atom<any[]>({
    key: "ToDosAtom",
    default: []
});