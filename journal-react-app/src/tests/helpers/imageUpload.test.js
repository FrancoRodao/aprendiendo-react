import { v2 as cloudinary } from "cloudinary";
import { imageUploadToCloudinary } from "../../helpers/imageUpload"

cloudinary.config({
    cloud_name: 'dmj47inei',
    api_key: '458977374847192',
    api_secret: 'EjV-ehemh74JFbKyOZEXlzyBOiU',
})

describe('imageUpload tests', () => {

    test('should upload image to cloudinary', async () => {
        const response = await fetch('https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg')
        const blob = await response.blob()

        const image = new File([blob], 'photo.png')
        const imageUrl = await imageUploadToCloudinary(image)

        expect(typeof imageUrl).toBe('string')

        //extract cloudinary image id and delete
        const segments = imageUrl.split('/')
        const cloudinaryImageId = segments[segments.length - 1].replace('.jpg', '')

        return new Promise((resolve) => {
            cloudinary.api.delete_resources([`react-jorunal/${cloudinaryImageId}`], () => {
                resolve()
            })
        })

    })
    
    test('should simulate a error and return null', async () => {
        const image = new File([], 'photo.png')
        const imageUrl = await imageUploadToCloudinary(image)

        expect(imageUrl).toBe(null)
    })
    

})
