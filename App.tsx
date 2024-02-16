import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';

export default function App() {
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice(cameraPosition, {
    physicalDevices: ['wide-angle-camera'],
  });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
  }, []);

  if (!hasPermission) {
    return <ActivityIndicator />;
  }

  if (!device) {
    return <Text>Camera device not found</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={styles.camera} device={device} isActive={true} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onFlipCameraPressed}>
          <Text style={styles.buttonText}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#89bef0',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
