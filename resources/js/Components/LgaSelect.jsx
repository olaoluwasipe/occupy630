import React, { useState } from 'react'
import SelectInput from './SelectInput'
import lgaList from '@/lga'

const LgaSelect = ({ direction = 'col', onChange}) => {
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
    <div className={`flex flex-${direction} gap-2`}>
        <SelectInput
            onChange={handleStateChange}
            value={conState}
        >
            <option value="">Select State</option>
            {state}
        </SelectInput>

        {conState && (
            <SelectInput
                onChange={handleLgaChange}
                value={conLga}
            >
                <option value="">Select LGA</option>
                {lgas}
            </SelectInput>
        )}

    </div>
  )
}

export default LgaSelect
