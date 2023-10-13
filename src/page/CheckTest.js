import React, { useEffect, useState } from 'react';
import "./style/CheckTest.scss";
import axios from 'axios';

// 체크리스트 데이터 (input요소)
const selectorData = [{title:"HTML"},{title:"CSS"},{title:"JS"},{title:"React"}];

/**
 * 코드중복요소 정리 : new Set() 
 * new Set() 추가 기능
 * - 특정요소 추가 : add 
 * - 특정 요소가 있는지 확인 : has() 
 * - boolean값으로 반환 특정 요소 제거 : delete 
 * - 모든 요소 제거 : clear 
 * - 요소의 개수 반환 : size (배열의 length)
 * 참조: https://sooonding.github.io/react/checkbox/
 * 핵심: filter기능처럼 중복요소를 제거하여 필요항목에 대해서만 파악하는 기능
 */

function CheckTest(){
  // new Set() : 코드의 중복요소가 있는경우 제거하는 기능 
  const [checkedItems, setCheckedItems] = useState(new Set());
  const numCheck = checkedItems.size;
  console.log(numCheck);

  function updateCheck(set, title) {
    const dataCheck = new Set(set); 
    dataCheck.has(title) ? dataCheck.delete(title) : dataCheck.add(title);
    return dataCheck;
  }


  function handleChange(title){
    setCheckedItems(preset => updateCheck(preset, title));
  }


  function handleAllchange(event){
    const checked = event.target.checked;
    checked ? setCheckedItems(new Set(selectorData.map(({title}) => title))) : 
              setCheckedItems(new Set());  
  } 


  // 개별선택영역 (전체 파악을 위해 별도 컴포넌트 미처리)
  const elSelector = selectorData.map((data,index)=>{
    return ( 
      <div key={index} className='unit_check'>
        <input type="checkbox" id={data.title} name={data.title}  value={data.title} 
          onChange={()=>handleChange(data.title)} checked={checkedItems.has(data.title)}
        />
        <label htmlFor={data.title}>{data.title}</label>
      </div>)
  }); 

  return (
    <form className="check_container">
      <h2>체크리스트 선택 예시</h2>

      {/* // 전체 선택 영역 ================================= */}
      <fieldset className="all_selector">
        <legend className='hidden'>전체 선택</legend>
        <input type="checkbox" id="all_selector" name="all_selector" 
          onChange={handleAllchange} checked={numCheck === selectorData.length}
          />
        <label htmlFor="all_selector">전체 선택</label>
      </fieldset>

      {/* // 개별 선택 영역 ================================= */}
      <fieldset className="unit_selector">
        <legend className='hidden'>개별 체크박스</legend>
        {elSelector}
      </fieldset>

    </form>
  )
}

export default CheckTest;