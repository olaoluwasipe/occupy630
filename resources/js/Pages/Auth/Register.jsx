import { useEffect } from 'react';
import AuthLayout from '@/Layouts/AuthLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import PasswordInput from '@/Components/PasswordInput';
import SelectInput from '@/Components/SelectInput';

export default function Register(props) {
    const { data, setData, post, processing, wasSuccessful, errors, reset } = useForm({
        fname: '',
        lname: '',
        email: props.email ?? '',
        type: props.type ?? 'employer',
        code: props.code ?? null,
        password: '',
        password_confirmation: '',
    });

    wasSuccessful ? console.log(errors) : null

    useEffect(() => {
        return () => {
            setData('type', 'employer');
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <AuthLayout type='register'>
            <Head title="Register" />

            {errors.length > 0 && (
                <p className={'text-sm text-red-600 '}>
                    {errors.error}
                </p>
            )}

            <form onSubmit={submit}>
                <div className="flex items-center gap-3">
                    <div className='w-1/2'>
                        <InputLabel htmlFor="fname" value="First Name" />

                        <TextInput
                            id="fname"
                            name="fname"
                            value={data.fname}
                            className="mt-1 block w-full"
                            autoComplete="fname"
                            isFocused={true}
                            onChange={(e) => setData('fname', e.target.value)}
                            required
                        />

                        <InputError message={errors.fname} className="mt-2" />
                    </div>

                    <div className='w-1/2'>
                        <InputLabel htmlFor="lname" value="Last Name" />

                        <TextInput
                            id="lname"
                            name="lname"
                            value={data.lname}
                            className="mt-1 block w-full"
                            autoComplete="lname"
                            onChange={(e) => setData('lname', e.target.value)}
                            required
                        />

                        <InputError message={errors.lname} className="mt-2" />
                    </div>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

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

                <div className="mt-4">
                    <InputLabel htmlFor="type" value="Register As" />

                    <SelectInput
                    id="type"
                    name="type"
                    value={data.type}
                    className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                    autoComplete="type"
                    onChange={(e) => setData('type', e.target.value)}
                    required
                    >
                        <option value="employer" selected>Employer</option>
                        <option value="employee">Employee</option>
                        <option value="landlord">Property Owner</option>
                    </SelectInput>

                    <InputError message={errors.type} className="mt-2" />
                </div>

                {data.type === 'employee' && (
                    <div className="mt-4">
                        <InputLabel htmlFor="code" value="Employee Code" />

                        <TextInput
                            id="code"
                            name="code"
                            value={data.code}
                            className="mt-1 block w-full"
                            autoComplete="code"
                            onChange={(
                                e) => setData('code', e.target.value)}
                            // required={true}
                        />

                        <InputError message={errors.code} className="mt-2" />
                    </div>
                )}

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <PasswordInput
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <PasswordInput
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />


                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <Link
                    href={route('login')}
                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Already registered?
                </Link>

                <div className="flex items-center justify-end mt-4">

                    <PrimaryButton className="w-full justify-center p-6 text-xl capitalize" disabled={processing}>
                        Register
                        <img src="images/login-arrow.png" className='w-4 pl-1' />
                    </PrimaryButton>
                </div>
            </form>
        </AuthLayout>
    );
}
