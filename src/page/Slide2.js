import React, { useState, useEffect } from "react";
import { GoArrowRight, GoArrowLeft} from 'react-icons/go';
import "./style/Slide2.scss";

// 카드리스트
let listArr = [
  {id:'card_item_01', title:'1번째카드'},
  {id:'card_item_02', title:'2번째카드'},
  {id:'card_item_03', title:'3번째카드'},
  {id:'card_item_04', title:'4번째카드'},
  {id:'card_item_05', title:'5번째카드'},
  {id:'card_item_06', title:'6번째카드'},
  {id:'card_item_07', title:'7번째카드'},
  {id:'card_item_08', title:'8번째카드'},
  {id:'card_item_09', title:'9번째카드'},
];


// 한번에 보일 카드리스트 마지막 3장 복사 및 붙이기
const last2Arr = listArr.slice(-3);
const listArrMerge = last2Arr.concat(listArr);

//----------------------------------------------------------

function Slide2(){

    // 기본 설정 변수 
    let mvCount = 0;  // 슬라이드를 움직이게 할 수치
    let timed = 1000;  // 슬라이드 움직임 속도
    let permision = true;  // 여러번 반복클릭을 막기 위한 처리

    // 반환할 카드리스트 생성(컴포넌트 처리 전)
    const [ulSize, setUlSize] = useState();
    const [items, setItems] = useState(listArrMerge);
    const nameList = items.map((data, index) => 
      <li key={"item"+index} className={"slide_card " + data.id}>
        <div className="card_wrapper">
          {data.title}
        </div>
      </li>);

    useEffect(()=>{
      setSlideWidth();
    },[ulSize]);


 

  // 이벤트 수행시 미리 인지해야하는 영역확인
  function bannerContent(){
    // 슬라이드 선택자
    const banner = document.querySelector('.slide_list');
    const bannerLi = banner.children;
    const liLen = Math.round(bannerLi.length / 3); // 하나의 슬라이드화면에 보일 갯수(3만큼 나눈 값)
    const ulWidth = (liLen * 100) + '%';
    const ani1 = 'left 0.5s linear';
    
    const mvFn = (type)=>{
      const ck = type || false;      
      return banner.style.transition =  ck ? ani1 : '';
    }

    const slideMv = (mv) => {
      mvFn(mv);
      banner.style.left = -100 * mvCount + '%';
    }

    const slideTime = () => { 
      setTimeout(function(){
        mvFn(false);
        permision = true;
      }, timed*1.1);
    }
    
    // 확인을 위한 반환값
    return {
      banner:banner,
      li:bannerLi,
      len:liLen - 1,
      ani:ani1,
      ulWidth: ulWidth,
      mv: slideMv,
      mvFn : mvFn,
      mvTime : slideTime
    }
  } 

  function setSlideWidth(){
    const slide = bannerContent();
    slide.banner.style.width = slide.ulWidth;
    setUlSize(slide.ulWidth);
    console.log(slide.ulWidth);
  }


  // 이전버튼 클릭에 따른 이벤트 수행(다음버튼 클릭 이벤트 내용 동일)
  /** 요약
   * 1. 이번 버튼 선택 시 prevEvt 이벤트 수행
   * 2. 수행에 따른 선택자 인지 ( bannerContent() );
   * 3. 여러번 클릭 하여 반복수행되는 에러를 잡기 위해 클릭되는순간 승인조건 끄기 (permision=false)
   * 4. 기존 count 값기준 -1 수행하여 이전화면 보이게 변수값 처리,
   *    애니메이션 수행이 되지 않게 되어있어 애니메이션 css추가
   * 5. count 변수값이 0보다 작은경우 와, 그렇지 않은경우에 따른 슬라이드 수행 
   * 
   * tip: prevEvt, nextEvt 주석내용은 slide.mv() 함수 수행으로 요약처리(참고: Slide.js)
   */

  // 
  function prevEvt(e){
    e.preventDefault();
    const slide = bannerContent();
  
    if (permision){
      permision = false;
      
      mvCount -= 1;
      slide.banner.style.transition = slide.ani;
  
      if (mvCount < 0){
        // slide.banner.style.left = -100 * mvCount + '%';
        slide.mv(true);
  
        setTimeout(function(){  
          mvCount = slide.len -1; 
          // slide.banner.style.transition = '';
          // slide.banner.style.left = -100 * mvCount + '%';          
          slide.mv(false);
        },timed);
      }else{
        // slide.banner.style.left = -100 * mvCount + '%';
        slide.mv(true);
      }
      slide.mvTime();
    }
  }

  function nextEvt(e){
    e.preventDefault();
    const slide = bannerContent();

    if(permision) {
      permision = false;

      if (mvCount >= slide.len - 1){
        mvCount = -1;
        // slide.banner.style.transition = '';
        // slide.banner.style.left = -100 * mvCount + '%';
        slide.mv(false);
        setTimeout(function(){  
          mvCount += 1; 
          // slide.banner.style.transition = slide.ani;
          // slide.banner.style.left = -100 * mvCount + '%';          
          // console.log(mvCount);
          slide.mv(true);
        },10);
      } else {
        mvCount += 1;
        // slide.banner.style.transition = slide.ani;
        // slide.banner.style.left = -100 * mvCount + '%';
        slide.mv(true);
      }

      slide.mvTime();
    }
  }

/**
 * 1. setTimeout 함수는 Promise 또는 sync/await 기능으로 변경권장 (버튼 일부 키보드/마우스 제어기능이 다름)
 * 2. prevEvt, NextEvt 함수는 하나로 병합하여 처리가능하도록 권장
 * 3. 향후 슬라이드의 개수가 늘어날 것을 염려하여, .slide_list의 가로길이가 조정되게 처리
 *    단, 전체 나머지 갯수가 화면에 보이는 값보다 적으면 (n % 3 !== 0) 빈 li 첨부하여 삽입
 */


  return (
      <div className="slide2_product">
        <div className="product_narr">
          <div className="over">
            <h2>Slide js</h2>
            <p>product content Lorem Ipsum is simply dummy text of 
              the printing and typesetting industry. <br />
              Lorem Ipsum has been the industry's standard dummy 
              text ever since the 1500s, when an unknown printer 
              took a galley of type and scrambled it to make a type specimen book. <br />
              It has survived not only five centuries, but also the leap into electronic typesetting, 
              remaining essentially unchanged. <br />
              It was popularised in the 1960s with the release of 
              Letraset sheets containing Lorem Ipsum passages, <br />
              and more recently with desktop publishing software like Aldus PageMaker including 
              versions of Lorem Ipsum.<br />
              took a galley of type and scrambled it to make a type specimen book. <br />
              It has survived not only five centuries, but also the leap into electronic typesetting, 
              remaining essentially unchanged. <br />
              It was popularised in the 1960s with the release of 
              Letraset sheets containing Lorem Ipsum passages, 
              and more recently with desktop publishing software like Aldus PageMaker including 
              versions of Lorem Ipsum</p>
          </div>
        </div>
        
        <div className="slide2_wrap">
          <div className="slide2_button">
            <button type="button" className="prev_btn" onClick={prevEvt}>
              <GoArrowLeft /><span className="hidden">이전내용보기</span></button>
            <button type="button" className="next_btn" onClick={nextEvt}>
              <GoArrowRight /><span className="hidden">다음내용보기</span></button>
          </div>
          <div className="slide_cont">
            <ul className="slide_list">
              {nameList}
            </ul>
          </div>
        </div>
      </div>
  )
}

export default Slide2;


