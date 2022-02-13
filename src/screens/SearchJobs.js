import React, { useEffect } from "react";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "./../components/AppHeader";
import Colors from "../constants/Colors";
import { color } from "react-native-reanimated";
import AntDesign from "react-native-vector-icons/AntDesign";

import axios from "axios";
import dateFormat from "dateformat";
const SearchJobs = ({ navigation, route }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const GetsearchJobsData = async (search) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://www.sabhijobs.com/wp-json/wp/v2/posts/?search=${search}`
      );

      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetsearchJobsData(search);
  }, []);

  const handleChange = async (e) => {
    setSearch(e);
    GetsearchJobsData(e);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppHeader
        title={route.name}
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
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(e) => handleChange(e)}
          value={search}
          lightTheme={true}
          color="black"
        />
        <ScrollView>
          {isLoading ? (
            <ActivityIndicator color="#515256" size="large" />
          ) : (
            <View>
              {data.map((item) => (
                <View key={item.id}>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                      navigation.navigate("JobDetail", { id: item.id })
                    }
                  >
                    <View style={{ padding: 5 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#2684ff",
                        }}
                      >
                        {item.title.rendered}
                      </Text>
                    </View>
                    <View
                      style={{marginHorizontal:5,marginVertical:2, flexDirection: "row", alignItems: "center" }}
                    >
                      <AntDesign name="calendar" size={20} color="black" />
                      <Text
                        style={{
                          marginLeft: 5,
                          color: "#424242",
                          fontWeight: "800",
                        }}
                      >
                        {dateFormat(item.date, "mediumDate")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchJobs;

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
});
