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

export interface I_Categories {
    Id: string;
    name: string;
};

//사용자가 선택한 Category 기억해두는 atom
export const CategoriesAtom = atom<I_Categories>({
    key: "CategoriesAtom",
    default: { Id: "", name: "" }
});

export interface I_WeeklyToDos {
    ContentsId: string;
    ContentsNm: string;
    IsDone: boolean;
};

export interface I_BossToDos {
    BossId: string;
    BossNm: string;
    Rank?: string;
    Ranks?: string[];
    IsDone: boolean;
};

export interface I_CustomToDos {
    Title?: string;
    Bodys?: string;
    openDt?: string;
    endDt?: string;
};

export interface I_MapleToDos {
    charNm: string;
    ocids: string;
    WeeklyToDos?: I_WeeklyToDos[];
    BossToDos?: I_BossToDos[];
    CustomToDos?: I_CustomToDos[];
};

export interface I_DataFormat {
    //Data Format 기본 사항들
    //ContentsId => {ContentsId, BossId, todo(idx)}
    //ContentsNm => {ContentsNm, BossNm, Title}
    ContentsId: string;
    ContentsNm: string;
    IsDone: boolean;

    //선택 사항 (카테고리: 주간보스 / 기타 메할일)
    Rank?: string;
    ToDoBodys?: string;
    openDt?: string;
    endDt?: string; 
};

enum Categories {
    Weeklys = "Weeklys",
    Boss = "Boss",
    Customs = "Customs"
};

export const A_MapleToDos = atom<I_MapleToDos[]>({
    key: "A_MapleToDos",
    default: []
});

export const ToDos = selector({
    key: "ToDos",
    get: ({get}) => {
        const CharId = get(OcidAtoms);
        const MapleToDos = get(A_MapleToDos);
        const NowCategories = get(CategoriesAtom);

        const Idx = MapleToDos.findIndex((data) => data.charNm === CharId.charNm);

        if(Idx === -1){
            return null;
        } else {
            const CharData = MapleToDos[Idx];

            if(NowCategories.Id === Categories.Weeklys){
                const WeeklyDatas = CharData.WeeklyToDos;

                const Conversion = WeeklyDatas?.map((weeklyData) => {
                    const SetFormat: I_DataFormat = {
                        ContentsId: weeklyData.ContentsId,
                        ContentsNm: weeklyData.ContentsNm,
                        IsDone: weeklyData.IsDone
                    };
                    return SetFormat;
                });
                return Conversion;
            } else if(NowCategories.Id === Categories.Boss){
                const BossDatas = CharData.BossToDos;

                const Conversion = BossDatas?.map((bossData) => {
                    const SetFormat: I_DataFormat = {
                        ContentsId: bossData.BossId,
                        ContentsNm: bossData.BossNm,
                        IsDone: bossData.IsDone,
                        Rank: bossData.Rank
                    };
                    return SetFormat;
                })

                return Conversion;
            } else if(NowCategories.Id === Categories.Customs){
                const CustomToDos = CharData.CustomToDos;

                const Conversion = CustomToDos?.map((todoData, idx) => {
                    const SetFormat: I_DataFormat = {
                        ContentsId: String(todoData.Title),
                        ContentsNm: String(todoData.Title),
                        IsDone: false,
                        ToDoBodys: todoData.Bodys,
                        openDt: todoData.openDt,
                        endDt: todoData.endDt
                    };
                    return SetFormat;
                });
                return Conversion;
            }
        }
    }
});