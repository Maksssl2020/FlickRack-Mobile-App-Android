import { ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Link, router } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView
      className={"flex-1 justify-center  items-center bg-custom-black-100"}
    >
      <ScrollView className={"w-full h-full relative"}>
        <View className={"w-full mb-auto h-[450px]"}>
          <View
            className={
              "w-full h-full absolute  z-10 bg-custom-black-100/20 inset-0"
            }
          />
          <ImageBackground
            source={require("../assets/images/bg.jpeg")}
            className={"w-full h-full"}
          />

          <LinearGradient
            colors={["transparent", "#141414"]}
            className={"w-full h-[250px] absolute z-10 bottom-0"}
          />
        </View>

        <View className="flex flex-col gap-4 h-full w-full items-center mt-4">
          <View className="flex flex-row ">
            <Text className="text-custom-white-100 text-5xl font-bold">
              Flick
            </Text>
            <Text className="text-custom-violet-600 text-5xl font-bold">
              Rack
            </Text>
          </View>
          <Text className={"text-custom-white-100 text-2xl text-center px-4"}>
            Get ready to dive into your personal movie universe!
          </Text>

          <View className={"w-full h-auto px-6 mt-4"}>
            <CustomButton
              title={"Sign In"}
              onPress={() => router.push("/sign-in")}
            />
          </View>

          <View className={"flex flex-row w-full gap-2 h-auto justify-center"}>
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
      </ScrollView>

      <StatusBar backgroundColor={"#141414"} style={"light"} />
    </SafeAreaView>
  );
}
