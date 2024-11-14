'use client';

import React, { useState, useRef, useEffect } from 'react';
import Avatar from './Avatar';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/utils/functions';
import { getUsuario } from '@/utils/https';

const Popover = ({ handleLogout }) => {
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);
  const router = useRouter();

  const [showPopover, setShowPopover] = useState(false);
  const [initials, setInitials] = useState('');
  const [userInfo, setUserInfo] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar el popover con la tecla Escape
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setShowPopover(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const currentUser = getCurrentUser();
      if (!currentUser) {
        handleLogout();
        return;
      }

      const currentUserInfo = await getUsuario(currentUser.id);
      if (currentUserInfo?.usuario) {
        setUserInfo(currentUserInfo.usuario);
        setInitials(currentUserInfo.usuario.usuario?.slice(0, 2) || '');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUserProfile = () => {
    router.push('/user');
    setShowPopover(false);
  };

  const handleLogoutClick = () => {
    setShowPopover(false);
    handleLogout();
  };

  return (
    <div className='relative inline-block'>
      <button 
        ref={buttonRef}
        onClick={() => setShowPopover(!showPopover)}
        className="focus:outline-none focus:ring-2 focus:ring-baseLavender rounded-full"
        aria-expanded={showPopover}
        aria-haspopup="true"
      >
        <Avatar initials={initials} />
      </button>

      {showPopover && (
        <div 
          ref={popoverRef}
          className='absolute right-0 w-64 z-50 bg-white border border-gray-200 rounded-xl shadow-lg py-2 mt-2 transform transition-all duration-200 ease-out'
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          {loading ? (
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-baseLavender"></div>
            </div>
          ) : (
            <div className='flex flex-col'>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{userInfo?.usuario}</p>
                <p className="text-sm text-gray-500">{userInfo?.correo}</p>
              </div>
              <div className="py-1">
                <button
                  onClick={handleUserProfile}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg 
                    className="mr-3 h-5 w-5 text-gray-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mi Perfil
                </button>

                <button
                  onClick={handleLogoutClick}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <svg 
                    className="mr-3 h-5 w-5 text-red-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Popover;
