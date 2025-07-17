
import { call, put, takeLatest, select, delay } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from './actions';
import { RootState } from '../../../app/store';
import { getPresignedUrl, uploadToS3 } from '../services/uploadService';
import { removeFromQueue } from '../services/storageService';
import { UploadAction, ImageItem } from '../types';

function* handleUploadImage(action: UploadAction) {
  
  if (action.type !== types.UPLOAD_IMAGE_REQUEST) return;

  const image: ImageItem = action.payload;

  try {
    const presignedUrl: string = yield call(getPresignedUrl, image.name);
    yield call(uploadToS3, image, presignedUrl);

    yield put(actions.uploadImageSuccess(image.id));
    yield call(removeFromQueue, image.id);
  } catch (error) {
    console.error('Upload failed:', error);
    yield put(actions.uploadImageFailure(image.id));
  }
}

function* syncPendingUploads() {
  const state: RootState = yield select();
  const pendingImages = state.upload.images.filter(img => img.status === 'pending');

  for (const image of pendingImages) {
    yield put(actions.uploadImageRequest(image));
    yield delay(100); 
  }
}

export function* uploadSagas() {
  yield takeLatest(types.UPLOAD_IMAGE_REQUEST, handleUploadImage);
  yield takeLatest(types.SYNC_PENDING_UPLOADS, syncPendingUploads);
}
