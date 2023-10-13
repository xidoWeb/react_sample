import { useContext } from "react";
import { Cartcontext } from "../Context/ContextData";

function List({props}){

  const GlogalState= useContext(Cartcontext);
  const dispatch = GlogalState.dispatch;
  // console.log(GlogalState)

  return  (
    <li>
      <div className="card_wrap">
        <div className="img_case"></div>
        <p className="title">{props.title}</p>
        <div className="check">
          <p className="price">
            <span className="origin">{parseInt(props.price).toLocaleString()}원</span>
            <span className="discount">{parseInt(props.discount).toLocaleString()}원</span>
          </p>
        </div>
        <div className="btns">
          <button type="button" className="card_check"
                  onClick={()=>dispatch({type:'ADD', payload:props})}>장바구니              
          </button>
          <button type="button" className="card_approval">결재하기</button>
        </div>
      </div>
    </li>
  )}

export default List;


//        
// "id": "f27",
// "type": "frute",
// "title": "자두의 반란",
// "detail": "Suspendisse eget lorem nec tortor gravida dictum.",
// "imgPath": "img/fruit",
// "img": "image@2x-12.png",
// "bitImgPath": "img/fruit",
// "bigImg": "image@2x-12.png",
// "price": "15000",
// "discount": "6000",
// "release": "무료배송",
// "best": "best"




