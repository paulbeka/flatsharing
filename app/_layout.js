import { Stack } from 'expo-router'
 
const Layout = () => {
  return <Stack
  screenOptions={{
    headerStyle: {
      backgroundColor: "blue",
    },
    headerTintColor: "white",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  }}
/>
}

export default Layout