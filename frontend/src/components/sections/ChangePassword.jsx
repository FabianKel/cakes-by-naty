import React, { useState } from 'react';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            setMessageType('error');
            return;
        }

        //Lógica para enviar la solicitud de cambio de contraseña 

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage('Contraseña actualizada exitosamente');
        setMessageType('success');
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] w-full px-4">
            <div className="w-full max-w-2xl p-8 bg-white rounded-xl border border-gray-200">
                <h2 className="text-2xl font-semibold mb-8 text-center">Cambiar Contraseña</h2>
                
                {message && (
                    <div className={`mb-6 p-4 rounded-md text-sm ${
                        messageType === 'success' 
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                    }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="currentPassword" className="block text-base text-gray-600 mb-2">
                            Contraseña Actual
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors text-lg"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="newPassword" className="block text-base text-gray-600 mb-2">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors text-lg"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-base text-gray-600 mb-2">
                            Confirmar Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors text-lg"
                            required
                        />
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-baseLavender text-white py-3 rounded-lg hover:bg-subtitlesPink transition-colors duration-300 text-lg font-medium"
                        >
                            Cambiar Contraseña
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChangePassword;