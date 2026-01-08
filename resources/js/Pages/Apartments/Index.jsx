import React, {useState} from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import parse from 'html-react-parser'
import { FaLocationDot, FaLocationPin } from 'react-icons/fa6'
import IconTextInput from '@/Components/IconTextInput'
import { FaSearch } from 'react-icons/fa'
import LgaSelect from '@/Components/LgaSelect'
import TextInput from '@/Components/TextInput'
import SelectInput from '@/Components/SelectInput'
import EmptyState from '@/Components/EmptyState'
import ApartmentListSkeleton from '@/Components/ApartmentListSkeleton'
import { FiHome } from 'react-icons/fi'

const Apartments = ({auth, apartments, newApartments}) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [state, setCity] = useState({
        state: '',
        lga: '',
    });
    const [selectedPriceRange, setSelectedPriceRange] = useState('');

    const handlePriceRangeChange = (e) => {
        setSelectedPriceRange(e.target.value);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCityChange = (newState) => {
        setCity(newState);
    };

    const handleBedroomsChange = (e) => {
        setBedrooms(e.target.value);
    };

    const handleBathroomChange = (e) => {
        setBathrooms(e.target.value);
    };

    const filteredApartments = apartments?.filter((apartment) => {
        // Convert apartment values to strings and check for searchQuery match
        const matchesSearchQuery = Object.values(apartment).some((col) =>
            String(col).toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Check if the state matches
        const matchesState = () => {
            if (state.state === '') return true;
            return apartment.state
                ?.toLowerCase()
                .includes(state.state?.toLowerCase());
        };

        // Check if the city matches
        const matchesCity = () => {
            if (state.lga === '') return true;
            return apartment.city
                ?.toLowerCase()
                .includes(state.lga?.toLowerCase());
        };

        // Check if bedrooms match
        const matchesBedroom = () => {
            if (bedrooms === 0 || bedrooms === "") return true;
            return apartment.bedrooms === bedrooms;
        };

        // Check if bathrooms match
        const matchesBathroom = () => {
            if (bathrooms === 0 || bathrooms === '') return true;
            return apartment.bathrooms === bathrooms;
        };

        // Check if price range matches
        const matchesPriceRange = () => {
            if (!selectedPriceRange) return true; // No filtering if no range is selected

            var monthlyPrice = parseInt(apartment.monthly_price, 10);

            const [min, max] = selectedPriceRange
                .split(' - ') // Split the range into min and max
                .map((val) => parseInt(val, 10)); // Convert to integers

            if (!max) {
                // Handle cases where the range is '< 300,000' or '> 1,000,000'
                return min > 1000000
                    ? monthlyPrice > min
                    : monthlyPrice < min;
            }

            return (
                monthlyPrice >= min && monthlyPrice <= max
            );
        };

        // Combine all conditions
        return (
            matchesSearchQuery &&
            matchesState() &&
            matchesCity() &&
            matchesBedroom() &&
            matchesBathroom() &&
            matchesPriceRange()
        );
    });


    const formatPrice = (price) => {
        if (!price) return '';
        return new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(price);
      }

  return (
    <AuthenticatedLayout
        user={auth.user}
    >
        <Head title="Apartments" />
        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <nav className="flex mb-4" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-4">
                            <li>
                                <a href="#" className="text-gray-500 hover:text-gray-700">

                                    <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Home</a>
                                </a>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.82364 6.17636C8.27919 6.63191 8.27919 7.37173 7.82364 7.82728L1.99258 13.6583C1.53703 14.1139 0.797215 14.1139 0.341663 13.6583C-0.113888 13.2028 -0.113888 12.463 0.341663 12.0074L5.34908 7L0.345308 1.99258C-0.110243 1.53703 -0.110243 0.797215 0.345308 0.341663C0.800859 -0.113888 1.54067 -0.113888 1.99622 0.341663L7.82728 6.17272L7.82364 6.17636Z" fill="#717171"/>
                                    </svg>
                                    <a href="#" className="ml-4 text-sm font-medium text-green-500 hover:text-green-700">Apartments</a>
                                </div>
                            </li>
                        </ol>
                    </nav>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-soft sm:rounded-lg p-4 sm:p-6 transition-colors duration-200">
                        <div className='w-full flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-between'>
                            <div className='flex flex-col'>
                                <h2 className='text-xl sm:text-2xl font-bold text-blue-900 dark:text-blue-100'>{auth.user.type === 'employee' ? 'My Apartments' : 'Apartments'} </h2>
                            </div>
                            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    <IconTextInput
                                        icon={<FaSearch size={17} />}
                                        rounded="rounded-full"
                                        className="border border-gray-400 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 h-10 sm:h-auto rounded-md w-full sm:w-auto min-w-[200px]"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                    <SelectInput
                                        onChange={handlePriceRangeChange}
                                        className="w-full sm:w-auto min-w-[180px]"
                                    >
                                        <option value="">Select Price Range</option>
                                        <option value="300000">{'< 300,000'}</option>
                                        <option value="300000 - 500000">{'300,000 - 500,000'}</option>
                                        <option value="500000 - 1000000">{'500,000 - 1,000,000'}</option>
                                        <option value="1000000">{'> 1,000,000'}</option>
                                    </SelectInput>
                                </div>
                                <div className="w-full sm:w-auto">
                                    <LgaSelect
                                        onChange={handleCityChange}
                                        className="w-full sm:w-auto"
                                    />
                                </div>
                                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                                    <TextInput
                                        type="number"
                                        placeholder="Bedrooms"
                                        onChange={handleBedroomsChange}
                                        className="w-full sm:w-24"
                                    />
                                    <TextInput
                                        type="number"
                                        placeholder="Bathrooms"
                                        onChange={handleBathroomChange}
                                        className="w-full sm:w-24"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 py-12 mx-auto'>
                        <div className='actions flex flex-col gap-3 w-full items-center' >
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
                                {filteredApartments?.length > 0 ? (
                                    filteredApartments.map((item, i) => (
                                        <Link 
                                            key={i} 
                                            href={`/apartment/${item.slug}`} 
                                            className='action flex flex-col shadow-soft hover:shadow-medium items-start h-full rounded-2xl overflow-hidden justify-center bg-white dark:bg-gray-800 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1'
                                        >
                                            <div className="h-48 sm:h-72 overflow-hidden course-heading flex text-white bg-gray-400 w-full flex-col gap-3">
                                                <img 
                                                    src={`${item?.images[0]?.path}`} 
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                                />
                                            </div>
                                            {auth.user.type == 'learner' ? (
                                            <div className='p-6 w-full'>
                                                <p className='text-bold'>Pending tasks</p>
                                                <p className='p-2 bg-green-200 text-green-800 rounded'>Assignment due in 2 days</p>
                                                <p className='text-bold mt-3'>Scheduled meetings</p>
                                                <p className='p-2 bg-gray-200 text-gray-800 rounded'>No scheduled meetings</p>
                                            </div>
                                            ) : (
                                            <div className='p-4 sm:p-6 w-full'>
                                                <div className="flex row items-center space-between gap-2 mb-2">
                                                    <FaLocationDot className="text-red-500 flex-shrink-0" />
                                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 truncate">{item?.address}</p>
                                                </div>
                                                <div className="h-1/4 course-heading flex text-black dark:text-white w-full flex-col gap-3 mb-4">
                                                    <h4 className='text-lg sm:text-2xl font-bold line-clamp-2'>{item.title}</h4>
                                                    <p className='tutor text-sm sm:text-base text-gray-600 dark:text-gray-400'>Landlord: {item.landlord.fullname}</p>
                                                </div>
                                                <hr className='mt-4 border-gray-200 dark:border-gray-700' />
                                                <p className='text-sm font-semibold mt-3 text-gray-700 dark:text-gray-300'>Price:</p>
                                                <p className='p-2 bg-sky-200 dark:bg-sky-900/30 text-sky-800 dark:text-sky-200 rounded flex items-center gap-4 text-sm sm:text-base font-semibold'>

                                                    {formatPrice(item?.monthly_price) } / month
                                                </p>
                                            </div>
                                            )}
                                        </Link>
                                    ))
                                ) : (
                                    <div className='col-span-1 md:col-span-2 lg:col-span-3'>
                                        <EmptyState
                                            icon={FiHome}
                                            title="No Apartments Found"
                                            description="We couldn't find any apartments matching your search criteria. Try adjusting your filters or search terms."
                                            actionLabel="Clear Filters"
                                            action={() => {
                                                setSearchQuery('');
                                                setBedrooms(0);
                                                setBathrooms(0);
                                                setCity({ state: '', lga: '' });
                                                setSelectedPriceRange('');
                                            }}
                                        />
                                    </div>
                                )}


                            </div>
                        </div>

                        {(auth.user.type === 'learner' && newApartments.length > 0) && (
                            <div className="bg-white sm:rounded-lg w-full mt-6">
                            <div className='mb-3 bg-gray-200 rounded p-4'>
                                <p className='font-bold'>Available Apartments</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 items-center w-full h-full flex-wrap overflow-hidden">
                                {newApartments.map((course, i) => (
                                    <div key={i} className='flex flex-col justify-center border-4 border-gray-200 w-full p-4 text-center rounded-lg h-100'>
                                        <div className='flex flex-row gap-3 items-center justify-between font-bold text-sm'>
                                            <p className='text-xl text-start'>{course.title}</p>
                                        </div>
                                        <div className='flex flex-row gap-3 items-center'>
                                            <p className='text-sm truncate text-start w-3/4'>
                                                {parse(course.description)}
                                            </p>
                                            <a href='#' className='p-2 bg-gray-300 rounded'>Enroll Now</a>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>
                        )}

                    </div>
                </div>
            </div>

    </AuthenticatedLayout>
  )
}

export default Apartments
