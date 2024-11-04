import React, { useState } from 'react'
import SelectInput from './SelectInput'
import lgaList from '@/lga'

const LgaSelect = ({ direction = 'col', onChange, className, ...props }) => {
    const [lga, setLga] = useState([]);
    const [conLga, setConLga] = useState('');
    const [conState, setConState] = useState('');

    const state = lgaList.map((lga, index) => {
        return (
            <option key={index} value={lga.state}>{lga.state}</option>
        )
    })

    const handleStateChange = (e) => {
        setConState(e.target.value)
        setConLga('')
        setLga(lgaList.filter((lga) => lga.state === e.target.value)[0])
    }

    const handleLgaChange = (e) => {
        setConLga(e.target.value)
        onChange({
            state: conState,
            lga: e.target.value
        })
    }

    const lgas = lga?.lgas?.map((lga, index) => {
        return (
            <option key={index} value={lga}>{lga}</option>
        )
    })

  return (
    <div className={`flex flex-${direction} gap-2 flex-1`}>
        <SelectInput
            onChange={handleStateChange}
            value={conState}
            {...props}
            className={className}
        >
            <option value="">Select State</option>
            {state}
        </SelectInput>

        {conState && (
            <SelectInput
                onChange={handleLgaChange}
                value={conLga}
                className={className}
                {...props}
            >
                <option value="">Select LGA</option>
                {lgas}
            </SelectInput>
        )}

    </div>
  )
}

export default LgaSelect
