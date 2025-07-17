import { useDispatch, useSelector } from 'react-redux';
import { addImages, deleteImage, uploadImageRequest } from '../redux/actions';
import uuid from 'react-native-uuid';
import { RootState } from '../../../app/store';

export const useImageUploader = () => {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.upload.images);

  const pickAndAddImages = (pickedFiles: Array<any>) => {
    const imgs = pickedFiles.map(img => ({
      id: uuid.v4() as string,
      uri: img.path,
      name: img.filename || `IMG_${Date.now()}.jpg`,
      type: img.mime,
      status: 'pending' as const,
    }));
    dispatch(addImages(imgs));
    imgs.forEach(img => dispatch(uploadImageRequest(img)));
  };

  const removeImage = (id: string) => dispatch(deleteImage(id));

  return { images, pickAndAddImages, removeImage };
};