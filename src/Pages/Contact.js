import React, { useState } from 'react'

const Contact = () => {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    message:''
  });

  const [isSent, SetSent] = useState(false);

  const handlechange = (e) =>{
    const {name , value} = e.target;
    
  }



  return (
    <div>

    </div>
  )
}

export default Contact