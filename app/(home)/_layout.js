import Icon from 'react-native-vector-icons/Ionicons';
import { Tabs } from 'expo-router';

const Layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="HomePage"
        options={{
          tabBarLabel: "",
          tabBarStyle: { paddingTop: 10 },
          tabBarIcon: ({ focused }) => (
            <Icon size={25} name={focused ? "home" : "home-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="ListOfTasks"
        options={{
          tabBarLabel: "",
          tabBarStyle: { paddingTop: 10 },
          tabBarIcon: ({ focused }) => (
            <Icon size={25} name={focused ? "list" : "list-outline"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarLabel: "",
          tabBarStyle: { paddingTop: 10 },
          tabBarIcon: ({ focused }) => (
            <Icon size={25} name={focused ? "settings" : "settings-outline"} />
          ),
        }}
      />
      <Tabs.Screen name="NewEnvironmentPage" options={{ href: null }} />
      <Tabs.Screen name="TaskCreationPage" options={{ href: null }} />
      <Tabs.Screen name="TemplatePage" options={{ href: null }} />
    </Tabs>
  );
}

export default Layout;
