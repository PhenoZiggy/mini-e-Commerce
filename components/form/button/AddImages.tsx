import React from 'react'
import { uploadImage } from '../../../pages/api/image'

const AddImages = ({ handleImageArray, label }: any) => {
    return (
        <div>
            <label
                htmlFor="file-upload"
                className="ml-2 relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none whitespace-nowrap"
            >
                <span>{label}</span>
                <input
                    onChange={async (event) => {
                        await uploadImage(event).then((res: any) => {
                            handleImageArray(res)
                        })
                    }}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                />
            </label>
        </div>
    )
}

export default AddImages
