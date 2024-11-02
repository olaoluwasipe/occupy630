import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import React, { useState, useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import phone from 'phone';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css'
import Checkbox from '@/Components/Checkbox';

const CreateUserForm = ({ modalClose, courses, cohorts, user, permissions }) => {
    // console.log(permissions)
    const [dataToSend, setDataToSend] = useState(user?.permissions || []);
    const [allChecked, setAllChecked] = useState(false);

    useEffect(() => {
        const transformedPermissions = permissions.map(permission => ({
            permission_id: permission.id,
            status: dataToSend.find(perm => permission.id === perm.id) ? true : false
        }));
        setDataToSend(transformedPermissions);
    }, [permissions])

    useEffect(() => {
        setData('permissions', dataToSend)
    }, [dataToSend])

    const updatePermissionStatus = (permissionId, newStatus) => {
        setDataToSend(prevPerms =>
            prevPerms.map(permission =>
                permission.permission_id === permissionId ? { ...permission, status: newStatus } : permission
            )
        );
        console.log(permissions)
    };

    const updateAll = (val) => {
        setAllChecked(val);
        const newStatus = val ? true : false;
        setDataToSend(prevPerms =>
            prevPerms.map(permission => ({ ...permission, status: newStatus }))
        );
    };

    const handleUpdateStatus = (id) => {
        const permission = dataToSend.find(permission => permission.permission_id === id);
        if (permission) {
            const newStatus = !permission.status;
            updatePermissionStatus(permission.permission_id, newStatus);
        }
    };

    const generatePassword = (length) => {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
        let newPassword = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            newPassword += charset.charAt(Math.floor(Math.random() * n));
        }
        return newPassword;
    }

    const handleGenerate = () => {
        const newPassword = generatePassword(12); // Change the length as needed
        setData('password', newPassword);
    }

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phoneNumber: user?.phonenumber || '',
        userType: user?.type || '',
        nationality: user?.nationality || '',
        address: user?.address || '',
        gender: user?.gender || '',
        permissions: user?.permissions || [],
        course: '',
        session: ''
    });

    const closeModal = () => {
        modalClose()
    }

    console.log(data.course, cohorts)
    const filteredCohorts = cohorts.length > 0 ? cohorts?.filter((cohort) => cohort.course_id == data.course) : cohorts

    React.useEffect(() => {
        if (recentlySuccessful) {
            reset()
            closeModal()
        }
    }, [recentlySuccessful, reset])

    const handleFullNameChange = (e) => {
        setData('name', e.target.value)
    }

    const handleEmailChange = (e) => {
        setData('email', e.target.value)
    }

    const handlePhoneNumberChange = (phoneNum, country) => {
        console.log(phoneNum, country)
        const { isValid, phoneNumber } = phone(phoneNum, {country: country.countryCode});
        console.log(isValid, phoneNumber);
        setData('phoneNumber', phoneNum);
        if (!isValid) {
            errors.phoneNumber = 'Invalid phone number';
        }else {
            errors.phoneNumber = '';
        }
    }

    const handleUserTypeChange = (e) => {
        setData('userType', e.target.value)
    }

    const handleGenderChange = (e) => {
        setData('gender', e.target.value)
    }

    const handleNationalityChange = (e) => {
        setData('nationality', e.target.value)
    }

    const handleAddressChange = (e) => {
        setData('address', e.target.value)
    }

    const handleCourseChange = (e) => {
        setData('course', e.target.value)
    }

    const handleSessionChange = (e) => {
        setData('session', e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log('Full Name:', data.name)
        console.log('Email:', data.email)
        console.log('Phone Number:', data.phoneNumber)
        console.log('User Type:', data.userType)
        console.log('Nationality:', data.nationality)
        console.log('Address:', data.address)
        console.log('Course:', data.course)
        console.log('Session:', data.session)

        if(user.name) {
            post(route('admin.update-user', user.id))
        }else {
            post(route('admin.create-user'))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputLabel htmlFor="name" value="Full Name" />
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={handleFullNameChange}
                />

                <InputError message={errors?.name} className='mt-2' />
            </div>
            <div className='flex gap-3'>
                <div className='mt-3 w-1/2'>
                    <InputLabel htmlFor="email" value="Email Address" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={handleEmailChange}
                    />

                    <InputError message={errors?.email} className='mt-2' />
                </div>
                <div className='mt-3 w-1/2'>
                    <InputLabel htmlFor="phoneNumber" value="Phone Number" />
                    <PhoneInput
                        enableSearch
                        inputClass='w-full mt-1'
                        inputStyle={{padding:"10px 14px 10px 60px"}}
                        value={data.phoneNumber}
                        onChange={(phone, country) => handlePhoneNumberChange(phone, country)}
                    />

                    <InputError message={errors?.phoneNumber} className='mt-2' />
                </div>
            </div>
            <div className='flex gap-4'>
                <div className='mt-3 w-1/3'>
                    <InputLabel htmlFor="gender" value="Gender" />
                    <select
                        id="gender"
                        name="gender"
                        value={data.gender}
                        className="mt-1 block w-full"
                        onChange={handleGenderChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>

                    <InputError message={errors?.gender} className='mt-2' />
                </div>
                <div className='mt-3 w-1/3'>
                    <InputLabel htmlFor="userType" value="User Type" />
                    <select
                        id="userType"
                        name="userType"
                        value={data.userType}
                        className="mt-1 block w-full"
                        onChange={handleUserTypeChange}
                    >
                        <option value="">Select User Type</option>
                        <option value="learner">Learner</option>
                        <option value="tutor">Tutor</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>

                    <InputError message={errors?.userType} className='mt-2' />
                </div>
                <div className='mt-3 w-1/3'>
                    <InputLabel htmlFor="nationality" value="Nationality" />
                    <TextInput
                        id="nationality"
                        type="text"
                        name="nationality"
                        placeholder="Nationality"
                        value={data.nationality}
                        className="mt-1 block w-full"
                        onChange={handleNationalityChange}
                    />

                    <InputError message={errors?.nationality} className='mt-2' />
                </div>
            </div>
            {/* <div className='mt-3 flex flex-row gap-4'>
                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <PasswordInput
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>
                <SecondaryButton
                    onClick={handleGenerate}
                >Generate Password</SecondaryButton>
            </div> */}
            <div className='mt-3'>
                <InputLabel htmlFor="address" value="Address" />
                <TextInput
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={data.address}
                    className="mt-1 block w-full"
                    onChange={handleAddressChange}
                />

                <InputError message={errors?.address} className='mt-2' />
            </div>
            {(data.userType === 'learner' && user.length < 2 && courses.length > 0) && (
            <div className='flex gap-4'>
                <div className='mt-3 w-1/2'>
                    <InputLabel htmlFor="course" value="Course" />
                    <select
                        id="course"
                        name="course"
                        value={data.course}
                        className="mt-1 block w-full"
                        onChange={handleCourseChange}
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                    </select>

                    <InputError message={errors?.course} className='mt-2' />
                </div>
                <div className='mt-3 w-1/2'>
                    <InputLabel htmlFor="session" value="Session" />
                    <select
                        id="session"
                        name="session"
                        value={data.session}
                        className="mt-1 block w-full"
                        onChange={handleSessionChange}
                    >
                        <option value="">Select Session</option>
                        {filteredCohorts?.map((cohort) => (
                            <option key={cohort.id} value={cohort.id}>{cohort.name}</option>
                        ))}
                    </select>

                    <InputError message={errors?.session} className='mt-2' />
                </div>
            </div>
            )}

            {(data.userType === 'admin' && permissions.length > 0) && (
                <div className="w-full mt-5">
                    <div className='bg-gray-200 p-2 rounded w-full mb-4'>
                        <p className='font-semibold'>Permissions</p>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    <Checkbox
                                        value={allChecked}
                                        checked={allChecked}
                                        onChange={(e) => updateAll(e.target.checked)}
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((permission) => (
                                <tr key={permission.id} className="bg-white border-b">
                                    <td className="px-6 py-4">
                                        <Checkbox
                                            checked={dataToSend.find(data => data.permission_id === permission.id)?.status === true}
                                            onChange={() => handleUpdateStatus(permission.id)}
                                        />
                                    </td>
                                    <th scope="row" className="px-6 capitalize py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {permission.name}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            <PrimaryButton disabled={processing} className='mt-5 w-full flex items-center justify-center gap-3' processing={processing} >
                {user.name ? 'Update' : 'Create'} User
            </PrimaryButton>
        </form>
    )
}

export default CreateUserForm
