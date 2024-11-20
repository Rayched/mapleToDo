import { atom } from "recoil";

export interface I_ToDoItem {
    todo: string;
    openT?: string;
    endT?: string;
    categorys?: "Doing"|"Done";
};

export const ToDoDatas = atom<I_ToDoItem[]>({
    key: "ToDos_origin",
    default: []
});