import React from "react";
import { useAuthenticationStore } from "@/store/AuthenticationStore";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-native-modal";
import { Text, View } from "react-native";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { ModalProps } from "@/types/Types";
import useChangeUserEmailMutation from "@/hooks/mutations/useChangeUserEmailMutation";

const ChangeEmailModal = ({ isOpen, onClose }: ModalProps) => {
  const { userId } = useAuthenticationStore.getState().authentication;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newEmail: "",
    },
  });

  const { changeEmail, changingEmail } = useChangeUserEmailMutation(() =>
    onClose(),
  );

  const onSubmit = ({ newEmail }: { newEmail: string }) => {
    if (userId) {
      changeEmail({
        userId: userId,
        newEmail: newEmail,
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
                message: "New e-mail is required.",
              },
              pattern: {
                value: /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormField
                title={"New E-mail"}
                value={value}
                textType={"password"}
                onChange={onChange}
                onBlur={onBlur}
                error={errors?.newEmail?.message}
              />
            )}
            name={"newEmail"}
          />
        </View>
        <View className={"flex flex-row justify-between mt-4"}>
          <CustomButton
            buttonClassName={"w-[48%] h-[40px]"}
            title={"Cancel"}
            onPress={onClose}
          />
          <CustomButton
            isLoading={changingEmail}
            buttonClassName={"w-[48%] h-[40px]"}
            title={"Change"}
            onPress={handleSubmit((data) =>
              onSubmit({
                newEmail: data.newEmail,
              }),
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChangeEmailModal;
