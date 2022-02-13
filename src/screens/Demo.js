import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { color } from 'react-native-reanimated';

const Demo = ({route}) => {
    console.log(route.params?.id);
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 200, height: 200 }}
        source={{
          uri: "https://cdn-media-1.freecodecamp.org/images/0*CPTNvq87xG-sUGdx.png",
        }}
      />
      <Text style={{ color: "#000", textAlign: "center", fontSize: 30 }}>
        id : {route.params?.id}
      </Text>
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
