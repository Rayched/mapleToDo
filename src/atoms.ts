import { atom } from "recoil";

export interface I_ToDoInput {
    openT?: string;
    endT?: string;
    ToDo?: string;
    Category?: "Doing" | "Done";
};

export const ToDos = atom<I_ToDoInput[]>({
    key: "ToDos",
    default: []
});