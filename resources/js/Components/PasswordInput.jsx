import React, { useState } from 'react'
import TextInput from './TextInput'
import SecondaryButton from './SecondaryButton'
import {FaEye, FaEyeSlash} from 'react-icons/fa'

const PasswordInput = ({value, name = 'password', placeholder, style, onChange}) => {
    const [hidden, setHidden] = useState(true)

    // console.log(data.password)

    const togglePasswordVisibility = () => {
        setHidden(prevShowPassword => !prevShowPassword);
    };

  return (
    <div className='flex justify-space-between gap-1 relative'>
        <TextInput
            id="password"
            type={hidden ? 'password' : 'text'}
            name={name}
            placeholder={placeholder}
            style={style}
            value={value}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={onChange}
            required
        />

        <div
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-10'
        >
            {hidden ? <FaEyeSlash /> : <FaEye />}
        </div>
    </div>
  )
}

export default PasswordInput
