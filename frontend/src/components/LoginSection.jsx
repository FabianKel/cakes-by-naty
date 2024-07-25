function LoginSection() {

    return (
        <div className='p-8 bg-customPink'>
            <div className="bg-white w-full max-w-md mx-auto p-8 rounded-lg shadow-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold font-poppins">Login</h1>
                </div>
                <form>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            //value={values.username}
                            //onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md font-poppins"
                        />
                        {/*errors.username && <span className="text-red-500 text-sm block text-center mt-2">{errors.username}</span>*/}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            /*value={values.password}
                            onChange={handleChange}*/
                            className="w-full p-3 border border-gray-300 rounded-md font-poppins"
                        />
                        {/*errors.password && <span className="text-red-500 text-sm block text-center mt-2">{errors.password}</span>*/}
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full p-3 bg-white text-black border-hoverPink border-2 rounded-md font-poppins hover:bg-hoverPink transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <p>
                        ¿Aún no tienes una cuenta?{' '}
                        <a
                            href="/register"
                            //onClick={(e) => navigate('/register')}
                            className="text-midPink hover:text-hoverPink font-bold transition-colors"
                        >
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginSection;
