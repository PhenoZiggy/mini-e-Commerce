import React from 'react'
import ITextArea from './ITextArea'

const TextArea = ({
    title,
    subTitle,
    value,
    setValue,
    required = false,
}: ITextArea) => {
    return (
        <div className="space-y-2 items-center">
            <label className="font-medium text-lg text-text">{title}</label>
            <p className="text-gray-400 font-medium text-sm">{subTitle}</p>
            <textarea
                className="py-1 bg-background border-none outline-none px-3 w-full"
                value={value}
                onChange={(e: any) => {
                    setValue(e.target.value)
                }}
                rows={4}
                cols={50}
                required={required}
            />
        </div>
    )
}

export default TextArea
