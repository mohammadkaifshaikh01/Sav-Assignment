import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptchaComponent = ({ onCaptchaChange }) => {
   return (
      <div className="recaptcha-container">
         <ReCAPTCHA
            sitekey="6LcATpEqAAAAABWO9S_D0g31-l1_KGZIr6dFXKqW" 
            onChange={onCaptchaChange}
         />
      </div>
   );
};

export default ReCaptchaComponent;
