import React from 'react'

const Avatar = () => {
    return (
        <div className="flex items-center space-x-4 font-bold text-lg">
            <p className="text-black">Admin</p>
            <img
                alt="profil"
                src="img/avatar.png"
                className="object-cover rounded-full h-12 w-12 bg-primary"
            />
        </div>
    )
}

export default Avatar
