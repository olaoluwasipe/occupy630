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
                `w-full px-4 py-2.5 border rounded-lg shadow-sm transition-all duration-200 
                ${error 
                    ? 'border-error-500 focus:border-error-500 focus:ring-error-500' 
                    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-0
                disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50
                placeholder:text-gray-400
                ` + className
            }
            ref={input}
            aria-invalid={error}
        />
    );
});
