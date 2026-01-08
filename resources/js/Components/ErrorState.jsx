import { FiAlertTriangle } from 'react-icons/fi';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

export default function ErrorState({
    title = 'Something went wrong',
    message,
    error,
    onRetry,
    onGoBack,
    className = '',
}) {
    const displayMessage = message || error?.message || 'An unexpected error occurred. Please try again.';

    return (
        <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
            <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-error-50 dark:bg-error-900/20">
                    <FiAlertTriangle className="h-12 w-12 text-error-500 dark:text-error-400" />
                </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>
            
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                {displayMessage}
            </p>
            
            {(onRetry || onGoBack) && (
                <div className="flex flex-col sm:flex-row gap-3">
                    {onRetry && (
                        <PrimaryButton onClick={onRetry}>
                            Try Again
                        </PrimaryButton>
                    )}
                    {onGoBack && (
                        <SecondaryButton onClick={onGoBack}>
                            Go Back
                        </SecondaryButton>
                    )}
                </div>
            )}
        </div>
    );
}

