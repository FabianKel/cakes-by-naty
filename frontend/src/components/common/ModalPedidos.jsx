import React from 'react';
import Button from '@/components/common/Button';

function Modal({ children, isOpen, onCancel, singleButton = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="border p-4 m-1 rounded-md shadow-lg flex flex-col justify-between bg-white w-3/4 h-5/6">
        {children}
        <div className="flex justify-end mt-4 gap-3">
          {singleButton ? (
            <Button onClick={onCancel} className="rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300">
              Cerrar
            </Button>
          ) : (
            <>
              <Button onClick={onCancel} className="rounded-md px-4 py-2 hover:bg-slate-200">
                Cancelar
              </Button>
              <Button onClick={onAgree} className="bg-blue-500 rounded-md px-4 py-2 text-white">
                Continuar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;