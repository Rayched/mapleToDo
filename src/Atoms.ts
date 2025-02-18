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

export const OcidAtoms = atom<I_Ocids>({
    key: "OcidAtom",
    default: undefined
});

export const ToDosAtom = atom<any[]>({
    key: "ToDosAtom",
    default: []
});

export const NowCategoriesAtom = atom<I_Categories>({
    key: "NowCategories",
    default: { Id: "", name: "" }
});