import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import React, { useState, useRef, useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react';
import EditorComponent from '@/Components/Editor';
import PrimaryButton from '@/Components/PrimaryButton';
import StepWizard from "react-step-wizard";
import MultipleImageInput from '@/Components/MultipleImageInput';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from '@/Components/SelectInput';
import LgaSelect from '@/Components/LgaSelect';
import Checkbox from '@/Components/Checkbox';

const ApartmentAddForm = ({ categories, attributes, apartment }) => {
    console.log(apartment)
    attributes = ['parking', 'wifi', 'tv', 'ac', 'gym', 'pool', 'laundry', 'security']
    const { data, setData, post, processing, errors, reset } = useForm({
        title: apartment?.title,
        description: apartment?.description,
        attachments: apartment?.images,
        address: apartment?.address,
        price: apartment?.price,
        category: apartment?.category_id,
        location: {state: apartment?.state, city: apartment?.lga},
        // city: '',
        bathrooms: apartment?.bathrooms,
        bedrooms: apartment?.bedrooms,
        amenities: apartment?.amenities,
        availability: apartment?.availability,
        // cohort_id: cohort
    });
    const wizardRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [lastStep, setLastStep] = useState(1);

    const handleAmenitiesChange = (e) => {
        const { value, checked } = e.target;

        setData((prevData) => ({
            ...prevData,
            amenities: checked
                ? [...prevData.amenities, value]
                : prevData.amenities.filter((amenity) => amenity !== value),
        }));

        console.log(data.amenities)
    };

    useEffect(() => {
        // Set last step count after the wizard ref initializes
        if (wizardRef.current) {
            setLastStep(wizardRef.current.state.totalSteps);
            setCurrentStep(wizardRef.current.state.activeStep);
        }
    }, [wizardRef.current]);

    const handleNext = (e) => {
        e.preventDefault()
        console.log(currentStep, wizardRef.current.state.classes.length)
        wizardRef.current.nextStep();
    };
    const handlePrev = (e) => {
        e.preventDefault()
        wizardRef.current.previousStep();
    };

    const goToStep = (step) => {
        wizardRef.current.goToStep(step);
    };

  const handleTitleChange = (e) => {
    setData('title', e.target.value)
  }

  const handleDescriptionChange = (content) => {
    setData('description', content)
  }

  const handleImagesChange = (files) => {
    setData('attachments', files)
    console.log(files);
  }

  const handlePriceChange = (e) => {
    var price = e.target.value

    // Remove any non-numeric characters except decimal point
    price = price.replace(/[^\d]/g, '');

    // Convert to number and format
    if (price) {
      const numericPrice = parseInt(price, 10);
      e.target.value = formatPrice(numericPrice);
      setData('price', numericPrice);
    } else {
      e.target.value = '';
      setData('price', '');
    }
  }

  const formatPrice = (price) => {
      if (!price) return '';
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    }


  const handleStateChange = (location) => {
    console.log(location)
    setData('location', location)
    console.log(location.state);
    // setData('dueDate', e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Reset form data
    if(apartment?.id) {
        post(route('apartment.update', apartment.id))
    } else {
        post(route('apartment.store'))
    }
  }

  return (
    <form onSubmit={handleSubmit}>

        <div>
            <MultipleImageInput title={`Images`} preselected={data.attachments} onFileChange={handleImagesChange} />

            <InputError message={errors?.attachments} className='mt-2' />
        </div>
        <div className='mt-3'>
            <InputLabel htmlFor="title" value="Apartment Title" />
            <TextInput
                id="title"
                type="text"
                name="title"
                placeholder="Apartment Title"
                value={data.title}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={handleTitleChange}
            />

            <InputError message={errors?.title} className='mt-2' />
        </div>
        {/* </StepWizard> */}
      <div className='mt-3'>
        <InputLabel htmlFor="description" value="Apartment Description" />
        <EditorComponent value={data.description} onTextChange={handleDescriptionChange} />

        <InputError message={errors?.description} className='mt-2' />
      </div>
      <div className='flex flex-row items-center gap-3 mt-3'>
        <div className='mt-3 w-1/2'>
            <InputLabel htmlFor="price" value="Rent" />
            <TextInput
                id="price"
                type="text"
                name="price"
                multiple
                placeholder="Rent"
                value={data.price}
                className="mt-1 block w-full"
                onChange={handlePriceChange}
            />

            <InputError message={errors?.title} className='mt-2' />
        </div>
        <div className='mt-3 w-1/2'>
            <InputLabel htmlFor="dueDate" value="Category" />
            <SelectInput
                id="category"
                name="category"
                value={data.category}
                className="mt-1 block w-full"
                onChange={(e) => setData('category', e.target.value)}
                required
            >
                <option value="">Select Category</option>
                <option value="1">Test Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name} {/* Display the category name here */}
                    </option>
                ))}
            </SelectInput>

            <InputError message={errors?.dueDate} className='mt-2' />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="mt-3 w-1/2">
            <InputLabel htmlFor="address" value="Address" />

            <TextInput
                id="address"
                type="text"
                name="address"
                value={data.address}
                className="mt-1 block w-full"
                onChange={(e) => setData('address', e.target.value)}
                required
                placeholder="Address"
            />

            <InputError message={errors?.category} className='mt-2' />
        </div>

        <div className="mt-3 w-1/2 flex flex-row items-center gap-3">
            <div>
                <InputLabel htmlFor="state" value="State" />

                <LgaSelect
                    direction='row'
                    className='w-full block'
                    location={data.location}
                    onChange={handleStateChange}
                />

                <InputError message={errors?.location?.state} className='mt-2' />
                <InputError message={errors?.location?.lga} className='mt-2' />
            </div>
        </div>
      </div>

      <div className='mt-3'>
        <hr></hr>
        <h3 className='font-semibold'>Apartment Features</h3>
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 w-1/2">
                <div className="mt-3 flex-1">
                    <InputLabel htmlFor="bedrooms" value="No. of Bedrooms" />

                    <TextInput
                        id="bedrooms"
                        type="number"
                        name="bedrooms"
                        value={data.bedrooms}
                        className='mt-1 block w-full'
                        onChange={(e) => setData('bedrooms', e.target.value)}
                        required
                        placeholder="Bedrooms"
                    />

                    <InputError message={errors?.bedrooms} className='mt-2' />
                </div>

                <div className="mt-3 flex-1">
                    <InputLabel htmlFor="bathrooms" value="No. of Bathrooms" />

                    <TextInput
                        id="bathrooms"
                        type="number"
                        name="bathrooms"
                        value={data.bathrooms}
                        className='mt-1 block w-full'
                        onChange={(e) => setData('bathrooms', e.target.value)}
                        required
                        placeholder="Bathrooms"
                    />

                    <InputError message={errors?.bathrooms} className='mt-2' />
                </div>
            </div>

            <div className="mt-3 w-1/2">
                <InputLabel htmlFor="availability" value="Availability" />

                <SelectInput className='mt-1 block w-full' id="availability" name="availability" value={data.availability} onChange={(e) => setData('availability', e.target.value)}>
                    <option value="">Select Availability</option>
                    <option value="available">Available</option>
                    <option value="unavailable">Not Available</option>
                </SelectInput>

                <InputError message={errors?.availability} className='mt-2' />
            </div>
        </div>
      </div>

      <div className="mt-3">
        <hr></hr>
        <h3 className='font-semibold'>Apartment Amenities</h3>
        <div className="flex items-center gap-3">
            {attributes.map((amenity, index) => (
                <div key={index} className="mt-3 w-1/4 flex gap-2 items-center">
                    <Checkbox
                        id={amenity}
                        name={amenity}
                        checked={data.amenities?.includes(amenity)}
                        value={amenity}
                        onChange={handleAmenitiesChange}
                    />
                    <InputLabel htmlFor={amenity} value={amenity} />
                </div>
            ))}
        </div>
      </div>

        <div className='mt-3 gap-3'>
            <PrimaryButton onclick={handleSubmit} className='mt-5 w-full flex items-center justify-c enter gap-3' processing={processing} >
                Submit Apartment
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.5 13C0.5 16.3152 1.81696 19.4946 4.16117 21.8388C6.50537 24.183 9.68479 25.5 13 25.5C16.3152 25.5 19.4946 24.183 21.8388 21.8388C24.183 19.4946 25.5 16.3152 25.5 13C25.5 9.68479 24.183 6.50537 21.8388 4.16117C19.4946 1.81696 16.3152 0.5 13 0.5C9.68479 0.5 6.50537 1.81696 4.16117 4.16117C1.81696 6.50537 0.5 9.68479 0.5 13ZM14.8848 7.09668L19.7627 12.3262C19.9336 12.5117 20.0312 12.751 20.0312 13C20.0312 13.249 19.9336 13.4932 19.7627 13.6738L14.8848 18.9033C14.6797 19.123 14.3916 19.25 14.0889 19.25C13.4883 19.25 13 18.7617 13 18.1611V15.3438H8.3125C7.44824 15.3438 6.75 14.6455 6.75 13.7812V12.2188C6.75 11.3545 7.44824 10.6562 8.3125 10.6562H13V7.83887C13 7.23828 13.4883 6.75 14.0889 6.75C14.3916 6.75 14.6797 6.87695 14.8848 7.09668Z" fill="white"/>
                </svg>

            </PrimaryButton>
        </div>
    </form>
  )
}

export default ApartmentAddForm
