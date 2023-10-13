import { useEffect, useState } from "react";
import "./style/MainHome.scss";
import axios from "axios";
import MainList from "../components/MainHome/MainList";


function MainHome(){

  const [myItems, setMyItems] = useState([]);
    
    const fetchData = async() => {
        const response = await axios.get("/data/mainContent.json");
        const itList = response.data.map(
            (data, index) =>  <MainList key={index} props={data} /> );

        setMyItems(itList);
    }

    useEffect(()=>{ fetchData(); }, []);

  return(
    <div className="main_container">
      <h2>페이지별 코드내용 요약</h2>
      <ol className="page_comment">
        {myItems}
      </ol>
      <hr />
      <dl>
        <dt>주의사항:</dt>
        <dd>
          <ul className="page_comment2">
            <li>
              코드의 내용 중 css코드는 각 페이지별 통일 및 정리되어 있지 않은 형태임을 참고하세요.<br />
            또한, 사용된 코드들은 별도의 리팩토링을 하지 않고, 페이지별로 단순 기능이 돌아가도록 처리하여 코드사용의 통일성이 매우 낮은상태이니 개인 공부 및 적용시 코드의 사용에 맞게 통일하여 사용하시기를 권장합니다.
            </li>
            <li>
              코드 내용 중 new Set() 함수에 대한 개념을 적용하여 중복제거에 해단 내용을 담아놓았으나, <br /> 
              Cart.js에서 Context를 사용하는 경우 복합요소로 되어있어 전체 내용파악에 대한 어려움이 있을 것으로 판단되어 기존 배열형식 및 filter를 이용하여 사용되었습니다.<br />
              다만, 실무에서 Set()에 대해 자주사용하고 있는 함수이므로 개념을 파악해 두는것이 좋습니다. 
            </li>
          </ul>
        </dd>
      </dl>
      
    </div>
  )
}

export default MainHome;