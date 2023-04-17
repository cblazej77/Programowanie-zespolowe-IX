import React, { useState } from 'react';
import './Drop.css';
import { MenuItems } from './MenuList';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Auth';

function Dropdown(){
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
  
    const auth = useAuth()

    return (
        <>
        <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
      {MenuItems.map((item, index) => {
        return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;