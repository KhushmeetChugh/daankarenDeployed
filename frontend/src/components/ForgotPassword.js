import React, { useState } from 'react';
import '../CSS/forgotpassword-page.css'; // Import your CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Invalid email address. Please enter a valid email.");
      return;
    }

    setIsLoading(true); // Set loading to true when the request starts

    try {
      console.log("email-=" + email);
      const response = await fetch('https://daankarendeployed-1.onrender.com/send-otp', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      // Wait for a short time to ensure loading animation is visible
      await new Promise(resolve => setTimeout(resolve, 500));

      if (response.ok) {
        setIsOtpSent(true);
        setSuccessMessage("OTP sent successfully to your email address.");
        setErrorMessage('');
      } else if (response.status === 404) {
        setErrorMessage("User not found. Please enter a valid email address.");
      } else {
        setErrorMessage("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
    }
  };



  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('https://daankarendeployed-1.onrender.com/verify-otp', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      });
      if (response.ok) {
        setIsOtpVerified(true);
        setSuccessMessage("OTP verified successfully.");
        setErrorMessage('');
      } else {
        setIsOtpVerified(false);
        setErrorMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to verify OTP. Please try again.");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const response = await fetch('https://daankarendeployed-1.onrender.com/change-password', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, newPassword }),
      credentials: "include",
    });
    if (response.ok) {
      setSuccessMessage("Password reset successfully.");
      setErrorMessage('');
      // Reset form fields
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setIsOtpSent(false);
      setIsOtpVerified(false);
    } else {
      setErrorMessage("Failed to reset password. Please try again.");
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (isOtpSent) {
      handleVerifyOtp();
    } else {
      handleSendOtp();
    }
  };

  return (
    <div className='forgot-password-div'>
      <div className="forgot-password-wrapper">
        <h2>Forgot Password</h2>
        {errorMessage && <div className="error-message-forgot-password">{errorMessage}</div>}
        {successMessage && <div className="success-message-forgot-password">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          {!isOtpSent && (
            <div className="form-group-forgot-password">
              <label className='form-group-forgot-password-label'>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          {!isOtpVerified && isOtpSent && (
            <div className="form-group-forgot-password">
              <label className='form-group-forgot-password-label'>OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          {isLoading ? (
            <div className="spinner"></div>
          ) : (
            <>
              {!isOtpSent && (
                <button className="button-forgot-password" type="button" onClick={handleSendOtp}>
                  Send OTP
                </button>
              )}
              {!isOtpVerified && isOtpSent && (
                <button className="button-forgot-password" type="button" onClick={handleVerifyOtp}>
                  Verify OTP
                </button>
              )}
              {isOtpVerified && isOtpSent && (
                <>
                  <div className="form-group-forgot-password">
                    <span className="forgot-password-new-pass-label">New Password:</span>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group-forgot-password">
                    <span className="forgot-password-new-pass-label">Confirm Password:</span>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button className="button-forgot-password" type="button" onClick={handleResetPassword}>
                    Reset Password
                  </button>
                </>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
