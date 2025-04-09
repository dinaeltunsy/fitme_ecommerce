import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../Pages/ProductCard';
import '../Pages/ProductList.css'; // Custom styling for the product grid


const Summer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // async fuction to fetch data 
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter to only include products with Collection = "Summer"
        const summerProducts = productsData.filter(product => product.collection === 'Summer');
        
        setProducts(summerProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="product-list">
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Summer;
