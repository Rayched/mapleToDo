import { atom } from "recoil";

interface I_ToDoItem {
    todo: string;
    openT?: string;
    endT?: string;
    categorys: "일정등록"|"진행중"|"완료";
};

export const categorys = atom({
    key: "Category",
    default: ["AddToDo", "Doing", "Done"]
});

export const ToDoDatas = atom<I_ToDoItem[]>({
    key: "ToDos_origin",
    default: []
})