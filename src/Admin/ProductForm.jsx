import React, { useState } from 'react';
import { db, storage } from '../firebase'; // Firestore and Storage instance
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ProductForm.css'; // Optional: Add your custom CSS for form styling

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountprice: '',
    category: '',
    collection:'',
    colors: [{ colorName: '', images: [] }], // Updated to handle multiple colors with images
    sizes: '',
    type: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Color Change
  const handleColorChange = (index, e) => {
    const newColors = [...formData.colors];
    newColors[index][e.target.name] = e.target.value;
    setFormData({ ...formData, colors: newColors });
  };

  // Handle Image Upload
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `products/${formData.name}/${formData.colors[index].colorName}/${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const newColors = [...formData.colors];
        newColors[index].images.push(downloadURL);
        setFormData({ ...formData, colors: newColors });
      });
    });
  };

  // Add new color
  const addColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, { colorName: '', images: [] }] });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert sizes to an array
    const sizesArray = formData.sizes.split(',').map(size => size.trim());

    try {
      await addDoc(collection(db, 'products'), {
        ...formData,
        sizes: sizesArray,
        price: parseFloat(formData.price),
        discountprice: parseFloat(formData.discountprice),
      });
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product: ', error);
      alert('Error adding product, please try again.');
    }
  };

  return (
    <div className="product-form-container">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>

        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <span className='Prices-container'>
          
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label htmlFor="discountprice">Discount Price ($)</label>
          <input
            type="number"
            name="discountprice"
            id="discountprice"
            value={formData.discountprice}
            onChange={handleChange}
          />
        </span>

        <label htmlFor="category">Category</label>
          <select name="category" id="category" value={formData.category} onChange={handleChange} required>
           <option value="">Select Category</option>
           <option value="Men">Men</option>
           <option value="Women">Women</option>
           <option value="Kids">Kids</option>
           <option value="Unisex">Unisex</option>
          </select>


        <label htmlFor="collection">Collection</label>
          <select name="collection" id="collection" value={formData.collection} onChange={handleChange} required>
           <option value="">Select Category</option>
           <option value="Winter">Winter</option>
           <option value="Summer">Summer</option>
           <option value="Spring">Spring</option>
           <option value="Fall">Fall</option>
          </select>



        <label htmlFor="sizes">Sizes (comma-separated)</label>
        <input
          type="text"
          name="sizes"
          id="sizes"
          value={formData.sizes}
          onChange={handleChange}
          required
        />

        <label htmlFor="type">Product Type</label>
        <select name="type" id="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select type</option>
          <option value="Jacket">Jacket</option>
          <option value="T-Shirt">T-Shirt</option>
          <option value="Tops">Top</option>
          <option value="Shoes">Hoodies</option>
          <option value="Pants">Pants</option>
          <option value="SweatPants">SweatPants</option>
          <option value="Shoes">Shoes</option>
          <option value="Dress">Dress</option>
          <option value="Skirt">Skirt</option>
        </select>

        <div>
          <label>Colors and Images</label>
          {formData.colors.map((color, index) => (
            <div key={index}>
              <input
                type="text"
                name="colorName"
                placeholder="Color Name"
                value={color.colorName}
                onChange={(e) => handleColorChange(index, e)}
                required
              />
              <input
                type="file"
                onChange={(e) => handleImageUpload(index, e)}
                required
              />
              <p>Uploaded Images:</p>
              {color.images.length > 0 ? (
                <ul>
                  {color.images.map((img, imgIndex) => (
                    <li key={imgIndex}>
                      <img src={img} alt={color.colorName} width="50" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No images uploaded for this color</p>
              )}
            </div>
          ))}
          <button type="button" className="color-button" onClick={addColor}>
           + Add Color
          </button>
        </div>

        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
