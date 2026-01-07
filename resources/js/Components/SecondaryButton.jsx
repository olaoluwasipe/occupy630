export default function SecondaryButton({ 
    type = 'button', 
    className = '', 
    disabled, 
    children,
    variant = 'default',
    size = 'md',
    ...props 
}) {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
        default: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500 shadow-sm hover:shadow-md',
        outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500',
    };
    
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
    };
    
    return (
        <button
            {...props}
            type={type}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            disabled={disabled}
            aria-disabled={disabled}
        >
            {children}
        </button>
    );
}
