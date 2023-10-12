import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import {
  QualificationWise,
  StateWise,
  CityWise,
  PostWise,
} from "../constants/CategoryData";

const Category = ({ navigation,loaded,interstitialAd }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          loaded ? interstitialAd() :
          navigation.navigate("CategoryJobs", {
            data: QualificationWise,
            icon: "graduation-cap",
            name: "Qualification",
          })
        }
      >
        <View style={styles.category}>
          <Entypo
            style={{ marginHorizontal: 5 }}
            name="graduation-cap"
            color="#515256"
            size={20}
          />
          {/* <Image
                    source={require("../assets/icons/Qualification.png")}
                    resizeMode="center"
                    style={{
                      height: 20,
                      width: 20,
                      marginHorizontal: 5,
                      
                    }}
                  /> */}
          <Text style={styles.text}>Qualification</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CategoryJobs", {
            data: StateWise,
            icon: "location-pin",
            name: "States",
          })
        }
      >
        <View style={styles.category}>
          <Entypo
            style={{ marginHorizontal: 5 }}
            name="location-pin"
            size={20}
            color="#515256"
          />
          {/* <Image
                  source={require("../assets/icons/pin.png")}
                  resizeMode="center"
                  style={{
                    height: 20,
                    width: 20,
                    marginHorizontal: 5,
                  }}
                /> */}
          <Text style={styles.text}>States</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() =>
          navigation.navigate("CategoryJobs", {
            CityWise,
          })
        }
      >
        <View style={styles.category}>
          <Image
            source={require("../assets/icons/clipboard.png")}
            resizeMode="center"
            style={{
              height: 20,
              width: 20,
              marginHorizontal: 5,
            }}
          />
          <Text style={styles.text}>All PCS jobs</Text>
        </View>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CategoryJobs", {
            data: CityWise,
            icon: "location-pin",
            name: "Cities",
          })
        }
      >
        <View style={styles.category}>
          <Entypo
            style={{ marginHorizontal: 5 }}
            name="location-pin"
            size={20}
            color="#515256"
          />
          {/* <Image
                  source={require("../assets/icons/pin.png")}
                  resizeMode="center"
                  style={{
                    height: 20,
                    width: 20,
                    marginHorizontal: 5,
                  }}
                /> */}
          <Text style={styles.text}>Cities</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CategoryJobs", {
            data: PostWise,
            icon: "shield",
            name: "Post wise",
          })
        }
      >
        <View style={styles.category}>
          <Entypo
            style={{ marginHorizontal: 5 }}
            name="shield"
            size={20}
            color="#515256"
          />
          <Text style={styles.text}>Post wises</Text>
        </View>
      </TouchableOpacity>

      {/* <View>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#006699",
                    backgroundColor: "#f7df00",
                    marginHorizontal: 5,
                  }}
                >
                  Our social links
                </Text>
              </View> */}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#0BA29D",
  },
  category: {
    flexDirection: "row",

    alignItems: "center",
    backgroundColor: "#EAECEC",
    marginBottom: 5,
    marginHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 5,
  },
});
