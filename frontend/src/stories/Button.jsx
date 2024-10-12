import React from 'react';

function Button({text, svg, onClick}) {
    return (
      <button onClick={onClick} className="p-2 bg-buttonCardPink text-white rounded-md hover:bg-subtitlesPink transition duration-300 flex items-center font-navheader">
        {text}
        {svg}
    </button>
    );
};

export default Button;