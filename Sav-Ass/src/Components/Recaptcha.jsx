import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptchaComponent = ({ onCaptchaChange }) => {
   return (
      <div className="recaptcha-container">
         <ReCAPTCHA
            sitekey="6LfuS5EqAAAAABcd3Ao7oPBsZCzNpzLz6X4z_iGI" 
            onChange={onCaptchaChange}
         />
      </div>
   );
};

export default ReCaptchaComponent;
