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
