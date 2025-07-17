import * as types from '../types';
import { ImageItem } from '../types'; 
import { SYNC_PENDING_UPLOADS, SyncPendingUploadsAction } from '../types';

export const addImages = (images: ImageItem[]) => ({
  type: types.ADD_IMAGES,
  payload: images,
});

export const deleteImage = (id: string) => ({
  type: types.DELETE_IMAGE,
  payload: id,
});

export const uploadImageRequest = (image: ImageItem) => ({
  type: types.UPLOAD_IMAGE_REQUEST,
  payload: image,
});

export const uploadImageSuccess = (id: string) => ({
  type: types.UPLOAD_IMAGE_SUCCESS,
  payload: id,
});

export const uploadImageFailure = (id: string) => ({
  type: types.UPLOAD_IMAGE_FAILURE,
  payload: id,
});

export const syncPendingUploads = (): SyncPendingUploadsAction => ({
  type: SYNC_PENDING_UPLOADS,
});