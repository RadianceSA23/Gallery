import { all } from 'redux-saga/effects';
import { uploadSagas } from '../features/uploads/redux/sagas';

export default function* rootSaga() {
  yield all([
    uploadSagas(),
  ]);
}