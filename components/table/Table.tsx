import React, { useEffect, useState } from 'react'
import Button from '../form/button/Button'
import TableHeader from './TableHeader'
import {
    TrashIcon,
    PencilIcon,
    StarIcon,
    CloudDownloadIcon,
} from '@heroicons/react/solid'
import Popup from '../popup/Popup'
import { Dialog } from '@headlessui/react'
import { deleteProduct, getAllProducts } from '../../pages/api/products'
import { downloadImages } from '../../pages/api/image'
import Link from 'next/link'

const Table = () => {
    const [toggle, setToggle] = useState<boolean>(false)

    const [productArray, setProductArray] = useState<any>([])
    const [imageArray, setImageArray] = useState<any[]>([])
    const [imageBase64Array, setImageBase64Array] = useState<any>([])
    const [id, setId] = useState<string>('')

    const getProducts = async () => {
        await getAllProducts().then((res) => {
            setProductArray(res)
        })
    }

    const getImages = () => {
        downloadImages(imageArray).then((res) => {
            setImageBase64Array(res)
        })
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        if (productArray) {
            productArray.every(async (product: any) => {
                setImageArray((prev) => {
                    return [...prev, product.selectedImage]
                })
            })
        }
    }, [productArray])

    useEffect(() => {
        getImages()
    }, [imageArray])

    const openModal = () => {
        setToggle(!toggle)
    }

    const deleteOne = (id: string) => {
        deleteProduct(id).then(async () => {
            await getAllProducts().then((res) => {
                setProductArray(res)
                openModal()
            })
        })
    }

    return (
        <div className="px-4">
            <Popup toggle={toggle} setToggle={setToggle}>
                <div>
                    <section className="flex justify-center">
                        <img
                            alt="profil"
                            src="img/alert.svg"
                            className="object-cover rounded-full h-12 w-12"
                        />
                    </section>
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900 flex justify-center"
                    >
                        ARE YOU SURE?
                    </Dialog.Title>
                    <p className="py-5">
                        You will not be able to undo this action if you proceed!
                    </p>
                    <section className="flex space-x-2 justify-center">
                        <Button
                            label="Cancel"
                            type="outlined"
                            onClick={openModal}
                        />
                        <Button
                            label="Delete"
                            type="primary"
                            onClick={() => {
                                deleteOne(id)
                            }}
                        />
                    </section>
                </div>
            </Popup>
            <div className="py-8">
                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                    <div className="inline-block min-w-full overflow-hidden rounded-lg">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <TableHeader label="SKU" />
                                    <TableHeader label="IMAGE" />
                                    <TableHeader label="PRODUCT NAME" />
                                    <TableHeader label="PRICE" />
                                    <TableHeader />
                                </tr>
                            </thead>
                            <tbody>
                                {productArray.map(
                                    (product: any, index: number) => (
                                        <tr className="border-b">
                                            <td className="px-5">
                                                <p className="text-secondary">
                                                    #{product.SKU}
                                                </p>
                                            </td>
                                            <td className="px-5 py-6">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        {imageBase64Array.length >
                                                        0 ? (
                                                            <img
                                                                src={`data:jpeg;base64,${imageBase64Array[index]}`}
                                                                alt=""
                                                                className={`w-10 h-10 object-cover rounded-lg`}
                                                            />
                                                        ) : (
                                                            <div
                                                                className={`w-10 h-10 bg-background rounded-lg`}
                                                            >
                                                                <CloudDownloadIcon
                                                                    className={`animate-pulse`}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-sm bg-white px-5">
                                                <p className="text-text whitespace-no-wrap">
                                                    {product.Name}
                                                </p>
                                            </td>
                                            <td className="px-5">
                                                <p className="text-text whitespace-no-wrap">
                                                    $25
                                                </p>
                                            </td>
                                            <td className="text-sm flex px-5 py-6">
                                                <Button
                                                    Figure={TrashIcon}
                                                    type="none"
                                                    onClick={() => {
                                                        openModal()
                                                        setId(product._id)
                                                    }}
                                                />

                                                <Link
                                                    href={`edit-product?id=${product._id}`}
                                                >
                                                    <Button
                                                        Figure={PencilIcon}
                                                        type="none"
                                                    />
                                                </Link>
                                                <Button
                                                    Figure={StarIcon}
                                                    type="none"
                                                />
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
