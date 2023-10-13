import React ,{useEffect, useState, useContext} from "react";
import './style/ProcudtFruit.scss';
import List from '../components/Fruits/List';

// import기능으로는 src폴더 내 파일, 함수 내 fetch 또는 axios 이용시 public폴더 내 파일을 호출
// 일반적으로는 public폴더 내 파일을 호출하여 useState기능으로 사용하는 것을 권장
import fruitList from '../data/fruit.json';
import axios from "axios";

//정렬 옵션 설정 리스트 정의
// title: 버튼표기이름, class: 정렬함수 수행시 조건이름, state: 현재 정렬상태 처리옵션
const option = [
  {title:'등록 순', class:'default', state:true},
  {title:'이름 순', class:'name', state:false},
  {title:'가격 순', class:'price', state:false}
];

// 장바구니 버튼 선택하여 장바구니에 담는경우 context 이용하여 처리
// context:  createContext, ContextData, useContext 훅을 이용하여 처리 
// useState기능이 2중 이상으로 중첩되어 처리되거나 여러기능을 복합으로 사용하는경우 useReduce이용 
// useReduce는 Redux기능의 일부 유사 (기본 처리는 components/ContextData.js 부터 처리)

function ProductFruit(){

  // -----------------------------------------------------
  // 카드 데이터 불러오기
  const [cardList, setCardList] = useState([]);  
  const fetchData = async() => {
    const response = await axios.get("/data/fruit.json");
    setCardList(response.data);
  }
  
  useEffect(()=>{ fetchData(); }, []);
  
  // 카드 정렬 배치
  const myList = cardList.map((data, index)=> <List key={data.id} props={data} /> );
  // -----------------------------------------------------
  
  // 정렬옵션 설정버튼 배치 
  const buttonList = option.map( (data, index) =>
    <li key={data.class}>                       
      <button type="button" className={data.state ? "on" : ''} onClick={()=>sortResult(index)}>
        {data.title}
      </button>
    </li>
  );

 
// 정렬 사용 함수 (각 기능별로 함수 설정)
/**
  // function sortDefaultFn(){
  //   const listCopy = [...listObject];
  //   listCopy.sort( (dataA, dataB)=> (dataA.id).localeCompare(dataB.id) );  // 함수내용 중 다른부분(단, sort()는 실행함수)
  //   setCardList(listCopy);
  // }

  // function sortNameFn(){
  //   const listCopy = [...listObject];
  //   listCopy.sort( (dataA, dataB)=> (dataA.title).localeCompare(dataB.title) );  // 함수내용 중 다른부분(단, sort()는 실행함수)
  //   setCardList(listCopy);
  // }

  // function sortPriceFn(){
  //   const listCopy = [...listObject];
  //   listCopy.sort( (dataA, dataB)=> (dataA.price).localeCompare(dataB.price) );  // 함수내용 중 다른부분(단, sort()는 실행함수)
  //   setCardList(listCopy);
  // }
 */

  // 위 코드 수정 (useReduce 이용하면 더 정리된 형태로 수정 가능)
  function sortResult(type) {
    const listCopy = [...cardList];

    // 버튼 선택표기
    option.map((data, index) => index === type ? data.state = true: data.state = false );

    listCopy.sort((dataA, dataB)=> {
      switch(type){
        case 0: return (dataA.id).localeCompare(dataB.id);
        case 1: return (dataA.title).localeCompare(dataB.title);
        case 2: return (dataA.price).localeCompare(dataB.price);
        default: return listCopy;
      }
    });
    setCardList(listCopy);
  }

  // html
  return (
    <div className="product_area">
      <h2>ProductFruit</h2>
      {/* 상단 정렬버튼 옵션 */}
      <div className="list_option">
        <ul>
          {/* 
            <li><button className="align_default" onClick={sortDefaultFn}>등록 순</button></li>
            <li><button className="align_name" onClick={sortNameFn}>이름 순</button></li>
            <li><button className="align_price" onClick={sortPriceFn}>가격 순</button></li> 
          */}
          {buttonList}
        </ul>
      </div>

      {/* 카드리스트 배치 */}
      <form className="list_content">
        <fieldset>
          <legend className="hidden">product card list</legend>
        <ul>
          {myList}
        </ul>
        </fieldset>
      </form>
    </div>
  )
}

export default ProductFruit;