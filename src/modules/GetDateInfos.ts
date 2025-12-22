/**
 * 필요한 데이터
 * - 금주 초기화 대상일 (매주 목요일)
 * - 차주 초기화 대상일 (매주 목요일)
 */

type GetResetTargetDtProps = {
    NowDate: number,
    NowDay: number
};

//'10' 미만의 date 정보를 '0n' 형식으로 변환하는 함수
const ModifyNumbers = (dateNums: number) => {
    if(dateNums > 9){
        return String(dateNums);
    } else {
        return "0" + String(dateNums);
    }
};

//MS, Date로 변환하는 함수
export function MilliesToDate(MillieSeconds: number){
   
    const ModifyDate = new Date(MillieSeconds);

    const Year = ModifyDate.getFullYear();
    const Month = ModifyNumbers(ModifyDate.getMonth() + 1);
    const Dates = ModifyNumbers(ModifyDate.getDate());

    return `${Year}-` + Month + "-" + Dates;
};

//오늘 날짜와 관련된 정보를 return하는 함수
//정보 목록: 날짜, 요일, MS
export function GetNowDateInfos(){
    const NowDate = new Date();

    const Year = NowDate.getFullYear();
    const Month = ModifyNumbers(NowDate.getMonth() + 1);
    const dates = ModifyNumbers(NowDate.getDate());
    const DayNums = NowDate.getDay();

    const FullDate = `${Year}-` + Month + "-" + dates;
    const NowDateToMS = NowDate.getTime();

    return {
        FullDate: FullDate,
        Millies: NowDateToMS,
        DayNums: DayNums
    };
}

const getPassValue = (dayNums: number) => {
    let PassValues = 0;
    //기준 요일, 목요일
    //목요일을 기준으로 case setting 하였음 (금 ~ 수)
    //default는 목요일, 0 return
    switch(dayNums) {
        case 5:
            PassValues = 1;
            break;
        case 6:
            PassValues = 2;
            break;
        case 0:
            PassValues = 3;
            break;
        case 1:
            PassValues = 4;
            break;
        case 2:
            PassValues = 5;
            break;
        case 3:
            PassValues = 6;
            break;
        default: 
            PassValues = 0;
            break;
    };

    return PassValues;
};

export function GetResetDts(){
    const {DayNums, Millies} = GetNowDateInfos();

    const Diffs = 86400000 * getPassValue(DayNums);

    const CurrentMS = Millies - Diffs;
    const NextMS = CurrentMS + (86400000 * 7);

    const CurrentDate = MilliesToDate(CurrentMS);
    const NextDate = MilliesToDate(NextMS);

    return {
        CurrentResetDt: CurrentDate,
        NextResetDt: NextDate
    };
}