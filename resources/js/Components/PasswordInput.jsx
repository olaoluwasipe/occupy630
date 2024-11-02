import React, { useState } from 'react'
import TextInput from './TextInput'
import SecondaryButton from './SecondaryButton'

const PasswordInput = ({value, name = 'password', placeholder, style, onChange}) => {
    const [hidden, setHidden] = useState(true)

    // console.log(data.password)

    const togglePasswordVisibility = () => {
        setHidden(prevShowPassword => !prevShowPassword);
    };

  return (
    <div className='flex justify-space-between gap-1'>
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
        <SecondaryButton onClick={togglePasswordVisibility}>{hidden ? 'Show' : 'Hide'}</SecondaryButton>
    </div>
  )
}

export default PasswordInput
