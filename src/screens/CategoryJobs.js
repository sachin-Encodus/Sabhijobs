import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AppHeader from "../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Divider } from "react-native-paper";
import { color } from "react-native-reanimated";
const CategoryJobs = ({ navigation, route }) => {
  const { data, icon, name } = route.params;

  function renderJobs() {
    const Header = () => (
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "#006699",
            backgroundColor: "#f7df00",
          }}
        >
          A-Jobs
        </Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <View style={{ marginHorizontal: 5 }} key={item.link}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("JobsList", {
              url: item.link,
              name: item.name,
            })
          }
        >
          <View
            style={{
              flexDirection: "row",
              marginVertical: 8,
              alignItems: "center",
            }}
          >
            <Entypo name={icon} size={20} color="#545454" />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </TouchableOpacity>

        <Divider style={styles.divider} />
      </View>
    );

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
        //   ListHeaderComponent={Header}
        data={data && data}
        keyExtractor={(item) => `${item.link}`}
        renderItem={renderItem}
        style={{ marginHorizontal: 10 }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={name}
        headerBg={Colors.green}
        iconColor={Colors.black}
        menu
        titleAlight="center"
        optionalBadge={5}
        navigation={navigation}
        right="search"
        rightFunction={() => console.log("right")}
        optionalIcon="bell"
        optionalFunc={() => console.log("optional")}
      />
      <View>{renderJobs()}</View>
    </SafeAreaView>
  );
};

export default CategoryJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#424242",
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 20,
  },
  divider: {
    borderBottomColor: "#9e9e9e",
    borderBottomWidth: 1,
  },
});
