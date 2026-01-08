import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ 
    type = 'text', 
    className = '', 
    isFocused = false,
    error = false,
    ...props 
}, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                `w-full px-4 py-2.5 border rounded-lg shadow-sm 
                transition-all duration-200 ease-in-out
                transform focus:scale-[1.01]
                ${error 
                    ? 'border-error-500 focus:border-error-500 focus:ring-error-500 dark:border-error-600 dark:focus:border-error-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400 focus:ring-primary-500 dark:focus:ring-primary-400'
                }
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-white
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                focus:outline-none focus:ring-2 focus:ring-offset-0 dark:focus:ring-offset-gray-800
                disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50
                ` + className
            }
            ref={input}
            aria-invalid={error}
        />
    );
});
