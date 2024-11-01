import React from 'react';
import Button from '@/components/common/Button';

function Modal({ isOpen, onCancel, onAgree, msg, type, children }) {
    if (!isOpen) return null;

    const getBackgroundColor = () => {
        switch (type) {
            case 'alert':
                return 'bg-red-500';
            case 'success':
                return 'bg-white';
            default:
                return 'bg-blue-500';
        }
    };

    const getTextColor = () => {
        return type === 'success' ? 'text-black' : 'text-white';
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className={`border p-4 m-1 rounded-md shadow-lg flex flex-col justify-between max-w-sm ${getBackgroundColor()}`}>
                <h2 className={`text-2xl font-bold mb-2 text-center ${getTextColor()}`}>{msg}</h2>
                {children || (
                    <div className="flex justify-end mt-4">
                        <Button onClick={onCancel} className="mr-2">Cancelar</Button>
                        <Button onClick={onAgree} className="bg-blue-500 text-white">Continuar</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Modal;
