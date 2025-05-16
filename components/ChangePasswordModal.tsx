import React from "react";
import Modal from "react-native-modal";
import { Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import FormField from "@/components/FormField";
import useChangeUserPasswordMutation from "@/hooks/mutations/useChangeUserPasswordMutation";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import CustomButton from "@/components/CustomButton";
import { ModalProps } from "@/types/Types";

const ChangePasswordModal = ({ isOpen, onClose }: ModalProps) => {
  const { userId } = useAuthenticationStore.getState().authentication;

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { changePassword, changingPassword } = useChangeUserPasswordMutation(
    () => onClose(),
  );

  const onSubmit = ({
    currentPassword,
    newPassword,
  }: {
    currentPassword: string;
    newPassword: string;
  }) => {
    if (userId) {
      changePassword({
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });
    }
  };

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <View
        className={
          "w-[95%] h-auto py-3 px-4 flex-col gap-3 rounded-xl self-center border-2 border-custom-violet-600 bg-custom-gray-500"
        }
      >
        <Text
          className={"text-2xl font-bold self-center text-custom-white-100"}
        >
          Change Your Password
        </Text>
        <View className={"w-full h-auto flex flex-col gap-2 mt-3"}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Current password is required.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title={"Current Password"}
                value={value}
                textType={"password"}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.currentPassword?.message}
              />
            )}
            name={"currentPassword"}
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Current password is required.",
              },
              minLength: {
                value: 8,
                message: "Password must be 8 characters long.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title={"New Password"}
                value={value}
                textType={"password"}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.newPassword?.message}
              />
            )}
            name={"newPassword"}
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Current password is required.",
              },
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title={"Confirm New Password"}
                value={value}
                textType={"password"}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.confirmNewPassword?.message}
              />
            )}
            name={"confirmNewPassword"}
          />
        </View>
        <View className={"flex flex-row justify-between mt-4"}>
          <CustomButton
            buttonClassName={"w-[48%] h-[40px]"}
            title={"Cancel"}
            onPress={onClose}
          />
          <CustomButton
            isLoading={changingPassword}
            buttonClassName={"w-[48%] h-[40px]"}
            title={"Change"}
            onPress={handleSubmit((data) =>
              onSubmit({
                newPassword: data.newPassword,
                currentPassword: data.currentPassword,
              }),
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChangePasswordModal;
