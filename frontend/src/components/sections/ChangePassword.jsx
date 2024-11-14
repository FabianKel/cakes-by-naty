import React, { useState } from 'react';
import { getAuthToken, getCurrentUser } from '@/utils/functions';

function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const toggleCurrentPasswordVisibility = () => setCurrentPasswordVisible(!currentPasswordVisible);
    const toggleNewPasswordVisibility = () => setNewPasswordVisible(!newPasswordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden');
            setMessageType('error');
            return;
        }

        try {
            setIsLoading(true);
            const token = getAuthToken();
            const currentUser = getCurrentUser();

            if (!token || !currentUser) {
                throw new Error('No estás autenticado');
            }

            const response = await fetch(`http://localhost:4000/users/password/${currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Contraseña actualizada exitosamente');
                setMessageType('success');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                throw new Error(data.message || 'Error al actualizar la contraseña');
            }

        } catch (error) {
            console.error('Error:', error);
            setMessage(error.message || 'Error al actualizar la contraseña');
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] w-full px-4 -mt-20">
            <div className="w-full max-w-2xl p-8 bg-white rounded-xl border border-gray-200">
                <h2 className="text-2xl font-semibold mb-8 text-center">Cambiar Contraseña</h2>

                {message && (
                    <div className={`mb-6 p-4 rounded-md text-sm ${messageType === 'success'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label htmlFor="currentPassword" className="block text-base text-gray-600 mb-2">
                            Contraseña Actual
                        </label>
                        <div className="relative">
                            <input
                                type={currentPasswordVisible ? 'text' : 'password'}
                                id="currentPassword"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 pr-20 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors text-lg"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={toggleCurrentPasswordVisibility}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-buttonhoverPurple hover:text-baseLavender transition-colors flex items-center gap-1"
                                tabIndex="-1"
                            >
                                {currentPasswordVisible ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                        Ocultar
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Mostrar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    {/* Repeat for newPassword and confirmPassword */}
                    <div className="relative">
                        <label htmlFor="newPassword" className="block text-base text-gray-600 mb-2">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={newPasswordVisible ? 'text' : 'password'}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 pr-20 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors text-lg"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={toggleNewPasswordVisibility}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-buttonhoverPurple hover:text-baseLavender transition-colors flex items-center gap-1"
                                tabIndex="-1"
                            >
                                {newPasswordVisible ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                        Ocultar
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Mostrar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-base text-gray-600 mb-2">
                            Confirmar Nueva Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 pr-20 py-3 rounded-md border border-gray-200 focus:outline-none focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors text-lg"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-buttonhoverPurple hover:text-baseLavender transition-colors flex items-center gap-1"
                                tabIndex="-1"
                            >
                                {confirmPasswordVisible ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                        Ocultar
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        Mostrar
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-baseLavender text-white py-3 rounded-lg hover:bg-subtitlesPink transition-colors duration-300 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed relative"
                        >
                            {isLoading ? (
                                <>
                                    <span className="opacity-0">Cambiar Contraseña</span>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                    </div>
                                </>
                            ) : (
                                'Cambiar Contraseña'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default ChangePassword;