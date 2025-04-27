import React from "react";

import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import useLoginMutation from "@/hooks/mutations/useLoginMutation";

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login, logging } = useLoginMutation(() => {
    router.push("/home");
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
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Username is required.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  title={"Username"}
                  value={value}
                  textType={"username"}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors?.username?.message}
                />
              )}
              name={"username"}
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Password is required.",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  title={"Password"}
                  value={value}
                  textType={"password"}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors?.password?.message}
                />
              )}
              name={"password"}
            />
          </View>

          <View className={"w-full h-auto flex flex-col gap-2 mt-12"}>
            <CustomButton
              title={"Sign In"}
              onPress={handleSubmit((data) =>
                login({
                  username: data.username,
                  password: data.password,
                }),
              )}
              isLoading={logging}
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
