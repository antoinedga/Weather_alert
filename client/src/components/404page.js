import React from 'react';
import {Link} from 'react-router-dom';

export default function errorPage() {
    return (
        <div>
            <p style={{textAlign:"center", marginLeft: '40vw', marginRight:'40vw', marginTop: '40vh', marginBottom: '40vh'}}>
            <h1>404</h1>
            <Link to="/">Go to Login</Link>
            </p>
      </div>
    )
  }