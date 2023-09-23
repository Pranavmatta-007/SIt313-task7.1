import React from 'react'
import "./formm.css"
import { Link } from 'react-router-dom';

function FormFTN() {
  return (
    <nav className='Nav'>
        <a href="#">DevDeakin</a>
      <input type="search" placeholder="search.." />
      <Link to='/Post'>Post</Link>
      <Link to='/Login'>Login</Link>

       
    </nav>
  );
}

export default FormFTN;
