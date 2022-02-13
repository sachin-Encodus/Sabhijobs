import React, { useEffect } from "react";
import RNExitApp from "react-native-exit-app";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler, Alert
} from "react-native";
import AppHeader from "../components/AppHeader";
import Colors from "../constants/Colors";

import { SafeAreaView } from "react-native-safe-area-context";

import { firstJobsData, secondJobsData, socialData } from "../constants/data";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Category from "../components/Category";
import Socials from "../components/Socials";

const Home = ({ navigation, route }) => {
 const backAction = () => {
     if (navigation.isFocused()) {
       console.log("xxxxxxxxxxxxxxx");
       Alert.alert("Hold on!", "Are you sure, You want to exit", [
         {
           text: "Cancel",
           onPress: () => null,
           style: "cancel",
         },
         { text: "YES", onPress: () => RNExitApp.exitApp() },
       ]);
       return true;
     }
   
    };
 useEffect(() => {
  
   

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  function firstJobs() {
    const Header = () => (
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            padding: 4,
            backgroundColor: "#515256",
            borderRadius: 5,
          }}
        >
          Top Govt Jobs
        </Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          marginBottom: 5,
          width: 60,
          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("JobsList", {
            url: item.joblink,
            name: item.name,
          })
        }
      >
        <View
          style={{
            marginBottom: 5,
            height: hp("12%"),
            width: wp("22%"),
            borderColor: "#bfbfbf",
            borderRadius: 5,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            // paddingHorizontal: 15,
            // paddingVertical: 15,
            padding: 5,
          }}
        >
          <Image
            source={item.icon}
            resizeMode="center"
            style={{
              height: hp("5%"),
              width: wp("10%"),
            }}
          />
          <Text
            style={{
              marginTop: 5,
              textAlign: "center",
              fontSize: 12,
              color: "#424242",
              fontWeight: "800",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={Header}
          data={firstJobsData}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          style={{ marginHorizontal: 5 }}
        />
      </View>
    );
  }

  function secondJobs() {
   
    const Header = () => (
      <View style={{ marginBottom: 10 }}>
        <Text
        
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            padding: 4,
            backgroundColor: "#515256",
            borderRadius: 5,
          }}
        >
          Jobs By Category
        </Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          marginBottom: 5,

          alignItems: "center",
        }}
        onPress={() =>
          navigation.navigate("JobsList", {
            url: item.joblink,
            name: item.name,
          })
        }
      >
        <View
          style={{
            marginBottom: 5,
            height: hp("12%"),
            width: wp("22%"),
            borderColor: "#bfbfbf",
            borderRadius: 5,
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            // paddingHorizontal: 15,
            // paddingVertical: 15,
            padding: 5,
          }}
        >
          <Image
            source={item.icon}
            resizeMode="center"
            style={{
              height: hp("5%"),
              width: wp("10%"),
            }}
          />
          <Text
            style={{
              marginTop: 5,
              textAlign: "center",
              fontSize: 12,
              color: "#424242",
              fontWeight: "800",
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ListHeaderComponent={Header}
          data={secondJobsData}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          style={{ marginHorizontal: 5 }}
        />
      </View>
    );
  }

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
      <ScrollView nestedScrollEnabled={true} style={{ marginHorizontal: 5 }}>
        <View>
          
          {firstJobs()}
          {secondJobs()}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                padding: 4,
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff",
                marginBottom: 10,
                backgroundColor: "#515256",
                marginHorizontal: 5,
                borderRadius: 5,
              }}
            >
              Filter Jobs
            </Text>
            <Category navigation={navigation} />
            <Text
              style={{
                padding: 4,
                fontSize: 30,
                fontWeight: "bold",
                textAlign: "center",
                color: "#fff",
                marginVertical: 10,
                backgroundColor: "#515256",
                marginHorizontal: 5,
                borderRadius: 5,
              }}
            >
              Our Social Links
            </Text>
            <Socials />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

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
  },
});
