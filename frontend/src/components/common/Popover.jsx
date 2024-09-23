'use client';

import React, { useState, useRef, useEffect } from 'react';
import Avatar from './Avatar';
import Icon from './Icon';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/utils/functions';
import { getUsuario } from '@/utils/https';

const Popover = ({ handleLogout }) => {
  const buttonRef = useRef(null);
  const router = useRouter();

  const [showPopover, setShowPopover] = useState(false);
  const [initials, setInitials] = useState('');
  const [userInfo, setUserInfo] = useState(undefined);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const fetchUser = async () => {
    const currentUser = getCurrentUser();
    const currentUserInfo = await getUsuario(currentUser.id);

    setUserInfo(currentUserInfo.usuario);
    setInitials(currentUserInfo.usuario.usuario.slice(0, 2));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='relative inline-block'>
      <button ref={buttonRef} onClick={togglePopover}>
        <Avatar initials={initials} />
      </button>

      {showPopover && (
        <div className='absolute right-0 w-60 z-10 bg-white border border-gray-300 rounded-lg shadow-lg p-4 mt-2'>
          <div className='flex flex-col'>
            <a className='hover:cursor-pointer' onClick={() => router.push('/user')}>
              {userInfo?.usuario}
            </a>

            <button className='flex h-10 items-center gap-2' onClick={() => handleLogout()}>
              <p>Cerrar sesión</p>
              <Icon
                src='/logout.svg'
                alt='Logout'
                height='4'
                width='4'
                className='transition-transform transform hover:scale-125'
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;
