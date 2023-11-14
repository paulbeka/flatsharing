import Icon from 'react-native-vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useEnvironmentsStore } from "../store/EnvironmentsContext";


const Layout = () => {
  const environmentsStore = useEnvironmentsStore();
  const environment = environmentsStore.getEnvironment(0);

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { paddingTop: 10 } }}>
      <Tabs.Screen
        name="HomePage"
        initialParams={{ environment: environment }} // Pass environment as initialParams
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Icon size={25} name={focused ? "home" : "home-outline"} />
          ),
        }}
      />
      {environment !== undefined ? 
      <Tabs.Screen
        name="ListOfTasks"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Icon size={25} name={focused ? "list" : "list-outline"} />
          ),
        }}
      /> : <Tabs.Screen name="ListOfTasks" options={{ href:null }}/>}
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <Icon size={25} name={focused ? "settings" : "settings-outline"} />
          ),
        }}
      />
      <Tabs.Screen name="NewEnvironmentPage" options={{ href: null }} />
      <Tabs.Screen name="TaskCreationPage" options={{ href: null }} />
      <Tabs.Screen name="TemplatePage" options={{ href: null }} />
      <Tabs.Screen name="SettingPages/AccountManagementPage" options={{ href: null }} />
      <Tabs.Screen name="QrGenerator" options={{ href: null }} />
      <Tabs.Screen name="JoinEnvironmentPage" options={{ href: null }} />
    </Tabs>
  );
}

export default Layout;
