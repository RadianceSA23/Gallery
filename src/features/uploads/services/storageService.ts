import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageItem } from '../types';

const QUEUE_KEY = 'upload_queue';

export const getUploadQueue = async (): Promise<ImageItem[]> => {
  const data = await AsyncStorage.getItem(QUEUE_KEY);
  return data ? JSON.parse(data) as ImageItem[] : [];
};

export const removeFromQueue = async (id: string): Promise<void> => {
  const queue = await getUploadQueue();
  const updated = queue.filter((item: ImageItem) => item.id !== id);
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(updated));
};