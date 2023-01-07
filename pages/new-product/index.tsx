import type { NextPage } from 'next'
import Button from '../../components/form/button/Button'
import PageLayout from '../../layouts/PageLayout'
import InputField from '../../components/form/input/InputField'
import TextArea from '../../components/form/input/TextArea'
import { useEffect, useState } from 'react'
import AddImages from '../../components/form/button/AddImages'
import { downloadImages } from '../../pages/api/image'
import { newProduct } from '../api/products'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
    const subItems: string[] = ['Add new product']
    const router = useRouter()

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

    const [error, setError] = useState<string>()

    const handleImageArray = (imageId: any) => {
        setImageArray((prev) => {
            return [...prev, imageId]
        })
        setLoading(true)
    }
    
    const handleOnSubmit = async () => {
        setError('')
        if (sku && name && qty && description && imageArray) {
            const product = {
                SKU: sku,
                Name: name,
                QTY: qty,
                Description: description,
                ImageIDs: imageArray,
                selectedImage: selectedImage ? selectedImage : imageArray[0],
            }
            await newProduct(product).then(() => {
                router.push('/')
            })
        } else {
            setError('Some fields are empty')
        }
    }

    useEffect(() => {
        downloadImages(imageArray).then((res) => {
            setImageBase64Array(res)
            setLoading(false)
        })
    }, [imageArray])

    return (
        <div>
            <PageLayout title="Products" subItems={subItems}>
                <section className="py-8 space-y-9">
                    <div className="w-1/2 space-y-9">
                        <InputField title="SKU" setValue={setSku} />
                    </div>
                    <div className="grid grid-cols-2">
                        <InputField title="Name" setValue={setName} />
                        <div className="px-16">
                            <InputField title="QTY" setValue={setQty} />
                        </div>
                    </div>
                    <div>
                        <TextArea
                            title="Product Description"
                            subTitle="A small description about the product"
                            setValue={setDescription}
                        />
                    </div>
                    <section className="flex w-1/3">
                        <div className="flex">
                            <p>Product Images</p>
                            <p className="">
                                JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                            </p>
                            <div className="flex space-x-3">
                                {imageBase64Array.map((image, index) => {
                                    return (
                                        <div key={index}>
                                            <img
                                                onClick={() => {
                                                    setSelectedImage(
                                                        imageArray[index]
                                                    )
                                                }}
                                                key={index}
                                                src={`data:jpeg;base64,${image}`}
                                                alt=""
                                                className={`object-cover rounded-sm h-12 bg-primary ${
                                                    index ===
                                                    imageArray.indexOf(
                                                        selectedImage
                                                    )
                                                        ? 'border-2 border-primary'
                                                        : ''
                                                }`}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <AddImages
                            handleImageArray={handleImageArray}
                            label="Add images"
                        />
                    </section>
                    <section className="flex justify-end">
                        <Button
                            label="Add Product"
                            type="primary"
                            onClick={handleOnSubmit}
                            disabled={loading}
                        />
                    </section>
                    <p className="text-red-500">{error}</p>
                </section>
            </PageLayout>
        </div>
    )
}

export default Home
