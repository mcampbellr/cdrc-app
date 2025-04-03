import AppImageGradient from "@/components/AppImageGradient";
import ThemedButton, { ThemedButtonText } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ColorsThemePalette } from "@/data/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useAppStore } from "@/state/app.store";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  View,
  StyleSheet,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const { height, width } = Dimensions.get("window");
const data = [
  {
    number: 1,
    title: "Centro de Rejuvenecimiento",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    image: require("../assets/images/onboarding-img-2.png"),
  },
  {
    number: 2,
    title: "Antiaging Center",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    image: require("../assets/images/onboarding-img-1.png"),
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
  const router = useRouter();
  const { colors } = useThemeColors();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<Animated.FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const styles = themeStyles(colors);
  const appStore = useAppStore();

  return (
    <GestureHandlerRootView style={styles.itemContainer}>
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
              <AppImageGradient
                image={item.image}
                color={colors.surfacePrimary}
                height={height * 0.55}
                width={width}
              />
              <View style={styles.textContainer}>
                <ThemedText
                  numberOfLines={2}
                  style={{
                    fontSize: 38,
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "left",
                    flexWrap: "wrap",
                    lineHeight: 42,
                  }}
                >
                  {item.title}
                </ThemedText>
                <ThemedText>{item.description}</ThemedText>
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
                  backgroundColor: colors.textPrimary,
                },
              ]}
            />
          );
        })}
      </View>

      <SafeAreaView>
        <View style={styles.buttonContainer}>
          {currentIndex === 0 && (
            <ThemedButton
              type="link"
              onPress={() => {
                flatListRef.current?.scrollToIndex({
                  index: data.length - 1,
                  animated: true,
                });
              }}
            >
              <ThemedButtonText
                style={{
                  color: colors.textPrimary,
                }}
              >
                Saltar
              </ThemedButtonText>
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
              {currentIndex === data.length - 1 ? "Comencemos" : "Siguiente"}
            </ThemedButtonText>
          </ThemedButton>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const themeStyles = (colors: ColorsThemePalette) =>
  StyleSheet.create({
    itemContainer: {
      flex: 1,
      backgroundColor: colors.surfacePrimary,
    },

    textContainer: {
      paddingHorizontal: 20,
      width,
    },

    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
      paddingHorizontal: 20,
      marginBottom: 20,
    },

    indicatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 30,
      marginBlock: 15,
      gap: 10,
    },

    indicator: {
      height: 5,
      borderRadius: 5,
    },
  });
