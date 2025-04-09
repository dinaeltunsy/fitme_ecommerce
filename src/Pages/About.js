import React from 'react';
import './About.css'; // You can create a CSS file to style the component

const About = () => {
  return (
    <div className="">

      <div className='About-img-container'>
        <h1>Who Are We?</h1>
        <p> Welcome to <strong>Fitme</strong>, your go-to destination for locally crafted fashion that blends style,
          comfort, and individuality. We are a startup with a big dream to empower you to express your unique style
          through clothing that feels just right.</p>
      </div>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is simple: to offer stylish, comfortable clothing that helps people of all shapes and sizes feel
          confident and fashionable. We take pride in being a local brand, supporting local talent, and delivering
          designs that resonate with our community’s spirit and culture.
        </p>
      </section>

      <section className="why-fitme">
        <h2>Why Fitme?</h2>
        <ul>
          <li><strong>Local & Proud:</strong> We celebrate the beauty of homegrown fashion, designing everything with love right here in our city.</li>
          <li><strong>Quality Craftsmanship:</strong> Each piece is crafted with attention to detail, combining trendy aesthetics with lasting comfort.</li>
          <li><strong>For Everyone:</strong> We create inclusive designs that embrace all body types and personal styles.</li>
        </ul>
      </section>
     
    </div>
  );
};

export default About;
