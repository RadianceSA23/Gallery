import React from 'react';
import {
  SafeAreaView,
  View,
  Button,
  Platform,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';


import { useImageUploader } from '../hooks/useImageUploader';
import ImageGrid from '../components/ImageGrid';
import { syncPendingUploads } from '../redux/actions';
import type { AppDispatch } from '../../../app/store';

const UploadScreen = () => {
  const { images, pickAndAddImages, removeImage } = useImageUploader();
  const dispatch = useDispatch<AppDispatch>();


  const handlePick = async () => {
    const picked = await ImagePicker.openPicker({ multiple: true });
    pickAndAddImages(picked);
  };

  const handleRetryFailed = () => {
    dispatch(syncPendingUploads());
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
          <Button title="Pick Images" onPress={handlePick} />
          <Button title="Upload Files" onPress={handleRetryFailed} />
        </View>
        <ImageGrid images={images} onDelete={removeImage} />
      </View>
    </SafeAreaView>
  );
  
};

export default UploadScreen;