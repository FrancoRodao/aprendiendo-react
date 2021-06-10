const imageUploadToCloudinary = async (image) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dmj47inei/image'

    const formData = new FormData()
    formData.append("upload_preset", "react-journal")
    formData.append("file", image)

    const cloudResponse = await fetch(`${cloudUrl}/upload`, {
        method: "POST",
        body: formData
    })
    if(cloudResponse.ok){
        const cloudRespJson = await cloudResponse.json()
        return cloudRespJson.secure_url
    }else{
        return null
    }
}

export {
    imageUploadToCloudinary
}