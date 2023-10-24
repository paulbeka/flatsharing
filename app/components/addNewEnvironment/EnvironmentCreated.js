import React from "react";
import { SafeAreaView, Text } from 'react-native'


const EnvironmentCreated = () => {
  return (
    <SafeAreaView style={styles.environmentCreatedPage}>
      <Text>You have created a new environment! Head back to the home page to see your environment,
        or click on the add tasks button to add tasks to the environment.
      </Text>
    </SafeAreaView>
  )
}

const styles = {
  environmentCreatedPage: {
    flex: 1,
    backgroundColor: '#bdf8ff',
    alignItems: 'center',
  }
}

export default EnvironmentCreated