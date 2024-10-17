import React from 'react';
import '../assets/styles/About.css';

const TermsOfService = () => {
  return (
    <div className="terms-of-service-page">
      <h2>Terms of Service</h2>
      <p>
        By using WeatherApp, you agree to our terms and conditions. Our services are provided as-is,
        without guarantees for accuracy. Always use multiple sources when making critical decisions
        based on weather information.
      </p>
      <p>
        Unauthorized use of our service or content may result in restricted access. WeatherApp
        reserves the right to modify or discontinue any part of the service at any time.
      </p>
    </div>
  );
};

export default TermsOfService;