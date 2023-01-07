import type { NextPage } from 'next'
import Button from '../../components/form/button/Button'
import SearchField from '../../components/form/input/SearchField'
import { StarIcon } from '@heroicons/react/solid'
import Table from '../../components/table/Table'
import PageLayout from '../../layouts/PageLayout'
import { useEffect } from 'react'
import { favouriteStore } from '../../store/store'
import FavouriteTable from '../../components/table/FavouriteTable'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
    const subItems: string[] = ['Add Items', 'Second']
    const router = useRouter()
    const routeToPage = () => {
        router.push('/new-product')
    }

    return (
        <PageLayout title="Favourite Products">
            <section className="py-8 flex justify-between">
                <div>
                    <SearchField />
                </div>
                <div className="flex">
                    <Button
                        label="New Product"
                        type="primary"
                        onClick={routeToPage}
                    />
                    <Button Figure={StarIcon} />
                </div>
            </section>
            <section>
                <FavouriteTable />
            </section>
        </PageLayout>
    )
}

export default Home
