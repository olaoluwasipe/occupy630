import { useState, useRef, useEffect } from 'react';
import Skeleton from './Skeleton';

export default function OptimizedImage({
    src,
    alt,
    className = '',
    width,
    height,
    sizes,
    loading = 'lazy',
    placeholder = 'blur',
    fallback = '/images/placeholder.jpg',
    ...props
}) {
    const [imageSrc, setImageSrc] = useState(placeholder === 'blur' ? undefined : src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(loading === 'eager');
    const imgRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        if (loading === 'lazy' && !isInView) {
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsInView(true);
                            if (observerRef.current && imgRef.current) {
                                observerRef.current.unobserve(imgRef.current);
                            }
                        }
                    });
                },
                { rootMargin: '50px' }
            );

            if (imgRef.current) {
                observerRef.current.observe(imgRef.current);
            }
        }

        return () => {
            if (observerRef.current && imgRef.current) {
                observerRef.current.unobserve(imgRef.current);
            }
        };
    }, [loading, isInView]);

    useEffect(() => {
        if (isInView && !imageSrc) {
            // Load WebP first, fallback to original
            const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            const img = new Image();
            
            img.onload = () => {
                setImageSrc(webpSrc);
                setIsLoading(false);
            };
            
            img.onerror = () => {
                // Fallback to original format
                setImageSrc(src);
                setIsLoading(false);
            };
            
            img.src = webpSrc;
        }
    }, [isInView, src, imageSrc]);

    const handleError = () => {
        if (imageSrc !== fallback) {
            setImageSrc(fallback);
            setHasError(true);
        }
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    // Generate srcset for responsive images
    const generateSrcSet = () => {
        if (!src) return undefined;
        const baseSrc = imageSrc || src;
        const sizes = ['320', '640', '768', '1024', '1280', '1920'];
        return sizes
            .map((size) => {
                const webp = baseSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                return `${webp}?w=${size} ${size}w`;
            })
            .join(', ');
    };

    return (
        <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
            {isLoading && (
                <Skeleton
                    variant="card"
                    className="absolute inset-0 w-full h-full"
                />
            )}
            {isInView && (
                <picture>
                    <source
                        srcSet={generateSrcSet()}
                        sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
                        type="image/webp"
                    />
                    <img
                        src={imageSrc || src}
                        alt={alt}
                        width={width}
                        height={height}
                        className={`
                            ${isLoading ? 'opacity-0' : 'opacity-100'}
                            transition-opacity duration-300
                            w-full h-full object-cover
                            ${className}
                        `}
                        onLoad={handleLoad}
                        onError={handleError}
                        loading={isInView ? 'lazy' : 'eager'}
                        {...props}
                    />
                </picture>
            )}
        </div>
    );
}



