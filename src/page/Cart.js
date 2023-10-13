import React, {useContext, useEffect, useState } from "react";
import "./style/Cart.scss";
import CartList from "../components/Cart/CartList";
import Caution from "../components/Cart/Caution";
import { Cartcontext } from "../components/Context/ContextData";

function Cart(){

    // 장바구니 처리
    const GlobalState = useContext(Cartcontext);
    const state = GlobalState.state;
    const dispatch = GlobalState.dispatch;
    const total = state.reduce((total, item)=>{
      const deli =  Number.isNaN(parseInt(item.release)) ? 0 : parseInt(item.release);
      return total + (item.discount * item.quantity + deli)
    } ,0);

    const myItems = state.map( (item, index)=><CartList key={index} props={item} />)

    // 전체 체크박스
    const [checkedItems, setCheckedItems] = useState(false);    
    const checkFilter = state.filter( item => item.checked === false );
    const checkType = checkFilter.length > 0 ? false : true;
    
    useEffect(()=>{
      setCheckedItems(checkType);
    },[state]);


// ---------------------------------------------------
  return (
    <div className="cart_wrap">
      <h2>장바구니</h2>
      <Caution />

      <form method="post">
        {/* 제목 (전체선택) 영역 */}
        <fieldset className="check_all">
          <legend>전체 확인</legend>

          <div className="check_wrap">
            <input type="checkbox" name="" id="allSelector"
                  //  onChange={handleAllchange} checked={numCheck === state.length} 
                   onChange={()=> {
                      dispatch({type:"ALLCHECKED", allCheck:!checkedItems});
                      setCheckedItems(!checkedItems); } }
                   checked={checkedItems}
                   />
            <label htmlFor="allSelector">전체선택</label>

            <button className="delete_button" type="button" 
                    onClick={()=>dispatch({type:"SELECT_DELETE", deleteDate:state})}>
                      선택 삭제
            </button>
          </div>
          <div className="order_wrap">
            <dl className="product_price">
              <dt>총 금액</dt>
              <dd>
                <span>
                  {/* {total.toLocaleString()} */}
                  { state.length > 0 ? total.toLocaleString() : 0 }
                </span>원</dd>
            </dl>

            <div className="select_order">
              <button type="button">주문하기</button>
            </div>
          </div>
        </fieldset>

        {/* 장바구니 내용 영역 */}
        <fieldset className="cart_list">
          <legend>장바구니 리스트</legend>
          <ul> {myItems} </ul>
        </fieldset>
      </form>
    </div>
  )
}

export default Cart;