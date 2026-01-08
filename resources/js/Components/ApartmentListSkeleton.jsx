import Skeleton from './Skeleton';

export default function ApartmentListSkeleton({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-soft overflow-hidden"
                >
                    {/* Image Skeleton */}
                    <Skeleton variant="card" className="w-full h-48" />
                    
                    {/* Content Skeleton */}
                    <div className="p-6">
                        <Skeleton variant="heading" width="3/4" className="mb-3" />
                        <Skeleton variant="text" width="1/2" className="mb-4" />
                        <Skeleton variant="text" lines={2} width="full" className="mb-4" />
                        
                        {/* Features Skeleton */}
                        <div className="flex gap-2 mb-4">
                            <Skeleton variant="text" width="1/4" className="h-6" />
                            <Skeleton variant="text" width="1/4" className="h-6" />
                            <Skeleton variant="text" width="1/4" className="h-6" />
                        </div>
                        
                        {/* Price and Button */}
                        <div className="flex items-center justify-between">
                            <Skeleton variant="heading" width="1/3" />
                            <Skeleton variant="button" width="1/3" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}



