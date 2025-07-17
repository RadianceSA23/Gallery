

export interface ImageItem {
    id: string;
    uri: string;
    name: string;
    type: string;
    status: 'pending' | 'uploading' | 'uploaded' | 'failed';
  }
  
  
  export const ADD_IMAGES = 'ADD_IMAGES';
  export const DELETE_IMAGE = 'DELETE_IMAGE';
  export const UPLOAD_IMAGE_REQUEST = 'UPLOAD_IMAGE_REQUEST';
  export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
  export const UPLOAD_IMAGE_FAILURE = 'UPLOAD_IMAGE_FAILURE';
  export const SYNC_PENDING_UPLOADS = 'SYNC_PENDING_UPLOADS';
  
 
  interface AddImagesAction {
    type: typeof ADD_IMAGES;
    payload: ImageItem[];
  }
  
  interface DeleteImageAction {
    type: typeof DELETE_IMAGE;
    payload: string;
  }
  
  interface UploadImageRequestAction {
    type: typeof UPLOAD_IMAGE_REQUEST;
    payload: ImageItem;
  }
  
  interface UploadImageSuccessAction {
    type: typeof UPLOAD_IMAGE_SUCCESS;
    payload: string;
  }
  
  interface UploadImageFailureAction {
    type: typeof UPLOAD_IMAGE_FAILURE;
    payload: string;
  }
  
  export interface SyncPendingUploadsAction {
    type: typeof SYNC_PENDING_UPLOADS;
  }
  
  export type UploadAction =
    | AddImagesAction
    | DeleteImageAction
    | UploadImageRequestAction
    | UploadImageSuccessAction
    | UploadImageFailureAction
    | SyncPendingUploadsAction;
  