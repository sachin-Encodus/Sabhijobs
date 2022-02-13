import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Badge, Surface, Title } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import Colors from "../constants/Colors";
import icons from "../constants/icons";
import Logo from "../assets/images/logo.png";
const IconSize = 25;

const AppHeader = ({
  menu,
  back,
  title,
  right,
  rightFunction,
  optionalIcon,
  optionalFunc,
  navigation,
  headerBg,
  iconColor,
  titleAlight,
  optionalBadge,
}) => {
  return (
    <Surface style={[styles.header, { backgroundColor: "#0077b3" }]}>
      <View style={styles.view}>
        {menu === "menu" ? (
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.openDrawer()}
          >
            <Feather name="menu" size={IconSize} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={IconSize} color="white" />
          </TouchableOpacity>
        )}
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={IconSize} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
      {menu === "menu" ? (
        <View style={styles.titleView}>
          <Image
            source={icons.Logo}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
            }}
          />
          {/* <Title style={{ color: iconColor, textAlign: titleAlight }}>
          {title}
        </Title> */}
        </View>
      ) : (
        <View>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "#fff" }}>
            {title}
          </Text>
        </View>
      )}
      <View style={[styles.view, styles.rightView]}>
        {/* {optionalFunc && (
          <TouchableOpacity style={styles.rowView} onPress={optionalFunc}>
            <Feather name={optionalIcon} size={IconSize} color={iconColor} />
            {optionalBadge && (
              <Badge style={{ position: "absolute", top: -5, right: -10 }}>
                {optionalBadge}
              </Badge>
            )}
          </TouchableOpacity>
        )} */}

        {title === "Home" ? (
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => navigation.navigate("Search")}
          >
            <Feather name={right} size={IconSize} color="white" />
          </TouchableOpacity>
        ) : (
          <Feather name={right} size={IconSize} color="#0077b3" />
        )}
      </View>
    </Surface>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  header: {
    height: 60,
    elevation: 4,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.black,
  },
  view: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: 'yellow'
  },
  titleView: {},
  rightView: {
    justifyContent: "flex-end",
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
});
