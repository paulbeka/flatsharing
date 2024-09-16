import { Slot } from 'expo-router';
import { EnvironmentsProvider } from './store/EnvironmentsContext';
import { StatusBar } from 'react-native';
import {
  View, StyleSheet
} from 'react-native';


export default function Layout() {
  return (
    <EnvironmentsProvider>
      <View style={styles.mainContainer}>
        <Slot />        
      </View>
    </EnvironmentsProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: StatusBar.currentHeight,
    height: '100%',
  }
});