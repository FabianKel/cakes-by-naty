import { useState, useCallback } from 'react';

function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [promiseResolver, setPromiseResolver] = useState(null);

    const openModal = useCallback(() => {
        return new Promise((resolve) => {
            setIsOpen(true);
            setPromiseResolver(() => resolve);
        });
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        if (promiseResolver) {
            promiseResolver(false); // Default to false if closed without action
        }
    }, [promiseResolver]);

    const agree = useCallback(() => {
        setIsOpen(false);
        if (promiseResolver) {
            promiseResolver(true);
        }
    }, [promiseResolver]);

    return {
        isOpen,
        openModal,
        closeModal,
        agree,
    };
}

export default useModal;
