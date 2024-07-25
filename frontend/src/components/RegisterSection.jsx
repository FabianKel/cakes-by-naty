function RegisterSection() {
    

//Para este register se debe tomar el Rol del usuario como el predeterminado osea "Cliente"

    return (
        <div className="p-10">
            <div className="bg-white w-full max-w-md mx-auto p-10 rounded-lg shadow-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold font-poppins">Register</h1>
                </div>
                <form>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Usuario"
                            //value={values.name}
                            //onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md font-poppins"
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
                            className="w-full p-3 border border-gray-300 rounded-md font-poppins"
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
                            className="w-full p-3 border border-gray-300 rounded-md font-poppins"
                        />
                        {/*errors.password && <span className="text-red-500 text-sm block text-center mt-2">{errors.password}</span>*/}
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full p-3 bg-white text-black border-hoverPink border-2 rounded-md font-poppins hover:bg-hoverPink transition duration-300"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p>
                        ¿Ya tienes una cuenta?{' '}
                        <a
                            href="/login"
                            //onClick={(e) => navigate('/login')}
                            className="text-midPink hover:text-hoverPink font-bold transition-colors"
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
