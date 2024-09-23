import React from 'react';
import Button from '@/components/common/Button';

function Modal({ isOpen, onCancel, onAgree, msg, type }) {
    if (!isOpen) return null;

    const backgroundColor = type === 'alert' ? 'bg-red-500' : 'bg-blue-500';

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className={`border p-4 m-1 rounded-md shadow-lg flex flex-col justify-between max-w-sm bg-white ${backgroundColor}`}>
                <h2 className="text-2xl font-bold mb-2">{msg}</h2>
                <div className="flex justify-end mt-4">
                    <Button onClick={onCancel} className="mr-2">Cancelar</Button>
                    <Button onClick={onAgree} className="bg-blue-500 text-white">Continuar</Button>
                </div>
            </div>
        </div>
    );
}

export default Modal;
