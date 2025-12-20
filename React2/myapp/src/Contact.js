import React, { useState } from 'react';
import "./Contact.css";
import { RiMailSendFill, RiLinkedinBoxFill,  RiPhoneFill, RiMapPin2Fill, RiInstagramFill } from 'react-icons/ri';
import Navbar from './Navbar';

const Contact = () => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: inputs.username,
          email: inputs.email,
          subject: inputs.subject
        })
      });

      if (response.ok) {
        alert('Your Message is sent successfully');
        setInputs({}); // Clear the form inputs after successful submission
      } else {
        console.error('Error:', response.statusText);
        // Handle errors (e.g., show error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className='contact'>Contact Us</h1>
      
       
        <div className='llleft'>
          <form className='form' onSubmit={handleSubmit}>
            <h2 className='h'>Send Message</h2>
            <label>Enter your name:
              <input 
                type="text" 
                name="username" 
                value={inputs.username || ""} 
                onChange={handleChange} 
                required
              />
            </label>
            <label>Enter your Email:
              <input 
                type="email" 
                name="email" 
                value={inputs.email || ""} 
                onChange={handleChange} 
                required
              />
            </label>
            <label>Subject:
              <textarea 
                value={inputs.subject || ""} 
                onChange={handleChange} 
                name="subject"  
                required
              />
            </label>
            <button type="submit" className='bn'>Submit</button>
          </form>
        </div>
      
    </div>
  );
}

export default Contact;
