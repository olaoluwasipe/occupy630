import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import phone from 'phone';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import React, {useEffect, useState} from 'react';
import ImageInput from '@/Components/ImageInput';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'


export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phonenumber: user.phonenumber,
        profile_photo: user.profile_photo,
    });

    const onChangePhone = (phoneNum, country) => {
        console.log(phoneNum, country)
        const { isValid, phoneNumber } = phone(phoneNum, {country: country.countryCode});
        console.log(isValid, phoneNumber);
        setData('phonenumber', phoneNum);
        if (!isValid) {
            errors.phonenumber = 'Invalid phone number';
        }else {
            errors.phonenumber = '';
        }

        // setData('phonenumber', e.target.value)
    }

    const handleFileChange = (newFiles) => {
        console.log(data)
        setData('profile_photo', newFiles[0]);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <ImageInput onFileChange={handleFileChange} preselected={user.profile_photo} />
                <div className="flex items-center gap-3">
                    <div className='w-1/2'>
                        <InputLabel htmlFor="fname" value="First Name" />

                        <TextInput
                            id="fname"
                            className="mt-1 block w-full"
                            value={data.fname}
                            onChange={(e) => setData('fname', e.target.value)}
                            required
                            isFocused
                            autoComplete="fname"
                        />

                        <InputError className="mt-2" message={errors.fname} />
                    </div>

                    <div className='w-1/2'>
                        <InputLabel htmlFor="lname" value="Last Name" />

                        <TextInput
                            id="lname"
                            className="mt-1 block w-full"
                            value={data.lname}
                            onChange={(e) => setData('lname', e.target.value)}
                            required
                            isFocused
                            autoComplete="lname"
                        />

                        <InputError className="mt-2" message={errors.lname} />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone" />

                    <PhoneInput
                        // preferredCountries={'gb', 'ng', 'us'}
                        enableSearch
                        inputClass='w-full'
                        value={data.phonenumber}
                        onChange={(phone, country) => onChangePhone(phone, country)}
                        />

                    {/* <TextInput
                        id="phone"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.phonenumber}
                        onChange={onChangePhone}
                        required
                    /> */}

                    <InputError className="mt-2" message={errors.phonenumber} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
