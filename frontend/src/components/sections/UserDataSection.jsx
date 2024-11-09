'use client';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const UserDataSection = ({ usuario, token }) => {
  console.log(token)

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
        console.log(JSON.stringify(values))
        const response = await fetch(`http://localhost:4000/users/edit/${usuario.usuarioid}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          console.log("Información actualizada con éxito");
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

  

  return (
    <section className='flex flex-row w-full justify-center md:justify-end'>
        <form onSubmit={formik.handleSubmit} className='flex flex-col justify-self-end bg-white p-16 py-6 md:w-10/12 md:py-16 rounded-lg shadow-lg border border-gray-300'>
          <h1 className='text-2xl font-semibold font-poppins text-center'>Información General</h1>
          <div className='mt-6 flex flex-col text-left mb-8 gap-6'>
          <div className='flex flex-col'>
                <label className='font-semibold text-[14px]'>Nombre </label>
                <input
                  type='text'
                  name='primer_nombre'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.primer_nombre}
                  className='w-full p-3 text-[14px] border border-gray-300 rounded-md text-opacity-5 bg-[#F9FAFB]'
                />
                {formik.touched.usuario && formik.errors.primer_nombre && (
                  <span className='text-red-500 text-sm'>{formik.errors.primer_nombre}</span>
                )}
              </div>
              <div className='flex flex-col'>
                <label className='font-semibold text-[14px]'>Apellido </label>
                <input
                  type='text'
                  name='segundo_nombre'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.segundo_nombre}
                  className='w-full p-3 text-[14px] border border-gray-300 rounded-md text-opacity-5 bg-[#F9FAFB]'
                />
                {formik.touched.segundo_nombre && formik.errors.segundo_nombre && (
                  <span className='text-red-500 text-sm'>{formik.errors.segundo_nombre}</span>
                )}
              </div>            
            <div className='flex flex-col'>
              <label className='font-semibold text-[14px]'>Nombre de Usuario:</label>
              <input
                type='text'
                name='usuario'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.usuario}
                className='w-full p-3 text-[14px] border border-gray-300 rounded-md text-opacity-5 bg-[#F9FAFB]'
                />
              {formik.touched.usuario && formik.errors.usuario && (
                <span className='text-red-500 text-sm'>{formik.errors.usuario}</span>
              )}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-[14px]'>Correo Electrónico:</label>
              <input
                type='email'
                name='correo'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.correo}
                className='w-full p-3 text-[14px] border border-gray-300 rounded-md text-opacity-5 bg-[#F9FAFB]'
                />
              {formik.touched.correo && formik.errors.correo && (
                <span className='text-red-500 text-sm'>{formik.errors.correo}</span>
              )}
            </div>
            <div className='flex flex-col'>
              <label className='font-semibold text-[14px]'>Teléfono:</label>
              <input
                type='text'
                name='telefono'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.telefono}
                className='w-full p-3 text-[14px] border border-gray-300 rounded-md text-opacity-5 bg-[#F9FAFB]'
                />
              {formik.touched.telefono && formik.errors.telefono && (
                <span className='text-red-500 text-sm'>{formik.errors.telefono}</span>
              )}
            </div>
            <button
              type='submit'
              className='w-fit mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700'
              disabled={!formik.dirty || formik.isSubmitting}
            >
              Guardar información
            </button>
          </div>
        </form>
    </section>
  );
}

export default UserDataSection;
