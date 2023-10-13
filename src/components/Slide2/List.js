

function List({props}){
  return (
    console.log(props.class)
    // <li className="slide_card {props.class}">
    //   <div className="card_wrapper">
    //       {props.content}
    //   </div>
    // </li>
  )
}

export default List;


{/* <li className="slide_card">
  <div className="card_wrapper">
  <div className="image_area">
    <image src="" alt="" />
  </div>
  <div className="card_summery">
    <p className="product_content"><span className="pair">[Fruit]</span><br />신선하고 당도 높은 바나나</p>
    <p className="price"><span className="origin">5000</span><br /><span className="sale">2500</span></p>
    <p className="delevery_type">무료배송</p>
    <div className="favorites">
      <input type="checkbox" id="product_01" name="" value="" /> 
      <label for="product_01">즐겨찾기 추가</label>
    </div>
  </div>
  <div className="card_link">
    <button className="cart">장바구니 담기</button>
    <a href="product_detail">제품 상세보기</a>
  </div>
  </div>
</li> */}