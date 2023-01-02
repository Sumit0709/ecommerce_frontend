import React, { useState,useEffect } from 'react'

import "../styles.css";
import Base from "./Base";
import Card from './Card';
import { getAllProducts } from './helper/coreapicalls';


const Home = () => {

  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(false);

  const loadAllProducts = () => {
    getAllProducts()
    .then(data => {
      if(data.error){
        setErrors(data.error);
      }else{
        setProducts(data)
      }
    }) 
  }

  useEffect(()=>{
    loadAllProducts()
  },[])

  return (
    <Base title="Home Page" description='Welcome to BuyMeATshirt store'> 
    <div className='row text-center'>
      <h1 className='text-white'>All products</h1>
      {
        products.map((product, index)=>{
          return (
            <div key={index} className='col-4 mb-4'>
              <Card product={product}/>
            </div>
          )
        }) 
      }
    </div>
    </Base>
  )
}

export default Home;
