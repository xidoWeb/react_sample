import './App.css';
import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';

// pages
import MainHome from './page/MainHome';
import Slide from './page/Slide';
import Slide2 from './page/Slide2';
import ProductFruit from './page/ProductFruit';
import CheckTest from './page/CheckTest';
import Cart from './page/Cart';


function App() {


  return (
    <div className="App">
      <header className="header">
        <h1><Link to="/">home</Link></h1>
        <ul className="gnb">
          <li><Link to="/slide">Slide</Link></li>
          <li><Link to="/slide2">Slide2</Link></li>
          <li><Link to="/product">List Align</Link></li>
          <li><Link to="/check">Check Test</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </header>

      <section className="contents">
          <Routes>
            <Route path='/' element={<MainHome />}></Route>
            <Route path='/slide' element={<Slide />}></Route>
            <Route path='/slide2' element={<Slide2 />}></Route>
            <Route path='/product' element={<ProductFruit />}></Route>
            <Route path='/check' element={<CheckTest />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
          </Routes>
      </section>
    </div>
  );
}

export default App;
