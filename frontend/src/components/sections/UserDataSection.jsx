'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Modal from '@/components/common/Modal'; 

const UserDataSection = ({ usuario, token, onUserUpdate}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      usuario: usuario?.usuario === "No hay información" ? "" : usuario?.usuario || "",
      primer_nombre: usuario?.primer_nombre === "No hay información" ? "" : usuario?.primer_nombre || "",
      segundo_nombre: usuario?.segundo_nombre === "No hay información" ? "" : usuario?.segundo_nombre || "",
      correo: usuario?.correo === "No hay información" ? "" : usuario?.correo || "",
      telefono: usuario?.telefono === "No hay información" ? "" : usuario?.telefono || "",
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`http://localhost:4000/users/edit/${usuario.usuarioid}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log("Información actualizada con éxito");
          setShowSuccessModal(true); 
          if (onUserUpdate) {
            onUserUpdate();
          }

        } else {
          console.error("Error al actualizar la información", response);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    },
    validationSchema: yup.object({
      usuario: yup.string().required('Usuario es requerido'),
      primer_nombre: yup.string().required('Nombre es requerido'),
      correo: yup.string().email().required('Correo es requerido'),
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
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="usuario"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.usuario}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors"
            />
            {formik.touched.usuario && formik.errors.usuario && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.usuario}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.correo}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:border-baseLavender focus:ring-1 focus:ring-baseLavender transition-colors"
            />
            {formik.touched.correo && formik.errors.correo && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.correo}</p>
            )}
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
            disabled={!formik.dirty || formik.isSubmitting}
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
      >
        <div className="flex flex-col items-center justify-center p-6">
          <div className="mb-4 text-green-500">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <button
            onClick={handleCloseSuccessModal}
            className="bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 font-semibold text-lg shadow-md"
          >
            Entendido
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default UserDataSection;
