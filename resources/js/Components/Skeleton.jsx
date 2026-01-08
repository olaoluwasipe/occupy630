export default function Skeleton({ className = '', variant = 'default', lines = 1, width = 'full' }) {
    const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';
    
    const variants = {
        default: baseClasses,
        text: `${baseClasses} h-4`,
        heading: `${baseClasses} h-8`,
        avatar: `${baseClasses} rounded-full`,
        card: `${baseClasses} h-48`,
        button: `${baseClasses} h-10`,
    };

    const widthClasses = {
        full: 'w-full',
        '3/4': 'w-3/4',
        '1/2': 'w-1/2',
        '1/4': 'w-1/4',
        '1/3': 'w-1/3',
    };

    if (variant === 'text' && lines > 1) {
        return (
            <div className={className}>
                {Array.from({ length: lines }).map((_, i) => (
                    <div
                        key={i}
                        className={`${variants.text} ${i === lines - 1 ? widthClasses[width] : 'w-full'} mb-2`}
                    />
                ))}
            </div>
        );
    }

    return <div className={`${variants[variant]} ${widthClasses[width]} ${className}`} />;
}



