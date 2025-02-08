import { atom } from "recoil";

interface I_Ocids {
    ocid?: string;
}

export const OcidAtoms = atom<I_Ocids>({
    key: "Ocids",
    default: undefined
});