import React from 'react';

function RegisterSection() {
    //Para este register se debe tomar el Rol del usuario como el predeterminado osea "Cliente"

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="bg-white w-full max-w-lg mx-auto p-12 py-20 rounded-lg shadow-lg border border-gray-300">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold font-poppins">Register</h1>
                </div>
                <form>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Usuario"
                            //value={values.name}
                            //onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md font-poppins mb-4"
                        />
                        {/*errors.name && <span className="text-red-500 text-sm block text-center mt-2">{errors.name}</span>*/}
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            //value={values.email}
                            //onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md font-poppins mb-4"
                        />
                        {/*errors.email && <span className="text-red-500 text-sm block text-center mt-2">{errors.email}</span>*/}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            //value={values.password}
                            //onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md font-poppins mb-4"
                        />
                        {/*errors.password && <span className="text-red-500 text-sm block text-center mt-2">{errors.password}</span>*/}
                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            //value={values.confirmPassword}
                            //onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-md font-poppins mb-4"
                        />
                        {/*errors.confirmPassword && <span className="text-red-500 text-sm block text-center mt-2">{errors.confirmPassword}</span>*/}
                    </div>
                    <div className="mb-8">
                        <button
                            type="submit"
                            className="w-full p-4 bg-white-600 text-black border-2 border-custom1Pink rounded-md font-poppins hover:bg-custom1Pink transition duration-300"
                        >
                            Regístrate
                        </button>
                    </div>
                </form>
                <div className="text-center mt-8">
                    <p>
                        ¿Ya tienes una cuenta?{' '}
                        <a
                            href="/login"
                            //onClick={(e) => navigate('/login')}
                            className="text-midPink hover:text-hoverPink hover:cursor-pointer font-bold transition-colors"
                        >
                            Inicia Sesión
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterSection;