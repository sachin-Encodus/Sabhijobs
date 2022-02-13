import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AppHeader from "../components/AppHeader";
import Colors from "../constants/Colors";

import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { widthPercentageToDP } from "react-native-responsive-screen";
const SavedJobs = ({ navigation, route }) => {
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log("calling");
    getData();
  }, [isFocus]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("savejobs");
      const savedata = jsonValue != null ? JSON.parse(jsonValue) : [];
      // console.log("========>>>>>>>>>>xxx", jsonValue);
      setData(savedata);
    } catch (e) {
      // error reading value
    }
  };

  const removeItem = async (id) => {
    const updated = data.filter((item) => item.id !== id);

    setData(updated);
    const jsonValue = JSON.stringify(updated);
    // console.log("data....",jsonValue);
    await AsyncStorage.setItem("savejobs", jsonValue);
    console.log(updated);
  };

  const DelteItem = (id) =>
    Alert.alert("Delete save item", "Are you sure want to delete saved item ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => removeItem(id) },
    ]);
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={route.name}
        headerBg={Colors.green}
        iconColor={Colors.black}
        menu="menu"
        titleAlight="center"
        optionalBadge={5}
        navigation={navigation}
        right="search"
        rightFunction={() => console.log("right")}
        optionalIcon="bell"
        optionalFunc={() => console.log("optional")}
      />
      {/* <View style={{ marginHorizontal: 10, marginTop: 5 }}> */}
      {data.length !== 0 ? (
        data &&
        data.map(({ title, id }) => (
          <View
            key={id}
            style={{
              marginVertical: 5,
 marginHorizontal: 10, marginTop: 5,
              backgroundColor: "#fff",
              borderRadius: 5,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("JobDetail", {
                    title,

                    id,
                  })
                }
                style={{ padding: 15, width: widthPercentageToDP("80%") }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "700", color: "black" }}
                >
                  {title}
                </Text>
              </TouchableOpacity>
              <View style={{ marginHorizontal: 8 }}>
                <TouchableOpacity onPress={() => DelteItem(id)}>
                  <MaterialIcons name="delete" size={30} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Entypo name="save" color="black" size={40} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
              color: "black",
            }}
          >
            No saved Items found
          </Text>
        </View>
      )}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default SavedJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {},
  textContainer: {
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: Colors.black,
    borderWidth: 3,
  },
  userInfo: {
    flex: 1,
  },
  bio: {
    borderRadius: 10,
    padding: 16,
    margin: 16,
  },
});
