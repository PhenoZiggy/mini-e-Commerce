import type { NextPage } from 'next'
import Avatar from '../components/avatar/Avatar'
import Button from '../components/form/button/Button'
import SearchField from '../components/form/input/SearchField'
import { StarIcon } from '@heroicons/react/solid'
import Table from '../components/table/Table'
import PageLayout from '../layouts/PageLayout'

const Home: NextPage = () => {
    const subItems: string[] = ['Add Items', 'Second']
    return (
        <PageLayout title="Products">
            <section className="py-8 flex justify-between">
                <div>
                    <SearchField />
                </div>
                <div className="flex">
                    <Button label="New Product" type="primary" />
                    <Button Figure={StarIcon} />
                </div>
            </section>
            <section>
                <Table />
            </section>
        </PageLayout>
    )
}

export default Home
