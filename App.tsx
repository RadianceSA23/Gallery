import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import UploadScreen from './src/features/uploads/screens/UploadScreen';
import { store } from './src/app/store';
import { Provider } from 'react-redux';


import { syncPendingUploads } from './src/features/uploads/redux/actions';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

 
  useEffect(() => {
    store.dispatch(syncPendingUploads());
  }, []);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        store.dispatch(syncPendingUploads());
      }
    });

    return () => unsubscribe();
  }, []);

 


  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <UploadScreen />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
