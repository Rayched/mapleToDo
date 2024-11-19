function CreateToDo(){
    return (
        <form>
            <h4>일정 등록</h4>
            <div>
                <span>일정 내용</span>
                <input type="text" placeholder="일정을 입력해주세요. (필수)"/>
            </div>
            <div>
                <span>시작 시간</span>
                <input type="text" placeholder="시작 시간을 입력해주세요. (선택)"/>
            </div>
            <div>
                <span>종료 시간</span>
                <input type="text" placeholder="종료 시간을 입력해주세요. (선택)"/>
            </div>
            <button>일정 추가</button>
        </form>
    );
};

export default CreateToDo;