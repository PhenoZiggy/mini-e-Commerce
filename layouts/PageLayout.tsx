import React from 'react'
import Avatar from '../components/avatar/Avatar'
import BreadCrumb from '../components/navigation/BreadCrumb'

const PageLayout = ({ children, title, subItems }: any) => {
    return (
        <div className="bg-white h-screen py-8 px-24">
            <section>
                <section className="flex justify-end">
                    <Avatar />
                </section>
                <section className="flex items-end space-x-3">
                    <h3 className="text-black font-black text-4xl">{title}</h3>
                    {subItems &&
                        subItems.map((item: string, idx: number) => (
                            <p
                                key={idx}
                                className="flex items-center text-primary font-bold"
                            >
                                <BreadCrumb />
                                {item}
                            </p>
                        ))}
                </section>
            </section>
            <section>{children}</section>
        </div>
    )
}

export default PageLayout
