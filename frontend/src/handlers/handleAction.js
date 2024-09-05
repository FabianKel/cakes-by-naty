// src/utils/handleAction.js

import useModal from 'src/hooks/useModal';

export const handleAction = async (url, method, openModal, closeModal, agree) => {
  // Espera la respuesta del usuario
  const result = await openModal();

  if (result) {
    try {
      const response = await fetch(url, { method });
      const data = await response.json();

      if (data.rowsDeleted > 0 || data.success) {
        console.log('Acción completada con éxito');
      } else {
        console.error('No se encontró el recurso o no se pudo completar la acción');
      }
    } catch (error) {
      console.error('Error al realizar la acción', error);
    }
  }
};
