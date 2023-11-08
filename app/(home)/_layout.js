import { Slot, Tabs } from 'expo-router'
import NavBar from '../components/Navigation/NavBar';


const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="HomePage"
        options={{
          showHeader: false
        }}
      />
    </Tabs>
  )
}

export default Layout