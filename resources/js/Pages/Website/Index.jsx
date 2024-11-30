
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
// import { Container, Button, Card, Input, Select } from '@/Components';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import SecondaryButton from '@/Components/SecondaryButton';
import Container from '@/Components/Container';
import { FaLocationDot } from 'react-icons/fa6';
import formatPrice from '@/functions';
import IconTextInput from '@/Components/IconTextInput';
import LgaSelect from '@/Components/LgaSelect';
import TextInput from '@/Components/TextInput';
import { FaSearch, FaSearchDollar } from 'react-icons/fa';


const Index = ({properties}) => {

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

    const filteredApartments = properties?.filter((apartment) => {
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

  return (
    <div className="bg-white">
        {/* Nav Section */}
        <div className="flex mx-15 p-4 justify-between items-center">
            <Link>
                <img src="/images/cghomes-logo.png" alt="Logo" />
            </Link>
            <Link href='/login'>
                <PrimaryButton>Get Started</PrimaryButton>
            </Link>
        </div>

      {/* Hero Section */}
      <Container className='bg-cover text-black rounded-3xl py-20'>
        <div>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Corporate Housing Made Simple
            </h1>
            <p className="text-xl mb-8">
              Rent apartments for your employees with flexible monthly payments
            </p>
            <Link href="/register">
              <PrimaryButton variant="secondary" size="lg">
                Get Started Today
              </PrimaryButton>
            </Link>
          </div>
        </div>

        <div className='mt-10 h-96 bg-cover bg-center rounded-3xl shadow bg-[url("/images/login-bg.jpg")]'>

        </div>
      </Container>

      {/* Locations Section */}
      <Container className="py-16">
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">
            Available in Major Cities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Lagos', 'Ibadan', 'Abuja'].map((city) => (
              <div key={city} className="text-center p-6">
                <h3 className="text-xl font-semibold mb-4">{city}</h3>
                <Link href={`/apartments?location=${city}`}>
                  <PrimaryButton variant="outline">View Apartments</PrimaryButton>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Properties Section */}
      <Container containerClassName="bg-gray-50 py-16">
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">
            Find the Perfect Property
          </h2>

          {/* Filters */}
          <div className="flex items-center justify-center mb-10 gap-3">
            <div className="flex flex-col flex-1 gap-2">
                <IconTextInput
                    icon={<FaSearch size={17} />}
                    rounded="rounded-full"
                    className="border border-gray-400 bg-slate-50 h-10 rounded-md"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <SelectInput
                    onChange={handlePriceRangeChange}
                >
                    <option value="">Select Price Range</option>
                    <option value="300000">{'< 300,000'}</option>
                    <option value="300000 - 500000">{'300,000 - 500,000'}</option>
                    <option value="500000 - 1000000">{'500,000 - 1,000,000'}</option>
                    <option value="1000000">{'> 1,000,000'}</option>
                </SelectInput>
            </div>
            <LgaSelect
                onChange={handleCityChange} />
            <div className="flex flex-col flex-1 gap-2">
                <TextInput
                    type="number"
                    placeholder="bedrooms"
                    onChange={handleBedroomsChange}
                />
                <TextInput
                    type="number"
                    placeholder="bathrooms"
                    onChange={handleBathroomChange}
                />
            </div>
        </div>

          {/* Property Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredApartments.map((property) => (
              <Link key={property.id} href={`/apartment/${property.slug}`} className='action flex flex-col shadow-lg items-start h-full rounded-2xl overflow-hidden justify-center'>
                <div className="h-72 overflow-hidden course-heading flex text-white bg-gray-400 w-full flex-col gap-3">
                    <img src={`${property?.images[0]?.path}`} alt="" />
                </div>
                <div className='p-6 w-full'>
                    <div className="flex row items-center space-between gap-2">
                        <FaLocationDot color='red' />
                        <p>{property?.address}</p>
                    </div>
                    <div className="h-1/4 course-heading flex text-black w-full flex-col gap-3">
                        <h4 className='text-2xl font-bold'>{property.title}</h4>
                    </div>
                    <hr className='mt-4' />
                    <p className='text-bold mt-3'>Price:</p>
                    <p className='p-2 bg-sky-200 text-sky-800 rounded flex items-center gap-4'>

                        {formatPrice(property?.monthly_price) } / month
                    </p>
                </div>
            </Link>
            ))}
          </div>
        </div>
      </Container>

      {/* Testimonials Section */}
      <Container className="py-16">
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Smith',
                company: 'Tech Corp',
                text: 'Finding housing for our employees has never been easier.'
              },
              {
                name: 'Sarah Johnson',
                company: 'StartUp Inc',
                text: 'The monthly payment option has been a game-changer for our business.'
              },
              {
                name: 'Mike Wilson',
                company: 'Global Solutions',
                text: 'Excellent service and beautiful properties. Highly recommended!'
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <Link href="/register">
              <SecondaryButton variant="secondary" size="lg">
                Create Your Account
              </SecondaryButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Section */}
            <footer className="bg-gray-100 py-8">
              <Container>
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src="/images/cghomes-logo.png"
                    alt="CGHomes Logo"
                    className="h-12"
                  />
                  <div className="text-center text-gray-600">
                    <p>© {new Date().getFullYear()} CGHomes LTD. All rights reserved.</p>
                    <p className="mt-2">
                      Made by{' '}
                      <a
                        href="https://notearthservices.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Not Earth Services
                      </a>
                    </p>
                    <p className="mt-2">
                      <a
                        href="https://cghomesltd.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Visit Main Website
                      </a>
                    </p>
                  </div>
                </div>
              </Container>
            </footer>

    </div>
  );
};

export default Index;
