import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImages = async (file: File, path: string): Promise<string> => {
    try {
        // Tạo reference với path được chỉ định
        const storageRef = ref(storage, path);
        
        // Upload file
        const snapshot = await uploadBytes(storageRef, file);
        
        // Lấy URL download
        const url = await getDownloadURL(snapshot.ref);
        
        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};