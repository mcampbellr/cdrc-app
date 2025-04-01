import ThemedButton, { ThemedButtonText } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useAppStore } from "@/state/app.store";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const data = [
  {
    number: 1,
    title: "Centro de Rejuvenecimiento",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    image: require("../assets/images/onboarding-img-1.png"),
  },
  {
    number: 2,
    title: "Antiaging Center",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    image: require("../assets/images/onboarding-img-2.png"),
  },
  {
    number: 3,
    title: "Medicina Estética",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    image: require("../assets/images/onboarding-img-3.png"),
  },
];

export default function Onboarding() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { colors } = useThemeColors();
  const appStore = useAppStore();

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <Animated.FlatList
          data={data}
          horizontal
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
              listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
                const x = event.nativeEvent.contentOffset.x + 0.01;
                const index = Math.round(x / width);

                setCurrentIndex(index);
              },
            },
          )}
          keyExtractor={({ number }) => number.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <Image
                  style={{ height: 480 }}
                  resizeMode="contain"
                  source={item.image}
                />
                <View style={styles.textContainer}>
                  <ThemedText
                    type="title"
                    style={{ fontSize: 38, lineHeight: 50 }}
                  >
                    {item.title}
                  </ThemedText>
                  <ThemedText style={{ paddingTop: 10, fontSize: 16 }}>
                    {item.description}
                  </ThemedText>
                </View>
              </View>
            );
          }}
        />

        <View style={styles.indicatorContainer}>
          {data.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const widthAnimated = scrollX.interpolate({
              inputRange,
              outputRange: [15, 50, 15],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.indicator,
                  {
                    width: widthAnimated,
                    backgroundColor: colors.text,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Button container */}
        <View style={styles.buttonContainer}>
          {currentIndex === 0 && (
            <ThemedButton
              onPress={() => {
                flatListRef.current?.scrollToIndex({
                  index: data.length - 1,
                  animated: true,
                });
              }}
            >
              <ThemedButtonText>Saltar</ThemedButtonText>
            </ThemedButton>
          )}

          <ThemedButton
            onPress={() => {
              if (currentIndex === data.length - 1) {
                appStore.setOnboardingCompleted(true);
                router.replace("/login");
                return;
              }

              flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
              });
            }}
          >
            <ThemedButtonText>
              {currentIndex === data.length - 1 ? "Empecemos" : "Siguiente"}
            </ThemedButtonText>
          </ThemedButton>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: 15,
    gap: 10,
  },

  indicator: {
    height: 5,
    borderRadius: 5,
  },

  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
  },

  buttonContainer: {
    gap: 10,
    marginTop: 10,
    paddingHorizontal: 30,
    flexDirection: "row",
  },

  textContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
});
