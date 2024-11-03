import { useEffect } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import phone from 'phone';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import { Head, Link, useForm } from '@inertiajs/react';
import ImageInput from '@/Components/ImageInput';
import EditorComponent from '@/Components/Editor';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Register({company}) {

    const { data, setData, post, processing, errors, reset } = useForm({
        logo: company.logo ?? null,
        name: company.name ?? '',
        business_number: company.business_number ?? '',
        address: company.address ?? '',
        description: company.description ?? '',
        email: company.email ?? '',
        phone: company.phone ?? '',
        url: company.url ?? '',
        website: company.website ?? '',
    });

    const handleFileChange = (newFiles) => {
        setData((prevData) => {
            const updatedData = { ...prevData, logo: newFiles[0] };
            console.log(updatedData); // Logs the updated value immediately
            return updatedData;
        });
    };

    const onChangePhone = (phoneNum, country) => {
        console.log(phoneNum, country)
        const { isValid, phoneNumber } = phone(phoneNum, {country: country.countryCode});
        console.log(isValid, phoneNumber);
        setData('phone', phoneNum);
        if (!isValid) {
            errors.phone = 'Invalid phone number';
        }else {
            errors.phone = '';
        }

        // setData('phonenumber', e.target.value)
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('company.update'));
    };

    return (
        <AuthLayout type='register-company'>
            <Head title="Register Company" />

            <form onSubmit={submit}>
                <div className="flex items-center gap-3">
                    <ImageInput
                        onFileChange={handleFileChange}
                        preselected={data.logo}
                        width={20}
                        height={20}
                        profile={false}
                    />
                    <div className='flex-1'>
                        <InputLabel htmlFor="name" value="Company Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="business_number" value="Business Number" />

                    <div className="flex items-center relative">
                        <TextInput
                            id="business_number"
                            name="business_number"
                            value={data.business_number}
                            className="mt-1 block w-full"
                            autoComplete="business_number"
                            onChange={(e) => setData('business_number', e.target.value)}
                            required
                        />
                        <div className='absolute inset-y-0 right-0 pt-1 flex items-center pr-2  cursor-pointer z-10'>
                            <SecondaryButton>Check</SecondaryButton>
                        </div>
                    </div>

                    <InputError message={errors.business_number} className="mt-2" />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor="address" value="Company Address" />

                    <TextInput
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full"
                        autoComplete="address"
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className='mt-3'>
                    <InputLabel htmlFor="description" value="Company Description" />
                    <EditorComponent value={data.description} onTextChange={(content) => setData('description', content)} />

                    <InputError message={errors?.description} className='mt-2' />
                </div>

                <div className="flex items-center gap-3">
                    <div className="mt-4 w-1/2">
                        <InputLabel htmlFor="email" value="Contact Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="mt-4 w-1/2">
                        <InputLabel htmlFor="phone" value="Contact Phone" />

                        <PhoneInput
                            enableSearch
                            inputStyle={{ padding: '8px', paddingLeft: '60px', marginTop: 5 }}
                            inputClass='w-full py-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'
                            value={data.phone}
                            onChange={(phone, country) => onChangePhone(phone, country)}
                        />

                        <InputError message={errors.phone} className="mt-2" />
                    </div>
                </div>

                <div className="flex gap-3 items-center">

                    <div className="mt-4 w-1/2">
                        <InputLabel htmlFor="url" value="Company Email Url" />

                        <TextInput
                            id="url"
                            type="text"
                            name="url"
                            value={data.url}
                            className="mt-1 block w-full"
                            autoComplete="url"
                            onChange={(e) => setData('url', e.target.value)}
                            required
                        />

                        <p className='text-xs text-gray-500'>Allow emails that look like this: john@{data.url}</p>

                        <InputError message={errors.url} className="mt-2" />
                    </div>

                    <div className="mt-4 w-1/2">
                        <InputLabel htmlFor="website" value="Company Website" />

                        <TextInput
                            id="website"
                            type="url"
                            name="website"
                            value={data.website}
                            className="mt-1 block w-full"
                            autoComplete="website"
                            onChange={(e) => setData('website', e.target.value)}
                            required
                        />

                        <InputError message={errors.website} className="mt-2" />
                    </div>
                </div>

                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="w-full justify-center p-6 text-xl capitalize" disabled={processing}>
                        Complete Registration
                        <img src="/images/login-arrow.png" className='w-4 pl-1' />
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
