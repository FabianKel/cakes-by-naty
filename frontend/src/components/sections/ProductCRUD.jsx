"use client";

import React, { useEffect, useRef, useState } from 'react';
import { getAuthToken, getCurrentUser } from '@/utils/functions';
import AddProductSection from '@/components/sections/AddProductSection';
import ManageProductSection from '@/components/sections/ManageProductSection';
import Custom404 from '@/components/Custom404';

function ProductCRUD() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [option, setOption] = useState('ManejarProductos');
  const sectionRef = useRef(null);

  useEffect(() => {
    const token = getAuthToken();
    const currentUser = getCurrentUser();

    if (token && currentUser) {
      setToken(token);
      if (currentUser.rol === 'admin') {
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (sectionRef.current && window.innerWidth <= 768) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [option]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-baseLavender"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Custom404 />;
  }

  return (
    <div className="flex flex-col mb-20 md:flex-row md:mx-32 lg:mx-52 md:mt-20">
      <div className="flex flex-col self-center md:self-auto w-64 h-fit my-8 md:my-0 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <div className="flex flex-col self-center md:self-auto w-full h-auto">
          <button
            className={`bg-white hover:bg-neutral-100 text-left px-4 py-2 rounded-lg ${
              option === 'ManejarProductos' && 'font-semibold'
            }`}
            onClick={() => setOption('ManejarProductos')}
          >
            Manejar Productos
          </button>
          <button
            className={`bg-white hover:bg-neutral-100 text-left px-4 py-2 rounded-lg ${
              option === 'AgregarProductos' && 'font-semibold'
            }`}
            onClick={() => setOption('AgregarProductos')}
          >
            Agregar Productos
          </button>
        </div>
      </div>

      <hr />

      <div ref={sectionRef} className="md:ml-16 md:border-l-[1px] md:border-gray-700 px-6 md:px-0 md:mx-0 flex flex-col self-center w-full bg-white">
        {option === 'ManejarProductos' && <ManageProductSection />}
        {option === 'AgregarProductos' && <AddProductSection />}
      </div>
    </div>
  );
}

export default ProductCRUD;
