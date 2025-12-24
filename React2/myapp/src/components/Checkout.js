import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Checkout.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const session_token = localStorage.getItem('session_token');

    if (!session_token) {
      toast.error("Please login to place an order", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const dataToSend = {
      session_token: session_token,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
    };

    fetch("http://localhost:8080/checkout.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.success("Your order has been placed successfully!", {
            position: "top-right",
            autoClose: 3000,
          });

          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            city: '',
          });

          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          toast.error(data.message || "Failed to place order. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error("An error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <>
      <ToastContainer />

      <div className='checkout'>
        <form className='check' onSubmit={handleSubmit}>
          <div>
            <h1>Customer Information</h1>

            <div>
              <label className='FN'>First Name</label>
              <input
                type='text'
                name='firstName'
                placeholder='Name'
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='FN'>Last Name</label>
              <input
                type='text'
                name='lastName'
                placeholder='Last Name'
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='FN'>Email</label>
              <input
                type='email'
                name='email'
                placeholder='wa@example.com'
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <h1>Payment Method</h1>
            <input type='checkbox' checked readOnly />
            <label className='cash'>Cash on Delivery</label>
          </div>

          <div>
            <h1>Shipping</h1>

            <div>
              <label className='FN'>Address</label>
              <input
                type='text'
                name='address'
                placeholder='Address'
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='FN'>City</label>
              <input
                type='text'
                name='city'
                placeholder='City'
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <input type="submit" className="button" value="Submit" />
          <input
            type='reset'
            value="Reset"
            className="button"
            onClick={() =>
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                city: '',
              })
            }
          />
        </form>
      </div>
    </>
  );
};

export default Checkout;
