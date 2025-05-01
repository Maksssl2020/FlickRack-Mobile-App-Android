import React, { useState } from "react";

import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import useRegisterMutation from "@/hooks/mutations/useRegisterMutation";

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register, registering } = useRegisterMutation(() => {
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
                  message: "E-mail is required.",
                },
                pattern: {
                  value: /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  title={"E-mail"}
                  value={value}
                  textType={"emailAddress"}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors?.email?.message}
                />
              )}
              name={"email"}
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Password is required.",
                },
                minLength: {
                  value: 8,
                  message: "Password must be 8 characters long.",
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
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Confirm password is required.",
                },
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  title={"Confirm password"}
                  value={value}
                  textType={"password"}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={errors?.confirmPassword?.message}
                />
              )}
              name={"confirmPassword"}
            />
          </View>

          <View className={"w-full h-auto flex flex-col gap-2 mt-12"}>
            <CustomButton
              title={"Sign Up"}
              onPress={handleSubmit((data) =>
                register({
                  username: data.username,
                  email: data.email,
                  password: data.password,
                }),
              )}
              isLoading={registering}
            />
            <View
              className={"flex flex-row w-full gap-2 h-auto justify-center"}
            >
              <Text className={"text-custom-gray-100  text-lg"}>
                Have an account already?
              </Text>
              <Link
                href={"/sign-in"}
                className={"text-custom-white-100 font-bold underline text-lg"}
              >
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
