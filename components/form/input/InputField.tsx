import React from 'react'

const InputField = ({ title, value, setValue, type }: any) => {
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
            />
        </div>
    )
}

export default InputField
