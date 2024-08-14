import React from 'react';


function Button({ children, width, height, onClick, type = "button", className }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${className} ${width ? `w-${width}` : ''} ${height ? `h-${height}` : ''} flex items-center justify-center`}
        >
            {children}
        </button>
    );
}

export default Button;