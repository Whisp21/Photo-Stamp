import React from 'react';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear()

  return (
    <div className="footer">
      <p className="info">Made with ❤</p>
      <p className="info">Copyright  {year}  Amy Venter</p>
    </div>
  )
}

export default Footer;
