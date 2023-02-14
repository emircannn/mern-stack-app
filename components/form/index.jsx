import React from 'react'

const Input = (props) => {

    const {type, errorMessage, touched, placeholder, ...inputProps} = props;

  return (
    <div className='w-full'>
        <label className='relative block cursor-text'>
            <input type={type}  className={`h-12 w-full border border-secondary/50
            outline-none rounded-full px-4 peer pt-2
            ${touched && errorMessage ? "border-yellow-400" : "border-secondary/50"}`}
             {...inputProps} />

            <span className='absolute top-0 left-0 px-4 text-sm h-full flex items-center 
            duration-300 peer-focus:h-6 peer-focus:text-xs peer-focus:text-secondary/50
            peer-valid:h-7 peer-valid:text-xs peer-valid:text-secondary/50'>{placeholder}</span>

        </label>
        { touched && <span className='text-xs text-yellow-500'>{errorMessage}</span>}
    </div>
  )
}

export default Input