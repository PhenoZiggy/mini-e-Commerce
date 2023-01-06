import React, { useState } from 'react'
import Button from '../form/button/Button'
import TableHeader from './TableHeader'
import { TrashIcon, PencilIcon, StarIcon } from '@heroicons/react/solid'
import Popup from '../popup/Popup'
import { Dialog } from '@headlessui/react'

const Table = () => {
    const [toggle, setToggle] = useState<boolean>(false)
    const openModal = () => {
        setToggle(!toggle)
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
                    <p>
                        You will not be able to undo this action if you proceed!
                    </p>
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
                                <tr className="border-b">
                                    <td className="px-5">
                                        <p className="text-secondary">#CA25</p>
                                    </td>
                                    <td className="px-5">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    alt="profil"
                                                    src="/images/person/8.jpg"
                                                    className="mx-auto object-cover rounded-full h-10 w-10 "
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-sm bg-white px-5">
                                        <p className="text-text whitespace-no-wrap">
                                            Product-name
                                        </p>
                                    </td>
                                    <td className="px-5">
                                        <p className="text-text whitespace-no-wrap">
                                            $25
                                        </p>
                                    </td>
                                    <td className="text-sm flex px-5">
                                        <Button
                                            Figure={TrashIcon}
                                            type="none"
                                            onClick={() => {
                                                openModal()
                                            }}
                                        />
                                        <Button
                                            Figure={PencilIcon}
                                            type="none"
                                        />
                                        <Button Figure={StarIcon} type="none" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table
