import React from 'react'
import IInputField from './IInputField'

const InputField = ({
    title,
    value,
    setValue,
    required = false,
}: IInputField) => {
    return (
        <div className="flex space-x-4 items-center">
            <p className="font-medium text-lg text-text">{title}</p>
            <input
                className="py-1 bg-background border-none outline-none px-3 w-full"
                value={value}
                onChange={(e: any) => {
                    setValue(e.target.value)
                }}
                type="text"
                required={required}
            />
        </div>
    )
}

export default InputField
