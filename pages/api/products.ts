import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL
const endPointURL = 'products'

export const newProduct = async (product: any) => {
    await axios
        .post(`${baseURL}${endPointURL}`, { product: product })
        .then((res) => {
            res.data.success ? console.log('sucess') : console.log('error')
        })
        .catch((err) => {
            console.error(err.response.data.message)
        })
}

export const getAllProducts = async () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseURL}${endPointURL}`)
            .then((res) => {
                resolve(res.data.products)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const deleteProduct = async (productId: string) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseURL}${endPointURL}`, {
                params: { productId: productId },
            })
            .then((res) => {
                resolve(res.data.message)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const getSigleProduct = async (
    productId: string | string[] | undefined
) => {
    console.log(productId)

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseURL}${endPointURL}/single`, {
                params: { productId: productId },
            })
            .then((res) => {
                resolve(res.data.product)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export const updateProduct = async (
    id: string | string[] | undefined,
    product: any
) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${baseURL}${endPointURL}`, {
                productId: id,
                product: product,
            })
            .then((res) => {
                resolve(res.data.message)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
