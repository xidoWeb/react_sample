import React,{useState, useContext, useEffect} from "react";
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import { Cartcontext } from "../Context/ContextData";


function CartList({props}){

  // Context
  const GlobalState = useContext(Cartcontext);
  const dispatch = GlobalState.dispatch;

  // props 객체 조건부서식으로 처리
  const {id, code, type, title, detail, imgPath, img, bitImgPath, bigImg, price, discount, release, best, quantity, checked} = props;

  // 배송비 계산(무료처리에 대한 값이 일정하지 않는 경우 2가지 조건으로 처리 -> 0, 값)
  const deli =  Number.isNaN(parseInt(release)) ? 0 : parseInt(release);

  // 금액처리
  function convertPrice(pay){
    switch(pay){
      case 'delivery': // 배송료
        return (deli === 0) ? "무료배송" : deli.toLocaleString();  
      case 'price': // 원가
        return parseInt(price).toLocaleString();
      case 'discount': // 할인가
        return parseInt(discount).toLocaleString();
      case 'result': // 최종값(수량포함)
        return (parseInt(discount) * parseInt(quantity) + deli).toLocaleString();
    }
  }


  return (
    <li className="cart">
      <div className="check_wrap">
        <input type="checkbox" name="listCheck" id={'listCheck_'+id} value={code} 
               onChange={()=>dispatch({type:"CHECKED", cartcheck:props})}
               checked={checked}
        />
        <label htmlFor={'listCheck_'+id}><span className="hidden">체크상태</span></label>        
      </div>

      <div className="img_wrap">
        <img src={imgPath + '/' + img} alt="image area" title="image area" />
      </div>

      <div className="content_wrap">
        <span className="type_name">[{type}]</span><br />
        <span className="title_name">{title}</span>
      </div>

      <div className="count_wrap">
        <button type="button" className="count_down" 
                onClick={()=>dispatch({type:"INCREATE",payload:props})} >
                <FaPlusCircle />
        </button>

        <button type="button" className="count_up" 
                onClick={()=>dispatch({type:"DECREATE",payload:props})}>
                <FaMinusCircle />
        </button>

        <span className="quantity">{quantity}</span>

        <div className="hidden">
          <label htmlFor={'countNum_'+id}>수량</label>
          <input type="text" name="countNum" id={'countNum_'+id} />
        </div>        
      </div>

      <div className="price_wrap">
        <p>
          <del className="sup_text origin">각 {convertPrice('price')}원</del>
          <span className="full_text discount">{convertPrice('discount')}원</span>
          </p>
        <p>
          <span className="sup_text">배송</span>
          <span className="full_text">{ convertPrice('delivery') }</span>
          </p>
        <p>
          <span className="sup_text">최종금액</span>
          <span className="full_text price">{convertPrice('result')}원</span>
        </p>
      </div>

      <div className="delete_wrap">
        <button type="button" onClick={()=>dispatch({type:"DELETE", payload:props})}>
          <IoMdTrash />
          <span className="hidden">상품 삭제하기</span>
        </button>
      </div>
    </li>
  )
}

export default CartList;