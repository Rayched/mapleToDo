//주간 컨텐츠, 주간보스 데이터 모아둔 file

export interface I_WeeklyContent {
    Id: string;
    Name: string;
};

export interface I_BossContent {
    Id: string;
    Name: string;
    Rank: string[];
};

const new_WeeklyContent_data: I_WeeklyContent[] = [
    {Id: "azumos", Name: "아즈모스 협곡"},
    {Id: "monsterpark", Name: "몬스터파크 익스트림"},
    {Id: "epic01", Name: "하이마운틴"},
    {Id: "epic02", Name: "앵글러 컴퍼니"},
    {Id: "arc01", Name: "에르다 스펙트럼"},
    {Id: "arc02", Name: "배고픈 무토"},
    {Id: "arc03", Name: "미드나잇 체이서"},
    {Id: "arc04", Name: "스피릿 세이비어"},
    {Id: "arc05", Name: "엔하임 디펜스"},
    {Id: "arc06", Name: "프로텍트 에스페라"},
    {Id: "mulung", Name: "무릉도장"},
    {Id: "guild01", Name: "플래그 레이스"},
    {Id: "guild02", Name: "지하수로"},
    {Id: "abs01", Name: "타락한 세계수 주간퀘"},
    {Id: "abs02", Name: "헤이븐 주간퀘"},
];

const new_BossContent_data: I_BossContent[] = [
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

export const OriginData = {
    WeeklyContents: [...new_WeeklyContent_data],
    BossContents: [...new_BossContent_data]
};