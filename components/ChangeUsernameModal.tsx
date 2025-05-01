import React from "react";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-native-modal";
import { Text, View } from "react-native";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { ModalProps } from "@/types/Types";
import useChangeUserUsernameMutation from "@/hooks/mutations/useChangeUserUsernameMutation";

const ChangeUsernameModal = ({ isOpen, onClose }: ModalProps) => {
  const { userId } = useAuthenticationStore.getState().authentication;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newUsername: "",
    },
  });

  const { changeUsername, changingUsername } = useChangeUserUsernameMutation(
    () => onClose(),
  );

  const onSubmit = ({ newUsername }: { newUsername: string }) => {
    if (userId) {
      changeUsername({
        userId: userId,
        newUsername: newUsername,
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
          Change Your Username
        </Text>
        <View className={"w-full h-auto flex flex-col gap-2 mt-3"}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "New username is required.",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title={"New Username"}
                value={value}
                textType={"password"}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.newUsername?.message}
              />
            )}
            name={"newUsername"}
          />
        </View>
        <View className={"flex flex-row justify-between mt-4"}>
          <CustomButton
            buttonClassName={"w-[48%]"}
            title={"Cancel"}
            onPress={onClose}
          />
          <CustomButton
            isLoading={changingUsername}
            buttonClassName={"w-[48%]"}
            title={"Change"}
            onPress={handleSubmit((data) =>
              onSubmit({
                newUsername: data.newUsername,
              }),
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChangeUsernameModal;
