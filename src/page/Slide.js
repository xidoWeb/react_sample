import React from "react";
import { GoArrowRight, GoArrowLeft} from 'react-icons/go';
import "./style/Slide.scss";

function Slide(){
  let mvCount = 0;
  let timed = 500;
  let permision = true;

  function bannerContent(){
    const banner = document.querySelector('.banner_list');
    const bannerLi = banner.children;
    const liLen = bannerLi.length - 1;
    
    return {
      banner:banner,
      li:bannerLi,
      len:liLen
    }
  }

  function preEvt(e){
    e.preventDefault();
    const slide = bannerContent();

    if (permision){
      permision = false;
      
      mvCount -= 1;
      slide.banner.style.transition = 'left 0.5s linear';

      if (mvCount < 0){
        slide.banner.style.left = -100 * mvCount + '%';

        setTimeout(function(){  
          mvCount = slide.len -1; 
          slide.banner.style.transition = '';
          slide.banner.style.left = -100 * mvCount + '%';          
          console.log(mvCount);
        },timed);
      }else{
        slide.banner.style.left = -100 * mvCount + '%';
      }
      setTimeout(function(){
        permision = true;
      },timed*1.5)
    }
  }

  function nextEvt(e){
    e.preventDefault();
    const slide = bannerContent();

    if(permision) {
      permision = false;

      if (mvCount >= slide.len-1){
        mvCount = -1;
        slide.banner.style.left = -100 * mvCount + '%';

        setTimeout(function(){  
          mvCount += 1; 
          slide.banner.style.transition = 'left 0.5s linear';
          slide.banner.style.left = -100 * mvCount + '%';          
          console.log(mvCount);
        },0);
      } else {
        mvCount += 1;
        slide.banner.style.transition = 'left 0.5s linear';
        slide.banner.style.left = -100 * mvCount + '%';
      }

      setTimeout(function(){
        slide.banner.style.transition = '';
        permision = true;
      }, timed*1.5);
    }
  }

    return (
      <div className="slide_banner">
        <h2>Slide js</h2>
        <div className="content">
          <div className="content_wrap">
            <ul className="banner_list">
              <li className="cont_03">banner3</li>
              <li className="cont_01">banner1</li>
              <li className="cont_02">banner2</li>
              <li className="cont_03">banner3</li>
            </ul>
          </div>
          <ul className="indicator">
            <li className="round on"><button><span className="hidden">광고 1번째 내용설명</span></button></li>
            <li className="round"><button><span className="hidden">광고 2번째 내용설명</span></button></li>
            <li className="round"><button><span className="hidden">광고 3번째 내용설명</span></button></li>
          </ul>
          <div className="banner_buttons">
            <button type="button" className="prev_btn" onClick={preEvt}>
              <GoArrowLeft /><span className="hidden">이전내용보기</span></button>
            <button type="button" className="next_btn" onClick={nextEvt}>
              <GoArrowRight /><span className="hidden">다음내용보기</span></button>
          </div>
        </div>  
      </div>
    )
}

export default Slide;