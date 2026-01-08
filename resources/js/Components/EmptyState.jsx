import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function EmptyState({
    icon: Icon,
    title,
    description,
    actionLabel,
    action,
    secondaryActionLabel,
    secondaryAction,
    className = '',
}) {
    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
            {Icon && (
                <div className="mb-6">
                    <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800">
                        <Icon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    </div>
                </div>
            )}
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            
            {description && (
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                    {description}
                </p>
            )}
            
            {(action || secondaryAction) && (
                <div className="flex flex-col sm:flex-row gap-3">
                    {action && actionLabel && (
                        <PrimaryButton onClick={action}>
                            {actionLabel}
                        </PrimaryButton>
                    )}
                    {secondaryAction && secondaryActionLabel && (
                        <SecondaryButton onClick={secondaryAction}>
                            {secondaryActionLabel}
                        </SecondaryButton>
                    )}
                </div>
            )}
        </div>
    );
}



