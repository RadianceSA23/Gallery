import * as types from '../types';
import type { ImageItem, UploadAction } from '../types';

type UploadState = {
  images: ImageItem[];
};

const initialState: UploadState = {
  images: [],
};

function uploadReducer(state: UploadState = initialState, action: UploadAction): UploadState {
  switch (action.type) {
    case types.ADD_IMAGES: {
      const newImages = action.payload;
      return {
        ...state,
        images: [...state.images, ...newImages],
      };
    }

    case types.DELETE_IMAGE: {
      const idToRemove = action.payload;
      return {
        ...state,
        images: state.images.filter((img) => img.id !== idToRemove),
      };
    }

    case types.UPLOAD_IMAGE_SUCCESS: {
      const uploadedId = action.payload;
      return {
        ...state,
        images: state.images.map((img) =>
          img.id === uploadedId ? { ...img, status: 'uploaded' } : img
        ),
      };
    }

    case types.UPLOAD_IMAGE_FAILURE: {
      const failedId = action.payload;
      return {
        ...state,
        images: state.images.map((img) =>
          img.id === failedId ? { ...img, status: 'failed' } : img
        ),
      };
    }

    default:
      return state;
  }
}

export default uploadReducer;
