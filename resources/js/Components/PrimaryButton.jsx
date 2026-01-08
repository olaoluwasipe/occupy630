import LoadingSpinner from './LoadingSpinner';

export default function PrimaryButton({ 
    className = '', 
    disabled, 
    children, 
    variant = 'default',
    size = 'md',
    loading = false,
    ...props 
}) {
    const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]';
    
    const variantClasses = {
        default: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
        outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500 dark:hover:bg-primary-900/20',
        ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500 dark:hover:bg-primary-900/20',
    };
    
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-6 py-3 text-base',
        xl: 'px-8 py-4 text-lg',
    };
    
    const isDisabled = disabled || loading;
    
    return (
        <button
            {...props}
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            disabled={isDisabled}
            aria-disabled={isDisabled}
        >
            {loading && (
                <LoadingSpinner 
                    size={size === 'sm' ? 'sm' : 'md'} 
                    color={variant === 'default' ? 'white' : 'primary'}
                    className="mr-2"
                />
            )}
            {children}
        </button>
    );
}
