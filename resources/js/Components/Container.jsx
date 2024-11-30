import React from 'react'

const Container = ({ children, containerClassName, className }) => {
  return (

    <div className={`py-12 md:px-0 px-3 ${containerClassName}`}>
        <div className={`max-w-7xl mx-auto sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    </div>
  )
}

export default Container
