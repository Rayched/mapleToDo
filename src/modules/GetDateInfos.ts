/**
 * 필요한 데이터
 * - 금주 초기화 대상일 (매주 목요일)
 * - 차주 초기화 대상일 (매주 목요일)
 */
import { GetNowDateInfos, MilliesToDate } from "./GetFullDate";

type GetResetTargetDtProps = {
    NowDate: number,
    NowDay: number
};

export const ModifyNumbers = (dateNums: number) => {
    if(dateNums > 9){
        return String(dateNums);
    } else {
        return "0" + String(dateNums);
    }
};

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