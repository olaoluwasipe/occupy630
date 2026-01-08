export default function LoadingSpinner({ 
    size = 'md', 
    className = '',
    color = 'primary',
    fullScreen = false 
}) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    const colorClasses = {
        primary: 'border-primary-500',
        white: 'border-white',
        gray: 'border-gray-500',
    };

    const spinner = (
        <div
            className={`
                ${sizeClasses[size]}
                ${colorClasses[color]}
                border-4 border-t-transparent
                rounded-full
                animate-spin
                ${className}
            `}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
}



