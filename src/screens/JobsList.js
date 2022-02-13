import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import AppHeader from "../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";

import dateFormat from "dateformat";
const JobsList = ({ navigation, route }) => {
   console.log("============>>>>>>>>>>",route);
  const [list, setList] = useState([]);
  const [currentPage, setPurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getjobsList = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${route.params.url}&page=${currentPage}`);
      if (res.data.length > 0) {
        setList([...list, ...res.data]);
        setIsLoading(false);
      } else {
        if (list.length > 0) {
          ToastAndroid.show("No more Jobs", ToastAndroid.SHORT);
          setIsLoading(false);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FooterLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator color="#515256" size="large" />
      </View>
    ) : null;
  };

  const loadMoreItem = () => {
    console.log("calling");

    setPurrentPage(currentPage + 1);
  };

  useEffect(() => {
    getjobsList();
  }, [currentPage]);

  function renderJobs() {
    const Header = () => (
      <View style={{ marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "#006699",
            backgroundColor: "#E1F300",
          }}
        >
          A-Jobs
        </Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <View key={item.id}>
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate("JobDetail", {
              id: item.id,
            })
          }
        >
          <View style={{ padding: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#2684ff" }}>
              {item.title.rendered}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 2,
              marginHorizontal: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="calendar" size={20} color="#424242" />
            <Text
              style={{ marginLeft: 5, color: "#424242", fontWeight: "800" }}
            >
              {dateFormat(item.date, "mediumDate")}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={{ flex: 1 }}>
        {list.length === 0 ? (
          isLoading ? (
            <ActivityIndicator color="#515256" size="large" />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="work" color="black" size={40} />

              <Text
                style={{ fontSize: 20, textAlign: "center", color: "black" }}
              >
                No jobs are available
              </Text>
            </View>
          )
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
            // ListHeaderComponent={Header}
            data={list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={{ marginHorizontal: 10 }}
            onEndReached={loadMoreItem}
            ListFooterComponent={FooterLoader}
            onEndReachedThreshold={0.01}
          />
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={route.params?.name}
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
      {/* <View style={{ backgroundColor: "#02A7CE", paddingVertical: 5 }}>
        <View
          style={{
            marginHorizontal: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="arrow-bold-left" size={30} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            {route.params?.name}
          </Text>
          <Entypo name="arrow-bold-left" size={30} color="#02A7CE" />
        </View>
      </View> */}
      <View style={{ flex: 1 }}>{renderJobs()}</View>
    </SafeAreaView>
  );
};

export default JobsList;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 3,
    borderRadius: 5,
    elevation: 5,
  },
  container: {
    flex: 1,

    backgroundColor: "#fff",
  },
  loaderStyle: {
    marginBottom: 20,
    alignItems: "center",
  },
});
