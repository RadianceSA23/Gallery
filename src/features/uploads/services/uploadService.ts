
import { ImageItem } from '../types';
import { Image } from 'react-native-compressor';

export const getPresignedUrl = async (filename: string): Promise<string> => {
  const response = await fetch(`http://192.168.0.100:3000/presigned-url?filename=${filename}`);
  const data = await response.json();
  return data.url;
};

export const uploadToS3 = async (image: ImageItem, presignedUrl: string): Promise<void> => {
  const compressedPath = await Image.compress(image.uri, {
    compressionMethod: 'auto',
    quality: 0.7,
  });

  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': image.type,
    },
    body: await uriToBlob(compressedPath),
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }
};

const uriToBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};