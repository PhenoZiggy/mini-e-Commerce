import type { NextPage } from 'next'
import Button from '../../components/form/button/Button'
import PageLayout from '../../layouts/PageLayout'
import InputField from '../../components/form/input/InputField'
import TextArea from '../../components/form/input/TextArea'

const Home: NextPage = () => {
    const subItems: string[] = ['Edit product']
    return (
        <PageLayout title="Products" subItems={subItems}>
            <section className="py-8 space-y-9">
                <div className="w-1/2 space-y-9">
                    <InputField title="SKU" />
                </div>
                <div className="grid grid-cols-2">
                    <InputField title="Name" />
                    <div className="px-16">
                        <InputField title="QTY" />
                    </div>
                </div>
                <div>
                    <TextArea
                        title="Product Description"
                        subTitle="A small description about the product"
                    />
                </div>
                <section className="flex">
                    <div>
                        <p>Product Images</p>
                        <p className="w-1/2">
                            JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                        </p>
                    </div>
                    <div className="px-1">
                        <img
                            alt="profil"
                            src="img/avatars.png"
                            className="object-cover rounded-sm h-12 bg-primary"
                        />
                    </div>
                    <p className="whitespace-nowrap text-primary underline text-lg font-medium cursor-pointer">
                        Edit Images
                    </p>
                </section>
                <section className="flex justify-end">
                    <Button label="Save changes" type="primary" />
                </section>
            </section>
        </PageLayout>
    )
}

export default Home
