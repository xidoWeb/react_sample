import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";

function MainList({props}){

  const {title, link, content} = props;
  const [con, setCon] = useState('');
    
  const doc = content.replaceAll('/', '<br />');
  
  useEffect(()=>{
    setCon(doc);
  },[])

/**
 * dangerouslySetInnerHTML : React에서 javascript의 innerHTML 문법과 동일하게 문자형식 html코드를 변환하는 기능
 * dangerouslySetInnerHTML={{__html: 문자열내용}}
 */

  return(
    <li>
      <dl>
        <dt><Link to={link}><AiOutlineLink /> {title}</Link></dt>
        <dd dangerouslySetInnerHTML={{__html: con}}></dd>
      </dl>
    </li>
  )
}

export default MainList;

