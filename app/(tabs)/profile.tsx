import React, { useState } from "react";

import { Text, View } from "react-native";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import AppNameBanner from "@/components/AppNameBanner";
import ChangePasswordModal from "@/components/ChangePasswordModal";
import ChangeUsernameModal from "@/components/ChangeUsernameModal";
import ChangeEmailModal from "@/components/ChangeEmailModal";

const Profile = () => {
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false);
  const [isChangeUsernameModalOpen, setIsChangeUsernameModalOpen] =
    useState<boolean>(false);
  const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] =
    useState<boolean>(false);
  const { username, email, createdAt } =
    useAuthenticationStore.getState().authentication;

  return (
    <SafeAreaView className={"bg-custom-black-100 flex-1 flex-col gap-3 px-4"}>
      <View className={"w-full h-auto flex  items-center"}>
        <AppNameBanner />
      </View>

      <Text className={"text-2xl text-custom-white-100 font-bold mt-8"}>
        Hello,{" "}
        <Text className={"font-bold text-custom-violet-600 text-2xl"}>
          {username}
        </Text>
        ! You can manage your profile here.
      </Text>
      <View className={"mt-4 flex-col gap-2"}>
        <Text className={"text-xl text-custom-white-100 font-bold"}>
          Username:{" "}
          <Text className={"font-bold text-custom-violet-600 text-xl"}>
            {username}
          </Text>{" "}
        </Text>
        <Text className={"text-xl text-custom-white-100 font-bold"}>
          E-mail:{" "}
          <Text className={"font-bold text-custom-violet-600 text-xl"}>
            {email?.toLowerCase()}
          </Text>{" "}
        </Text>
        <Text className={"text-xl text-custom-white-100 font-bold"}>
          Joined:{" "}
          <Text className={"font-bold text-custom-violet-600 text-xl"}>
            {createdAt!.toString().split("T")[0]}
          </Text>{" "}
        </Text>
      </View>
      <View className={"flex flex-col gap-3 mt-8"}>
        <CustomButton
          title={"Change Password"}
          onPress={() => setIsChangePasswordModalOpen(true)}
        />
        <CustomButton
          title={"Change Username"}
          onPress={() => setIsChangeUsernameModalOpen(true)}
        />
        <CustomButton
          title={"Change E-mail"}
          onPress={() => setIsChangeEmailModalOpen(true)}
        />
      </View>
      <CustomButton
        buttonClassName={"bottom-32 absolute self-center w-full"}
        title={""}
        onPress={() => {
          useAuthenticationStore.getState().logout();
          router.push("/");
        }}
      >
        <View className={"flex-row gap-2 items-center"}>
          <Ionicons name="exit-outline" size={28} color="#E6E6E6" />
          <Text className={"text-2xl text-custom-white-100"}>Logout</Text>
        </View>
      </CustomButton>
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
      <ChangeUsernameModal
        isOpen={isChangeUsernameModalOpen}
        onClose={() => setIsChangeUsernameModalOpen(false)}
      />
      <ChangeEmailModal
        isOpen={isChangeEmailModalOpen}
        onClose={() => setIsChangeEmailModalOpen(false)}
      />
    </SafeAreaView>
  );
};

export default Profile;
