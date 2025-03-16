import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const _AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name={"sign-in"}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={"sign-up"}
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor={"#141414"} style={"light"} />
    </>
  );
};

export default _AuthLayout;
