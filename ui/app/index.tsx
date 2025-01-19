import { Redirect } from 'expo-router';

export default function Index() {
  const showLogin = false;
  if (showLogin) {
    return <Redirect href="/intro" />;
  } else {
    return <Redirect href="/(tabs)" />;
  }
} 