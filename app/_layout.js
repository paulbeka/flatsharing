import { Slot } from 'expo-router';
import { EnvironmentsProvider } from './store/EnvironmentsContext'


export default function Layout() {
  return (
    <EnvironmentsProvider>
      <Slot />
    </EnvironmentsProvider>
  );
}