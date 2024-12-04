import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptchaComponent = ({ onCaptchaChange }) => {
   return (
      <div className="recaptcha-container">
         <ReCAPTCHA

         // for domain site key 6Ldr7ZEqAAAAAFwBekmDiqmUG6_-hJrtJphwXl3K
         // 6LcATpEqAAAAABWO9S_D0g31-l1_KGZIr6dFXKqW local host
            sitekey="6Ldr7ZEqAAAAAFwBekmDiqmUG6_-hJrtJphwXl3K"
            onChange={onCaptchaChange}
         />
      </div>
   );
};

export default ReCaptchaComponent;
