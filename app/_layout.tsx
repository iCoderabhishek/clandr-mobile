import Container from "@/components/Container";
import { useFrameworkReady } from "@/hooks/useFrameworkReady";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  useFrameworkReady();
  return (
    <Container>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="auth" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Container>
  );
}
