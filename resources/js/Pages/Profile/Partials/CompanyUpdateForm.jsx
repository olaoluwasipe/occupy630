
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import ImageInput from '@/Components/ImageInput';
import EditorComponent from '@/Components/Editor';
import PhoneInput from 'react-phone-input-2';
// import parser

export default function CompanyUpdateForm({ className = '', company }) {
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const { data, setData, post, errors, processing } = useForm({
        logo: company.logo ?? '',
        name: company.name ?? '',
        address: company.address ?? '',
        description: company.description ?? '',
        phone: company.phone ?? '',
        website: company.website ?? '',
        email: company.email ?? '',
    });

    const handleFileChange = (newFiles) => {
        console.log(data)
        setData('logo', newFiles[0]);
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

        post(route('company.update'), {
            preserveScroll: true,
            onSuccess: () => setRecentlySuccessful(true),
            onFinish: () => {
                setTimeout(() => setRecentlySuccessful(false), 2000);
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Company Information</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Update your company's information and contact details.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <ImageInput onFileChange={handleFileChange} preselected={company?.logo} />
                <div>
                    <InputLabel htmlFor="name" value="Company Name" />
                    <TextInput
                        id="company_name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="address" value="Address" />
                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <EditorComponent
                        onTextChange={(text) => setData('description', text)}
                        value={data.description}
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone Number" />
                    <PhoneInput
                        // preferredCountries={'gb', 'ng', 'us'}
                        enableSearch
                        inputClass='w-full'
                        value={data.phone}
                        onChange={(phone, country) => onChangePhone(phone, country)}
                        />
                    <InputError className="mt-2" message={errors.phone} />
                </div>

                <div>
                    <InputLabel htmlFor="website" value="Website" />
                    <TextInput
                        id="website"
                        type="url"
                        className="mt-1 block w-full"
                        value={data.website}
                        onChange={(e) => setData('website', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.website} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Company Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

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
