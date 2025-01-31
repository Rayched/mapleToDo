import { useParams } from "react-router-dom";

function ToDoList(){
    const {charNm} = useParams();

    console.log(charNm);

    return (
        <div>
            <div>이름: {charNm}</div>
            <div>레벨: {charNm}</div>
        </div>
    );
};

export default ToDoList;