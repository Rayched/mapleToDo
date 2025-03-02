import { atom } from "recoil";

type WeeklyBoss_Values = {
    monsterNm: string,
    monsterRank: string[]
}

interface I_WeeklyBoss {
    id: string;
    value: WeeklyBoss_Values[]
}

export const Boss_data: I_WeeklyBoss = {
    id: "WeeklyBoss",
    value: [
        {monsterNm: "시그너스", monsterRank: ["이지", "노말"]},
        {monsterNm: "힐라", monsterRank: ["하드"]},
        {monsterNm: "핑크빈", monsterRank: ["카오스"]},
        {monsterNm: "자쿰", monsterRank: ["카오스"]},
        {monsterNm: "반반", monsterRank: ["카오스"]},
        {monsterNm: "피에르", monsterRank: ["카오스"]},
        {monsterNm: "블러디퀸", monsterRank: ["카오스"]},
        {monsterNm: "벨룸", monsterRank: ["카오스"]},
        {monsterNm: "매그너스", monsterRank: ["하드"]},
        {monsterNm: "파풀라투스", monsterRank: ["카오스"]},
        {monsterNm: "스우", monsterRank: ["노말", "하드", "익스트림"]},
        {monsterNm: "데미안", monsterRank: ["노말", "하드"]},
        {monsterNm: "가디언 엔젤 슬라임", monsterRank: ["노말", "카오스"]},
        {monsterNm: "루시드", monsterRank: ["이지", "노말", "하드"]},
        {monsterNm: "윌", monsterRank: ["이지", "노말", "하드"]},
        {monsterNm: "더스크", monsterRank: ["노말", "카오스"]},
        {monsterNm: "듄켈", monsterRank: ["노말", "하드"]},
        {monsterNm: "진 힐라", monsterRank: ["노말", "하드"]},
        {monsterNm: "검은 마법사", monsterRank: ["하드", "익스트림"]},
        {monsterNm: "선택받은 세렌", monsterRank: ["노말", "하드", "익스트림"]},
        {monsterNm: "감시자 칼로스", monsterRank: ["이지", "노말", "카오스", "익스트림"]},
        {monsterNm: "카링", monsterRank: ["이지", "노말", "하드", "익스트림"]},
        {monsterNm: "림보", monsterRank: ["노말", "하드"]},
        /**
         * {monsterNm: "발드릭스", monsterRank: ["노말", "하드"]}
         */
    ]
};

/**
 * AddToDo에서 To Do 추가할 때 관리하기 편하게 하기 위해서
 * Contents Data를 Atom으로 관리하도록 변경하였음.
 */

export interface I_WeeklyContentAtoms {
    Id: string;
    Name: string;
    isAdds: boolean;
};

const new_WeeklyContent_data: I_WeeklyContentAtoms[] = [
    {Id: "azumos", Name: "아즈모스 협곡", isAdds: false},
    {Id: "monsterpark", Name: "몬스터파크 익스트림", isAdds: false},
    {Id: "epic01", Name: "하이마운틴", isAdds: false},
    {Id: "epic02", Name: "앵글러 컴퍼니", isAdds: false},
    {Id: "arc01", Name: "에르다 스펙트럼", isAdds: false},
    {Id: "arc02", Name: "배고픈 무토", isAdds: false},
    {Id: "arc03", Name: "미드나잇 체이서", isAdds: false},
    {Id: "arc04", Name: "스피릿 세이비어", isAdds: false},
    {Id: "arc05", Name: "엔하임 디펜스", isAdds: false},
    {Id: "arc06", Name: "프로텍트 에스페라", isAdds: false},
    {Id: "mulung", Name: "무릉도장", isAdds: false},
    {Id: "guild01", Name: "플래그 레이스", isAdds: false},
    {Id: "guild02", Name: "지하수로", isAdds: false},
    {Id: "abs01", Name: "타락한 세계수 주간퀘", isAdds: false},
    {Id: "abs02", Name: "헤이븐 주간퀘", isAdds: false},
];

export const WeeklyContentAtoms = atom<I_WeeklyContentAtoms[]>({
    key: "WeeklyContents_data",
    default: [...new_WeeklyContent_data]
});

export interface I_BossContentAtoms {
    Id: string;
    Name: string;
    Rank: string[];
};

const new_BossContent_data: I_BossContentAtoms[] = [
    {Id: "boss01", Name: "시그너스", Rank: ["이지", "노멀"]},
    {Id: "boss02", Name: "힐라", Rank: ["하드"]},
    {Id: "boss03", Name: "핑크빈", Rank: ["카오스"]},
    {Id: "boss04", Name: "자쿰", Rank: ["카오스"]},
    {Id: "boss05", Name: "반반", Rank: ["카오스"]},
    {Id: "boss06", Name: "피에르", Rank: ["카오스"]},
    {Id: "boss07", Name: "블러디퀸", Rank: ["카오스"]},
    {Id: "boss08", Name: "벨룸", Rank: ["카오스"]},
    {Id: "boss09", Name: "매그너스", Rank: ["하드"]},
    {Id: "boss10", Name: "파풀라투스", Rank: ["카오스"]},
    {Id: "boss11", Name: "스우", Rank: ["노멀", "하드", "익스트림"]},
    {Id: "boss12", Name: "데미안", Rank: ["노멀", "하드"]},
    {Id: "boss13", Name: "가디언 엔젤 슬라임", Rank: ["노멀", "카오스"]},
    {Id: "boss14", Name: "루시드", Rank: ["이지", "노멀", "하드"]},
    {Id: "boss15", Name: "윌", Rank: ["이지", "노멀", "하드"]},
    {Id: "boss16", Name: "더스크", Rank: ["노멀", "카오스"]},
    {Id: "boss17", Name: "듄켈", Rank: ["노멀", "하드"]},
    {Id: "boss18", Name: "진 힐라", Rank: ["노멀", "하드"]},
    {Id: "boss19", Name: "검은 마법사", Rank: ["하드", "익스트림"]},
    {Id: "boss20", Name: "선택받은 세렌", Rank: ["노멀", "하드", "익스트림"]},
    {Id: "boss21", Name: "감시자 칼로스", Rank: ["이지", "노멀", "카오스", "익스트림"]},
    {Id: "boss22", Name: "카링", Rank: ["이지", "노멀", "하드", "익스트림"]},
    {Id: "boss23", Name: "림보", Rank: ["노멀", "하드"]},
    {Id: "boss24", Name: "발드릭스", Rank: ["노멀", "하드"]},
];

export const BossContentAtoms = atom<I_BossContentAtoms[]>({
    key: "BossContents_data",
    default: [...new_BossContent_data]
});