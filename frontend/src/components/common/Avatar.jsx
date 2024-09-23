import React from 'react';

function Avatar({ initials }) {
  return (
    <div className='bg-blue-500 rounded-full w-10 h-10 flex justify-center items-center text-white'>
      {initials}
    </div>
  );
}
export default Avatar;
