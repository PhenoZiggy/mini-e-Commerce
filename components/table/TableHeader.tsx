import React from 'react'

const TableHeader = ({ label }: any) => {
    return (
        <th
            scope="col"
            className="px-5 py-3 text-sm font-bold text-left text-primary uppercase bg-white border-b border-gray-200"
        >
            {label && label}
        </th>
    )
}

export default TableHeader
