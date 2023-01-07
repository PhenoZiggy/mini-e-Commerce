import Resizer from 'react-image-file-resizer'
import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL

export const uploadImage = (event: any) => {
    let file = event.target.files[0]
    const endPointURL = 'upload-image'

    return new Promise((resolve, reject) => {
        Resizer.imageFileResizer(
            file,
            1200,
            1200,
            'jpeg',
            100,
            0,
            (uri: any) => {
                let formData = new FormData()
                formData.append('file', uri)
                axios
                    .post(`${baseURL}${endPointURL}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    })
                    .then((res: any) => {
                        resolve(res.data.result)
                    })
                    .catch((err: any) => {
                        reject(err)
                    })
            },
            'file'
        )
    })
}

export const downloadImages = async (idList: any) => {
    let images: string[] = []
    const endPointURL = '/get-uploaded-Image/'
    await axios
        .all(
            idList.map((singleId: any) =>
                axios.get(`${baseURL}${endPointURL}`, {
                    params: {
                        imageId: singleId,
                    },
                })
            )
        )
        .then(
            axios.spread((...res) => {
                res.map((singleRes: any) => {
                    images.push(
                        Buffer.from(singleRes.data.result.image.data).toString(
                            'base64'
                        )
                    )
                })
            })
        )
        .catch((err) => {
            console.log(err)
        })
    return images
}
