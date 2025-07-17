import React from 'react';
import { View, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import { ImageItem } from '../types';

interface ImageGridProps {
  images: ImageItem[];
  onDelete: (id: string) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onDelete }) => (
  <FlatList
    numColumns={3}
    data={images}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
      <View style={{ margin: 5 }}>
        <Image source={{ uri: item.uri }} style={{ width: 100, height: 100 }} />
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Text style={{ color: 'red', textAlign: 'center' }}>X</Text>
        </TouchableOpacity>
      </View>
    )}
  />
);

export default ImageGrid;
