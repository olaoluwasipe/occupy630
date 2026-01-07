import React from 'react'

const Activities = ({activities}) => {
    function formatDate(dateString) {
        const date = new Date(dateString);
    
        // Get components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        // Convert 24-hour time to 12-hour time
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        const strTime = hours + ':' + minutes + ' ' + ampm;
    
        return `${strTime}, ${year}-${month}-${day}`;
    }
  return (
    <div className='flex flex-col gap-3'>
        <p className='font-semibold mb-4'>Activities</p>
        <div className='flex flex-col gap-3'>
            {activities.map((activity, index) => (
                <div className='flex flex-row gap-3 items-center' key={index}>
                    <div className='flex flex-row gap-3 items-center'>
                        <p className='text-gray-400'>{formatDate(activity.created_at)}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-gray-600'>{activity.data}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Activities
