import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AppHeader from "../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Divider } from "react-native-paper";
import { color } from "react-native-reanimated";

const Qualification = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={"Jobs by Qualification"}
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

      <View style={{ marginTop: 20, marginHorizontal: 15 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("JobDetail", {
              Qualifications: "8th Pass",
            })
          }
        >
          <View style={{ flexDirection: "row", marginVertical: 8 }}>
            <FontAwesome5 name="graduation-cap" size={24} color="#545454" />
            <Text style={styles.text}>8th Pass</Text>
          </View>
        </TouchableOpacity>

        <Divider style={styles.divider} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("JobDetail", {
              Qualifications: "10th Pass",
            })
          }
        >
          <View style={{ flexDirection: "row", marginVertical: 8 }}>
            <FontAwesome5 name="graduation-cap" size={24} color="#545454" />
            <Text style={styles.text}>10th Pass</Text>
          </View>
        </TouchableOpacity>

        <Divider style={styles.divider} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("JobDetail", {
              Qualifications: "12th Pass",
            })
          }
        >
          <View style={{ flexDirection: "row", marginVertical: 8 }}>
            <FontAwesome5 name="graduation-cap" size={24} color="#545454" />
            <Text style={styles.text}>12th Pass</Text>
          </View>
        </TouchableOpacity>

        <Divider style={styles.divider} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("JobDetail", {
              Qualifications: "Diploma",
            })
          }
        >
          <View style={{ flexDirection: "row", marginVertical: 8 }}>
            <FontAwesome5 name="graduation-cap" size={24} color="#545454" />
            <Text style={styles.text}>Diploma</Text>
          </View>
        </TouchableOpacity>

        <Divider style={styles.divider} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("JobDetail", {
              Qualifications: "Graduation",
            })
          }
        >
          <View style={{ flexDirection: "row", marginVertical: 8 }}>
            <FontAwesome5 name="graduation-cap" size={24} color="#545454" />
            <Text style={styles.text}>Graduation</Text>
          </View>
        </TouchableOpacity>

        <Divider style={styles.divider} />
      </View>
    </SafeAreaView>
  );
};

export default Qualification;

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
