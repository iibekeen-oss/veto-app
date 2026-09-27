// مثال مبسط في React Native / App.tsx
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import VetoInterceptorDesign from './components/VetoInterceptorDesign'; // ملف الكود البصري

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      {/* عرض التصميم البصري ككود */}
      <VetoInterceptorDesign style={StyleSheet.absoluteFill} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
