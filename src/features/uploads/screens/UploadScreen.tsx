import React from 'react';
import {
  SafeAreaView,
  View,
  Button,
  Platform,
  StatusBar,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useImageUploader } from '../hooks/useImageUploader';
import ImageGrid from '../components/ImageGrid';

const UploadScreen = () => {
  const { images, pickAndAddImages, removeImage } = useImageUploader();

  const handlePick = async () => {
    const picked = await ImagePicker.openPicker({ multiple: true });
    pickAndAddImages(picked);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        }}
      >
        <Button title="Pick Images" onPress={handlePick} />
        <ImageGrid images={images} onDelete={removeImage} />
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;
