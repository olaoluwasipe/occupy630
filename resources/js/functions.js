export default function formatPrice (price) {
    if (!price) return '';
    return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    }).format(price);
}
