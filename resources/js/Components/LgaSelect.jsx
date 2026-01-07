import React, { useEffect, useState } from 'react'
import SelectInput from './SelectInput'
import lgaList from '@/lga'

const LgaSelect = ({ direction = 'col', onChange, className, location, ...props }) => {
    const [lga, setLga] = useState(lgaList.filter((lga) => lga.state === location?.state)[0]);
    const [conLga, setConLga] = useState(location?.city);
    const [conState, setConState] = useState(location?.state);

    // Sort states alphabetically and map them to <option> elements
    const stateOptions = lgaList
        .sort((a, b) => a.state.localeCompare(b.state)) // Sort states alphabetically
        .map((lga, index) => (
            <option key={index} value={lga.state}>
                {lga.state}
            </option>
    ));

    useEffect(() => {
        console.log(location)
        if (location) {
            setConState(location.state);
            setLga(lgaList.find((lga) => lga.state === location.state));
            setConLga(location.city);
        }
    }, [location]);

    // Function to handle state changes
    const handleStateChange = (e) => {
        setConState(e.target.value);
        setConLga('');
        setLga(lgaList.find((lga) => lga.state === e.target.value)); // Use `find` instead of `filter` for a single match
    };

    // Function to handle LGA changes
    const handleLgaChange = (e) => {
        setConLga(e.target.value);
        onChange({
            state: conState,
            lga: e.target.value,
        });
    };

    // Sort LGAs alphabetically and map them to <option> elements
    const lgaOptions = lga?.lgas
        ?.sort((a, b) => a.localeCompare(b)) // Sort LGAs alphabetically
        .map((lga, index) => (
            <option key={index} value={lga}>
                {lga}
            </option>
    ));


  return (
    <div className={`flex flex-${direction} gap-2 flex-1`}>
        <SelectInput
            onChange={handleStateChange}
            value={conState}
            {...props}
            className={className}
        >
            <option value="">Select State</option>
            {stateOptions}
        </SelectInput>

        {conState && (
            <SelectInput
                onChange={handleLgaChange}
                value={conLga}
                className={className}
                {...props}
            >
                <option value="">Select LGA</option>
                {lgaOptions}
            </SelectInput>
        )}

    </div>
  )
}

export default LgaSelect
