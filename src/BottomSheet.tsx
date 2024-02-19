import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  SharedValue,
} from "react-native-reanimated";
import { BottomSheetMethods, BottomSheetProps } from "./types";

const { height } = Dimensions.get("screen");
export const BottomSheet = forwardRef<BottomSheetMethods, BottomSheetProps>(
  (
    {
      heightValue = 50,
      isCloseIcon = false,
      closeIcon,
      iconPosition = "right",
      isTitle = false,
      title = "bottom sheet",
      closeIconColor = "red",
      titleStyle,
      children,
    }: BottomSheetProps,
    ref
  ) => {
    const closeHeight = height;
    const percentage = heightValue / 100;
    const openHeight = height - height * percentage;
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);
    const CLOSE_ICON = closeIcon ?? (
      <Image
        source={require("../../assets/close.png")}
        style={{ width: 20, height: 20, tintColor: closeIconColor }}
      />
    );

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = topAnimation.value;
      })
      .onUpdate((event) => {
        topAnimation.value = event.translationY + context.value;
        topAnimation.value = Math.max(topAnimation.value, openHeight);
      })
      .onEnd(() => {
        if (topAnimation.value > closeHeight - closeHeight / 2.5) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 50,
            stiffness: 200,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 50,
            stiffness: 200,
          });
        }
      });

    const show = useCallback(() => {
      "worklet";
      topAnimation.value = withSpring(openHeight, {
        damping: 50,
        stiffness: 200,
      });
    }, [openHeight, closeHeight]);

    const hide = useCallback(() => {
      "worklet";
      topAnimation.value = withSpring(closeHeight, {
        damping: 50,
        stiffness: 200,
      });
    }, [openHeight, closeHeight]);

    useImperativeHandle(ref, () => ({ show, hide }), [show, hide]);

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const ICON_POSITION =
      iconPosition === "left"
        ? StyleSheet.create({
            position: {
              left: 0,
            },
          })
        : StyleSheet.create({
            position: {
              right: 0,
            },
          });
    return (
      <>
        <Backdrop
          topAnimation={topAnimation}
          openHeight={openHeight}
          closeHeight={closeHeight}
          hide={hide}
        />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.container, animationStyle]}>
            {isCloseIcon ? (
              <View>
                <View
                  style={[
                    {
                      position: "absolute",
                      zIndex: 1,
                      flex: 1,
                      alignSelf: "flex-end",
                      margin: 5,
                      top: 5,
                      padding: 5,
                      maxWidth: 60,
                      maxHeight: 60,
                    },
                    ICON_POSITION.position,
                  ]}
                >
                  <TouchableOpacity
                    onPress={hide}
                    style={{ maxWidth: 50, maxHeight: 50 }}
                  >
                    {CLOSE_ICON}
                  </TouchableOpacity>
                </View>
                {isTitle ? (
                  <Text
                    style={[
                      titleStyle
                        ? titleStyle
                        : {
                            textAlign: "center",
                            fontSize: 22,
                            marginVertical: 10,
                          },
                    ]}
                  >
                    {title}
                  </Text>
                ) : (
                  <View style={styles.line}></View>
                )}
              </View>
            ) : isTitle ? (
              <Text
                style={[
                  titleStyle
                    ? titleStyle
                    : { textAlign: "center", fontSize: 22, marginVertical: 10 },
                ]}
              >
                {title}
              </Text>
            ) : (
              <View style={styles.line}></View>
            )}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.divider}></View>
            </View>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

interface BackdropProps {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  hide: () => void;
}

const Backdrop = ({
  topAnimation,
  openHeight,
  closeHeight,
  hide,
}: BackdropProps) => {
  topAnimation.value;
  const backdropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [closeHeight, openHeight],
      [0, 0.7]
    );
    const display = opacity === 0 ? "none" : "flex";
    return {
      opacity,
      display,
    };
  });

  return (
    <TouchableWithoutFeedback onPress={() => hide()}>
      <Animated.View
        style={[styles.backdropContainer, backdropAnimation]}
      ></Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  line: {
    width: 100,
    height: 8,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 20,
    borderRadius: 5,
  },
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: "#dedede",
    alignSelf: "center",
    borderRadius: 5,
    // marginBottom: 15,
  },
  backdropContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    display: "none",
  },
});
