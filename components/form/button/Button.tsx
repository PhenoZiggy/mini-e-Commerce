import React from 'react'

const Button = ({ type, Figure, label, onClick }: any) => {
    const buttonType = () => {
        if (type == 'primary') {
            return 'bg-primary'
        } else if (type == 'secondary') {
            return 'bg-secondary'
        } else if (type == 'outlined') {
            return 'bg-white'
        } else if (type == 'none') {
            return 'bg-white'
        } else {
            return 'bg-white border-primary'
        }
    }

    return (
        <button
            onClick={onClick}
            className={`rounded-lg ${
                type == 'none' ? '' : 'p-2 border-2'
            } ${buttonType()} flex items-center space-x-2`}
        >
            {label && <p className="text-white px-11">{label}</p>}

            {Figure && (
                <div className="w-7 text-primary">
                    <Figure />
                </div>
            )}
        </button>
    )
}

export default Button
