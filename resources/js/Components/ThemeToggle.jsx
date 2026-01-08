import { useTheme } from '@/Contexts/ThemeContext';
import { BsSun, BsMoon } from 'react-icons/bs';

export default function ThemeToggle({ className = '' }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative inline-flex items-center justify-center
                w-12 h-12 rounded-lg
                bg-gray-100 dark:bg-gray-800
                hover:bg-gray-200 dark:hover:bg-gray-700
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                ${className}
            `}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            <div className="relative w-6 h-6">
                <BsSun
                    className={`
                        absolute inset-0 w-6 h-6 text-yellow-500
                        transition-all duration-300
                        ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}
                    `}
                />
                <BsMoon
                    className={`
                        absolute inset-0 w-6 h-6 text-blue-400
                        transition-all duration-300
                        ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}
                    `}
                />
            </div>
        </button>
    );
}



