import { ImageItem } from '../types';

export const getPresignedUrl = async (filename: string): Promise<string> => {
  const response = await fetch(`presigned-url?filename=${filename}`);
  const data = await response.json();
  return data.url;
};

export const uploadToS3 = async (image: ImageItem, presignedUrl: string): Promise<void> => {
  const file = {
    uri: image.uri,
    type: image.type,
    name: image.name,
  };

  const response = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': image.type,
    },
    body: await uriToBlob(image.uri),
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