import Skeleton from './Skeleton';

export default function DashboardSkeleton() {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* Header Skeleton */}
                <div className="mb-8">
                    <Skeleton variant="heading" width="1/3" className="mb-4" />
                    <Skeleton variant="text" width="1/2" />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-soft p-6"
                        >
                            <Skeleton variant="text" width="1/2" className="mb-4" />
                            <Skeleton variant="heading" width="1/3" />
                        </div>
                    ))}
                </div>

                {/* Main Content Skeleton */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-soft p-6">
                    <Skeleton variant="heading" width="1/4" className="mb-6" />
                    <Skeleton variant="text" lines={5} width="full" />
                </div>
            </div>
        </div>
    );
}



