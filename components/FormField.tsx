import React, { useState } from "react";

import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type FormFieldProps = {
  title: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  containerClassName?: string;
  textType?: "username" | "emailAddress" | "password" | "none";
  error?: string;
  height?: number;
  textAlignVertical?: "top" | "center";
};

const FormField = ({
  title,
  value,
  onChange,
  onBlur,
  containerClassName,
  textType,
  error,
  height = 55,
  textAlignVertical = "center",
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setFocused] = useState(false);

  return (
    <View className={`w-full h-auto flex flex-col gap-2 ${containerClassName}`}>
      <Text className={"ml-2 text-custom-white-100 text-2xl"}>{title}</Text>

      <View
        style={{
          borderWidth: 2,
          borderColor: isFocused ? "#3e55c6" : "#7278d4",
          borderRadius: 10,
          height: height,
        }}
        className={
          "w-full flex-row relative px-4 items-center justify-center flex border-2 focus:border-custom-pink-600"
        }
      >
        <TextInput
          className={"text-custom-white-100 font-medium flex-1 h-full"}
          value={value}
          onChangeText={onChange}
          secureTextEntry={
            title.toLowerCase().includes("password") ? !showPassword : false
          }
          textContentType={textType}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          multiline={height > 55}
          textAlignVertical={textAlignVertical}
        />

        {title.toLowerCase().includes("password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={30}
              color={"white"}
            />
          </TouchableOpacity>
        )}
      </View>
      <Text className={"text-lg text-red-500"}>{error && error}</Text>
    </View>
  );
};

export default FormField;
