import storage from '@react-native-firebase/storage';

export const UploadImage = async (storagePath, localPath, imageUpload) => {
    const reference = storage().ref(`${storagePath}/${localPath}`)
    const task = reference.putFile(imageUpload);
    try {
        await task;
        const url = await reference.getDownloadURL();
        return url;
    } catch (error) {

    }
}