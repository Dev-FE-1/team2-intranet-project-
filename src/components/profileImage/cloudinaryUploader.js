/**
 * Cloudinary 업로드 관련 함수
 */
import axios from 'axios';

export const uploadToCloudinary = async (photo) => {
  const formData = new FormData();
  formData.append('file', photo);
  console.log(formData.get('file'));
  formData.append('upload_preset', 'vvqjds26'); // Cloudinary 업로드 프리셋

  try {
    const cloudinaryResponse = await axios.post(
      'https://api.cloudinary.com/v1_1/danwktom9/image/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log('Image uploaded to Cloudinary:', cloudinaryResponse.data);
    const imageUrl = cloudinaryResponse.data.secure_url;
    // console.log(imageUrl);
    // 서버에 이미지 URL을 저장하도록 요청
    // const serverResponse = await axios.post('/api/save-image-url', { imageUrl });
    return imageUrl;
    // console.log('Image URL saved to server:', serverResponse.data);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
