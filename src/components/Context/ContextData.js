import { createContext, useReducer, useState } from "react";

const Cartcontext = createContext();
function ContextData(props){    

    const [state, dispatch] = useReducer(reducer, []);
    const info = {state, dispatch};   

    function reducer(state,action){
        // switch사용시 break를 사용하여 처리되어야 하나 
        // 각 return 처리되어있어 break사용의 의미가 없음
        switch(action.type){
            // 장바구니에 담기 
            case 'ADD':
                // 장바구니에 담을 경우 중복처리 방지
                const addTemp = state.filter( item => action.payload.id === item.id );
                // 장바구니 담기
                return (addTemp.length > 0) ? 
                        state :  [...state, action.payload]; 
                // break; 

            // 장바구니에서 개별 삭제하기 (휴지통버튼 클릭)
            case 'DELETE':
                return state.filter( item => action.payload.id !== item.id );
                // break;

            // 수량 추가(최대 10개)    
            case 'INCREATE':
                return state.map( item=>
                    (item.id===action.payload.id && item.quantity < 10) ? 
                            {...item, quantity:item.quantity+1} : item);
                // break;

            // 수량 축소(최소 1개)
            case 'DECREATE':                
                return state.map( item =>
                    (item.id===action.payload.id && item.quantity > 1) ? 
                            {...item, quantity:item.quantity-1} : item);
                // break;

            // 장바구니 체크값 전달    
            case 'CHECKED':
                return state.map ( item =>
                    (action.cartcheck.id === item.id)?
                       {...item, checked:!item.checked} : item )
                // break;

            // 장바구니 전체 선택
            case 'ALLCHECKED':
                return state.map( item => (action.allCheck) ? 
                    {...item, checked:true} : {...item, checked:false});
                // break;
            
            // 선택 삭제
            case 'SELECT_DELETE':
                return state.filter( item => item.checked !== true);

            default: 
                return state;
        }
    }

    console.log( state );
    return (
        <Cartcontext.Provider value={info}>
            {props.children}
        </Cartcontext.Provider>
    )
}

export {Cartcontext, ContextData};


/** Context
 * 전체를 제어 설정가능하도록 처리
 * props기능으로 인한 drilling처리되는경우를 줄일 수 있으며,
 * 하위 컴포넌트에서 전달하는 값을 상위컴포넌트 또는 다른 컴포넌트에서 호환작업이 가능
 * 
 * 1. createContext 를 이용하여 context생성
 * 2. 객체를 전달할 영역의 범위를 <Context명.Provider value={props와 동일기능}> 이용하여 감싸처리
 * 3. 적용할 컨텍스트 범위 설정 (현재문서에서는 index.js 문서에 적용하여 전범위 적용)
 * 4. 하위 사용할 컴포넌트에서 useContext 이용하여 객체 전달받거나 보내기 사용
 * 주의! 전역에 ContextData 컴포넌트로 감싸 있기에 하나의 오타에도 전체영향을 받으므로 세심한 설정 필요
 * 
 * 정리: ContextData문서 생성 -> Context.Provider이용 범위설정 -> index.js에 ContextData 적용 -> 사용컴포넌트에서 useContext
 */