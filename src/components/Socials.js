import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { socialData } from "../constants/data";
import { widthPercentageToDP } from "react-native-responsive-screen";

const Socials = () => {
  return (
    <View style={{ marginBottom: 10 }}>
      {socialData.map(({ icon, name, id, url }) => (
        <View key={id}>
          <TouchableOpacity
            onPress={() => Linking.openURL(url)}
            style={{
              marginTop: 8,
              padding: 5,
              flexDirection: "row",
              borderColor: "lightgray",

              borderWidth: 2,
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 4,
              marginHorizontal: 5,
            }}
          >
            <Image
              source={{
                uri: icon,
              }}
              resizeMode="contain"
              style={{
                height: 25,
                width: 25,
                marginHorizontal: 5,
                marginRight: 18,
              }}
            />
            <View
              style={{
                width: widthPercentageToDP("80%"),
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#0BA29D",
                  fontWeight: "bold",
                }}
              >
                {name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Socials;
