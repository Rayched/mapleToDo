import { atom } from "recoil";

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
    isAdds?: boolean;
    isDone?: boolean;
};

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