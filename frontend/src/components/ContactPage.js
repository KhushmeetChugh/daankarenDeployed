import React, { useState } from "react";
import "../CSS/contact-form.css";
import PhoneIcon from '../components/Icons/Phone.png';
import ChatIcon from '../components/Icons/Chat.png';
import { useNavigate } from 'react-router-dom';

function ContactPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://daankarendeployed-1.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      alert("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    }
  };

  return (
    <>
      <div className="contact-page-background">
        <div className="contact-page-hero-content">
          <h1 className="contact-page-heading">Contact Us about DaanKaren</h1>
          <p className="contact-page-text">We'd love to solve any kind of query you have and guide you through your journey of doing the selfless acts of donation</p>
        </div>
      </div>
      <section className="contact-page-container">
        <div className="contact-details">
          <div className="contact-details-phone">
            <img src={PhoneIcon}></img>
            <div className="contact-details-content">
              <h1>Call us at</h1>
              <a href="tel:8181818181">+91 8181818181</a>
            </div>
          </div>
          <div className="contact-details-chat">
            <img src={ChatIcon}></img>
            <div className="contact-details-content">
              <h1>Chat with us</h1>
              <button>CHAT</button>
            </div>
          </div>
        </div>
        <div className="contact-form-container flex">
              <h1>Share a Feedback</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                className="contact-form-input-field"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="contact-form-input-field"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="contact-form-input-field"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                cols={50}
                rows={4}
                className="contact-form-input-field"
                id="message"
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button className="contact-form-submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
