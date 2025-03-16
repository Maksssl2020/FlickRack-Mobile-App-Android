import React, { useState } from "react";

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  return (
    <SafeAreaView className={"bg-custom-black-100 h-full w-full"}>
      <ScrollView
        contentContainerStyle={{ height: "100%" }}
        className={"w-full"}
      >
        <View
          className={
            "flex flex-col gap-4 w-full h-[85vh] justify-center items-center px-4 my-8"
          }
        >
          <View className="flex flex-row ">
            <Text className="text-custom-white-100 text-5xl font-bold">
              Flick
            </Text>
            <Text className="text-custom-violet-600 text-5xl font-bold">
              Rack
            </Text>
          </View>
          <View className={"w-full h-auto flex flex-col gap-4 mt-8"}>
            <FormField
              title={"Username"}
              value={form.username}
              textType={"password"}
              onChange={(e) => setForm({ ...form, username: e })}
            />
            <FormField
              title={"Password"}
              value={form.password}
              textType={"password"}
              onChange={(e) => setForm({ ...form, password: e })}
            />
          </View>

          <View className={"w-full h-auto flex flex-col gap-2 mt-12"}>
            <CustomButton
              title={"Sign In"}
              onPress={() => {
                router.push("/home");
              }}
            />
            <View
              className={"flex flex-row w-full gap-2 h-auto justify-center"}
            >
              <Text className={"text-custom-gray-100  text-lg"}>
                Don't have an account?
              </Text>
              <Link
                href={"/sign-up"}
                className={"text-custom-white-100 font-bold underline text-lg"}
              >
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
