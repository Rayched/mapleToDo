//Date 관련 함수 모음집

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