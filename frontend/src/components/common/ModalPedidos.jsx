import React from 'react';
import Button from '@/components/common/Button';

function Modal({ children, isOpen, onCancel, onAgree, msg, type }) {
  if (!isOpen) return null;

  const backgroundColor = type === 'alert' ? 'bg-red-500' : 'bg-blue-500';

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div
        className={`border p-4 m-1 rounded-md shadow-lg flex flex-col justify-between  bg-white w-3/4 h-5/6 ${backgroundColor}`}
      >
        {children}
        <div className='flex justify-end mt-4 gap-3'>
          <Button onClick={onCancel} className='mr-2 rounded-md px-4 py-2 hover:bg-slate-200'>
            Cancelar
          </Button>
          <Button onClick={onAgree} className='bg-blue-500 rounded-md px-4 py-2 text-white'>
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;