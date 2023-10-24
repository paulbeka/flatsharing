import { Stack } from 'expo-router'
import { EnvironmentsProvider } from './store/EnvironmentsContext'
 
const Layout = () => {
  return (
    <EnvironmentsProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "darkblue",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </EnvironmentsProvider>
  )
}

export default Layout