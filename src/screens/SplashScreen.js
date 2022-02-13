import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
const logo = require("../assets/s.png");
export default function SplashScreen({ navigation }) {
  useEffect(() => {
    
    setTimeout(() => {
      navigation.replace("Drawer");
    }, 0);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{
          width: widthPercentageToDP("50%"),
          height: heightPercentageToDP("50%"),
        }}
        resizeMode="contain"
        source={logo}
      />
    </View>
  );
}
