import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <h1 className='text-4xl text-bold'>Forgot Your Password?</h1>
            <div className="mb-4 text-sm text-gray-600">
                Enter your email to receive password reset instructions
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <p className='w-full text-start'>Email Address</p>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="w-full justify-center capitalize" disabled={processing}>
                        Send Reset Instructions
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
