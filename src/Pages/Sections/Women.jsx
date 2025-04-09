import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import { db } from '../../firebase';



const Women = () => {
  const[products , setproducts] = useState([]);

  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const querySnapshot =  await getDocs(collection(db, 'products'));
        const productData = querySnapshot.docs.map(doc =>({
          id: doc.id,
          ...doc.data(),
        }));
        const womenproducts = productData.filter(product=>product.category==='Women');
        setproducts(womenproducts);
      }
      catch(error){
        console.error('Error fetching products', error)

      }
    };
    fetchData();
  },[]);
  
  return (
    <section className="product-list">
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
  )
}

export default Women;