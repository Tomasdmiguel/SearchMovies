import React from 'react';


const Nav = () => {
  const text = 'WhatsMovies';
  
  return (
    <div className="">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`fall-animation text-4xl ${index % 2 === 0 ? 'text-blue-500' : 'text-red-500'}`} 
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default Nav;