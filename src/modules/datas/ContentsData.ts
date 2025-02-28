
type WeeklyContents_values = {
    contentId: string,
    contentNm: string
}

interface I_WeeklyContents {
    id: string;
    value: WeeklyContents_values[]
};

type WeeklyBoss_Values = {
    monsterNm: string,
    monsterRank: string[]
}

interface I_WeeklyBoss {
    id: string;
    value: WeeklyBoss_Values[]
}

export const Contents_data: I_WeeklyContents = {
    id: "WeeklyContents",
    value: [
        {contentId: "Azumos", contentNm: "아즈모스 협곡"},
        {contentId: "MonsterPark", contentNm: "몬스터파크 익스트림"},
        {contentId: "epic01", contentNm: "에픽던전: 하이마운틴"},
        {contentId: "epic02", contentNm: "에픽던전: 앵글러 컴퍼니"},
        {contentId: "arcane01", contentNm: "에르다 스펙트럼"},
        {contentId: "arcane02", contentNm: "배고픈 무토"},
        {contentId: "arcane03", contentNm: "미드나잇 체이서"},
        {contentId: "arcane04", contentNm: "스피릿 세이비어"},
        {contentId: "arcane05", contentNm: "엔하임 디펜스"},
        {contentId: "arcane06", contentNm: "프로텍트 에스페라"},
        {contentId: "mu_lung", contentNm: "무릉도장"},
        {contentId: "guild01", contentNm: "지하수로"},
        {contentId: "guild02", contentNm: "플래그 레이스"},
        {contentId: "absolute01", contentNm: "타락한 세계수 주간퀘"},
        {contentId: "absolute02", contentNm: "헤이븐 주간퀘"},
    ]
};

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