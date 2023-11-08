import { Stack, Tabs } from 'expo-router';
import { EnvironmentsProvider } from './store/EnvironmentsContext'


export default function Layout() {
  return (
    <EnvironmentsProvider>
      <Stack />
    </EnvironmentsProvider>
  );
}