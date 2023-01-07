import type { NextPage } from 'next'
import Button from '../../components/form/button/Button'
import PageLayout from '../../layouts/PageLayout'
import InputField from '../../components/form/input/InputField'
import TextArea from '../../components/form/input/TextArea'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getSigleProduct, updateProduct } from '../api/products'
import { downloadImages } from '../api/image'
import AddImages from '../../components/form/button/AddImages'

const Home: NextPage = () => {
    const subItems: string[] = ['Edit product']
    const router = useRouter()
    const { id } = router.query

    //form inputs
    const [sku, setSku] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [qty, setQty] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [selectedImage, setSelectedImage] = useState('')

    //image
    const [imageArray, setImageArray] = useState<any[]>([])
    const [imageBase64Array, setImageBase64Array] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!router.isReady) return

        getSigleProduct(id).then((res: any) => {
            setSku(res.SKU)
            setName(res.Name)
            setQty(res.QTY)
            setDescription(res.Description)
            setImageArray(res.ImageIDs)
            setSelectedImage(res.selectedImage)
        })
    }, [router.isReady])

    //* add image IDs to an array
    const handleImageArray = (imageId: any) => {
        setImageArray((prev) => {
            return [...prev, imageId]
        })
        setLoading(true)
    }

    //* get images from those IDs
    useEffect(() => {
        downloadImages(imageArray).then((res) => {
            setImageBase64Array(res)
            setLoading(false)
        })
    }, [imageArray])

    const handleEditProduct = async () => {
        if (sku && name && qty && description && imageArray) {
            const product = {
                SKU: sku,
                Name: name,
                QTY: qty,
                Description: description,
                ImageIDs: imageArray,
                selectedImage: selectedImage ? selectedImage : imageArray[0],
            }

            await updateProduct(id, product).then(() => {
                router.push('/')
            })
        }
    }

    return (
        <PageLayout title="Products" subItems={subItems}>
            <section className="py-8 space-y-9">
                <div className="w-1/2 space-y-9">
                    <InputField title="SKU" value={sku} setValue={setSku} />
                </div>
                <div className="grid grid-cols-2">
                    <InputField title="Name" value={name} setValue={setName} />
                    <div className="px-16">
                        <InputField
                            title="QTY"
                            value={qty}
                            setValue={setQty}
                            type="Number"
                        />
                    </div>
                </div>
                <div>
                    <TextArea
                        title="Product Description"
                        subTitle="A small description about the product"
                        value={description}
                        setValue={setDescription}
                    />
                </div>
                <section className="flex">
                    <div>
                        <p>Product Images</p>
                        <p className="w-1/2">
                            JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        {imageBase64Array.map((image, index) => {
                            return (
                                <div key={index}>
                                    <img
                                        onClick={() => {
                                            setSelectedImage(imageArray[index])
                                        }}
                                        key={index}
                                        src={`data:jpeg;base64,${image}`}
                                        alt=""
                                        className={`object-cover rounded-sm h-12 bg-primary ${
                                            index ===
                                            imageArray.indexOf(selectedImage)
                                                ? 'border-2 border-primary'
                                                : ''
                                        }`}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <AddImages
                        handleImageArray={handleImageArray}
                        label="Edit images"
                    />
                </section>
                <section className="flex justify-end">
                    <Button
                        label="Save changes"
                        type="primary"
                        disabled={loading}
                        onClick={() => {
                            handleEditProduct()
                        }}
                    />
                </section>
            </section>
        </PageLayout>
    )
}

export default Home
