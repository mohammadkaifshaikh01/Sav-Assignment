import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptchaComponent = ({ onCaptchaChange }) => {
   return (
      <div className="recaptcha-container">
         <ReCAPTCHA
            sitekey="6LdKIZEqAAAAALcpZMBZVUbghioKkFQGWG-Q6QOK" 
            onChange={onCaptchaChange}
         />
      </div>
   );
};

export default ReCaptchaComponent;
