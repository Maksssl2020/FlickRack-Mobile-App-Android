import React, { useRef } from "react";
import { ActivityIndicator, Animated, TouchableOpacity } from "react-native";

type AnimatedCustomButtonProps = {
  className: string;
  onPress: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
};

const AnimatedCustomButton = ({
  className,
  onPress,
  children,
  isLoading,
}: AnimatedCustomButtonProps) => {
  const scaleAnimation = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnimation }],
      }}
    >
      <TouchableOpacity
        className={`items-center justify-center flex-1 rounded-full ${className}`}
        onPress={(event) => {
          event.stopPropagation();
          onPress();

          Animated.sequence([
            Animated.spring(scaleAnimation, {
              toValue: 1.2,
              useNativeDriver: true,
            }),
            Animated.spring(scaleAnimation, {
              toValue: 1.0,
              useNativeDriver: true,
            }),
          ]).start();
        }}
      >
        {isLoading ? (
          <ActivityIndicator size="large" color="#e6e6e6" />
        ) : (
          children
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnimatedCustomButton;
