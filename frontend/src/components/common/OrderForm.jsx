'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '@/components/common/Modal'; 

const OrderForm = ({ usuario, token, onUserUpdate }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

    const cleanInitialValue = (value) => (value === 'No hay información' ? null : value);

    const limpiarValoresUsuario = (usuario) => ({
      primer_nombre: cleanInitialValue(usuario?.primer_nombre || ''),
      segundo_nombre: cleanInitialValue(usuario?.segundo_nombre || ''),
      telefono: cleanInitialValue(usuario?.telefono || ''),
    });    
    
    const initialValues = {
      ...limpiarValoresUsuario(usuario),
  };
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      try {
        const payload  = { ...usuario, ...values };

        const response = await fetch(`http://localhost:4000/users/edit/${usuario.usuarioid}/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`,},
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log("Información actualizada con éxito");
          setShowSuccessModal(true);
          if (onUserUpdate) onUserUpdate();
        } else {
          console.error("Error al actualizar la información", response);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    },
    validationSchema: yup.object({
      primer_nombre: yup.string().required('Nombre es requerido'),
      segundo_nombre: yup.string().required('Apellido es requerido'),
      telefono: yup.string().required('Número de teléfono es requerido'),
    }),  
  });


  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };


  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={formik.handleSubmit} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-white px-8 py-6">
          <h1 className="text-xl font-semibold text-gray-800">Información General</h1>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="primer_nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.primer_nombre}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors"
              />
              {formik.touched.primer_nombre && formik.errors.primer_nombre && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.primer_nombre}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                type="text"
                name="segundo_nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.segundo_nombre}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors"
              />
              {formik.touched.segundo_nombre && formik.errors.segundo_nombre && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.segundo_nombre}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telefono}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors"
            />
            {formik.touched.telefono && formik.errors.telefono && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.telefono}</p>
            )}
          </div>




        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2.5 bg-baseLavender text-white rounded-lg hover:bg-subtitlesPink transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={ formik.isSubmitting}
          >
            Guardar información
          </button>
        </div>
      </form>

      <Modal
        isOpen={showSuccessModal}
        onCancel={handleCloseSuccessModal}
        onAgree={handleCloseSuccessModal}
        msg="¡Información actualizada exitosamente!"
        type="success"
      />
    </div>
  );
};

export default OrderForm;
