import React from 'react'
import './Header.css';
import { useNavigate } from 'react-router-dom';


function Header() {
    let navigate = useNavigate();

    return (
        <div className='header'>
            <button onClick={() => navigate('/home')}>
                Home
            </button>
            <button onClick={() => navigate('/upload')}>
                Upload
            </button>
        </div>
    )
}

export default Header
