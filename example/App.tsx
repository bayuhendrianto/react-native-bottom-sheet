import { StatusBar } from "expo-status-bar";
import { useCallback, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheet, BottomSheetMethods } from "@bayudev/react-native-bottom-sheet";

export default function App() {
  const ref = useRef<BottomSheetMethods>(null);
  const openBottomSheet = useCallback(() => {
    ref.current?.show();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <TouchableOpacity
          style={{
            width: "90%",
            height: 60,
            backgroundColor: "green",
            padding: 8,
            borderRadius: 8,
          }}
          onPress={openBottomSheet}
        >
          <Text style={{ fontSize: 26, color: "white", textAlign: "center" }}>
            Open Bottom Sheet
          </Text>
        </TouchableOpacity>
      </View>

      <BottomSheet ref={ref} heightValue={60}>
        <View style={{ alignItems: "center", marginVertical: 30 }}>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 60,
              backgroundColor: "green",
              padding: 8,
              borderRadius: 8,
              marginBottom: 20,
            }}
          >
            <Text style={{ fontSize: 26, color: "white", textAlign: "center" }}>
              Update
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "90%",
              height: 60,
              backgroundColor: "red",
              padding: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontSize: 26, color: "white", textAlign: "center" }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
