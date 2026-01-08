import Skeleton from './Skeleton';

export default function SkeletonCard({ count = 1, className = '' }) {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-soft p-6 ${className}`}
                >
                    <div className="flex items-center space-x-4 mb-4">
                        <Skeleton variant="avatar" width="1/4" className="w-12 h-12" />
                        <div className="flex-1">
                            <Skeleton variant="text" width="1/2" className="mb-2" />
                            <Skeleton variant="text" width="1/3" />
                        </div>
                    </div>
                    <Skeleton variant="card" className="mb-4" />
                    <Skeleton variant="text" lines={3} width="full" />
                </div>
            ))}
        </>
    );
}



