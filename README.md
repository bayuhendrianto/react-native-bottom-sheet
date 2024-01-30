# REACT NATIVE BOTTOM SHEET

**A component Bottom Sheet built with Reanimated v3+ and React Native Gesture handler V2+**

## Getting Started

To use the `BottomSheet` component, you first need to install the package via npm or yarn. Run either of the following commands:

```sh
npm install @bayudev/react-native-modal-dialog
```

```sh
yarn add @bayudev/react-native-modal-dialog
```

🚨 🚨 Please note that this library is built with React Native Reanimated v3 and uses React Native Gesture Handler. If you haven't installed Reanimated and Gesture Handler yet, please follow the installation instructions for [Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation) and [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/).

## Usage

First, import the `BottomSheet` component from the `@bayudev/react-native-modal-dialog` library:

```javascript
import { BottomSheet } from '@bayudev/react-native-modal-dialog';
```

```javascript
import { StatusBar } from "expo-status-bar";
import { useCallback, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheet, BottomSheetMethods } from "@bayudev/react-native-modal-dialog";

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

      <BottomSheet ref={ref} heightValue={50}>
        <View>
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

```

## Properties

| Property           | Type        | Default             | Required | Description                                                                          |
| ------------------ | ----------- | ------------------- | -------- | -------------------------------------------------------------------------------------|
| ref                | String      | null                | true     | using useRef for manage `BottomSheet` component for `show` or `hide`                 |
| heightValue        | Number      | `50`                | false    | maximum height of `BottomSheet` when displayed                                       |
| children           | ReactNode   | null or undefined   | false    | Put your any component here                                                          |

## Author

<table>
  <tr>
    <td align="center">
      <p></p>
      <a href="https://github.com/bayuhendrianto">
        <pre><img src="https://avatars.githubusercontent.com/u/40142196?v=4" style="position: relative; width: 128px; margin-bottom: 80x; border-radius: 10px;" alt=""/><br/><br/>Bayu Hendrianto</pre>
      </a>
    </td>
  </tr>
</table>



## License

The library is licensed under the [MIT](./LICENSE) License.

<!--
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT -->
