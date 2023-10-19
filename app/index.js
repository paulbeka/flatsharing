import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Button
} from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { SIZES } from '../constants/themes.js'

const App = () => {
  const router = useRouter();

  return (
    <SafeAreaView  style={styles.app}>
      <Stack.Screen 
        options={{
          title: 'Flatsharing',
          headerStyle: styles.header
        }}
        style={styles.navbar}
      />
      <ScrollView showVerticalScrollIndicator={false}>
        <View style={{
          flex: 1,
          padding: SIZES.medium 
        }}>
          <Text>Welcome to the flatmates sharing app!</Text>
          <Button title={"Get Started!"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  app: {
    backgroundColor: '#bdf8ff',
    flex: 1,
    paddingTop: 40,
  },
  header: {
    position: 'absolute',
    top: Dimensions.get('window').height - 60,
    left: 0,
    right: 0,
    height: 60,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App