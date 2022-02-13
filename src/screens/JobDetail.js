import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,

  TouchableOpacity,

  ToastAndroid,
  Linking,
  Share,
  ScrollView,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";

import AppHeader from "../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";



import Entypo from "react-native-vector-icons/Entypo";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Ionicons from "react-native-vector-icons/Ionicons";


import RenderHtml from "react-native-render-html";

import AsyncStorage from "@react-native-async-storage/async-storage";
import dateFormat from "dateformat";
import axios from "axios";

const tagsStyles = {
  body: {
    whiteSpace: "normal",
    color: "black",
  },
  a: {
    color: "green",
  },
  table: { borderColor: "lightgray", borderWidth: 1 },
  td: {
    padding: 10,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,

    borderRightColor: "lightgray",
    borderRightWidth: 1,

    borderLeftColor: "lightgray",
    borderLeftWidth: 1,

    borderTopColor: "lightgray",
    borderTopWidth: 1,
  },
  li: { color: "black", marginBottom: 5, fontSize: 15},
  p: { lineHeight: 25, fontSize: 16 },
};



const JobDetaile = ({ navigation, route }) => {
  const { width } = useWindowDimensions();
  const [savejobs, setSavejobs] = useState([]);
  const [jobData, setJobData] = useState("");
  const id = route.params?.id;
  const link = jobData.guid?.rendered;


  useEffect(() => {
    GetjobData();
  }, [id]);

  const GetjobData = async () => {
    try {
       const res = await axios.get(
         `https://www.sabhijobs.com/wp-json/wp/v2/posts/${id}`
       );

       setJobData(res.data);
    } catch (error) {
      console.log(error);
    }
   
  };

  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem('savejobs')
      const data = await AsyncStorage.getItem("savejobs");
      //  console.log("=======>>>>>",JSON.parse(data));
      if (data !== null) {
        setSavejobs(JSON.parse(data));
      } else {
        console.log("data is null", data);
      }
    })();
  }, []);
  // let content = info;
  // const tables = info.match(/(<table(?:.|\n)*?<\/table>)/g);

  // tables.map((table) => {
  //   content = content.replace(table, `<iframe srcdoc="${table}"></iframe>`);
  // });

  const storeData = async () => {
    const data = {
      id,
      title: jobData.title.rendered,
    };

    try {
      //   arr.push({
      //   // title,
      //   // info,
      //   // date,
      //   id:Date.now(),
      //   name,
      // })
      // console.log("=====::::::",  (savejobs.includes()));
      if (!savejobs.find(({ id }) => id === data.id)) {
        setSavejobs([...savejobs, data]);
        ToastAndroid.show("Item saved", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Item already Saved", ToastAndroid.SHORT);
        // console.log("data is already");
      }

      //  console.log(await AsyncStorage.getItem("savejobs"));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      const jsonValue = JSON.stringify(savejobs);
      await AsyncStorage.setItem("savejobs", jsonValue);
    })();
  }, [savejobs]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // console.log("======xxxxxxx",savejobs);
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
      

      <ScrollView>
        {jobData ? (
          <View>
            <View style={{ marginHorizontal: 10, marginTop: 10 }}>
              <View
                style={{
                  padding: 15,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  elevation: 5,
                }}
              >
                <Text
                  style={{ fontSize: 15, fontWeight: "bold", color: "black" }}
                >
                  {jobData.title.rendered}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <AntDesign name="calendar" size={24} color="#424242" />
                  <Text style={{ color: "#424242" ,fontWeight:"800"}}>
                    {" "}
                    {dateFormat(jobData?.date, "mediumDate")}{" "}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => Linking.openURL(link)}
                    style={styles.icons}
                  >
                    <MaterialCommunityIcons
                      name="web"
                      size={30}
                      color="#1962FF"
                    />
                    <Text style={{ color: "#424242" ,fontWeight:"800" }}>Visit site</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(`whatsapp://send?text=${link}`)
                    }
                    style={styles.icons}
                  >
                    <Ionicons
                      name="ios-logo-whatsapp"
                      size={30}
                      color="#33cc33"
                    />
                    <Text style={{ color: "#424242" ,fontWeight:"800" }}>Whatsapp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onShare} style={styles.icons}>
                    <Entypo name="share" size={30} color="#0099e6" />
                    <Text style={{ color: "#424242" ,fontWeight:"800" }}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => storeData()}
                    style={styles.icons}
                  >
                    <Ionicons name="save" size={30} color="red" />
                    <Text style={{ color: "#424242" ,fontWeight:"800" }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  marginVertical: 20,
                  flex: 1,
                  padding: 10,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  elevation: 5,
                }}
              >
                <RenderHtml
                  contentWidth={width}
                  stylesheet={styles}
                  source={{ html: jobData?.content.rendered }}
                  // classesStyles={}
                  tagsStyles={tagsStyles}
                />
              </View>
              <View
                style={{
                  marginBottom: 10,
                  padding: 10,
                  backgroundColor: "#fff",
                  borderRadius: 5,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginVertical: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => Linking.openURL(link)}
                    style={styles.icons}
                  >
                    <MaterialCommunityIcons
                      name="web"
                      size={30}
                      color="#1962FF"
                    />

                    <Text style={{ color: "#424242" ,fontWeight:"800" }}>Visit site</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(`whatsapp://send?text=${link}`)
                    }
                    style={styles.icons}
                  >
                    <Ionicons
                      name="ios-logo-whatsapp"
                      size={30}
                      color="#33cc33"
                    />
                    <Text style={{ color: "#424242" ,fontWeight:"800" }}>Whatsapp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onShare} style={styles.icons}>
                    <Entypo name="share" size={30} color="#0099e6" />
                    <Text style={{ color: "#424242" ,fontWeight:"800" }}>Share</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => storeData()}
                    style={styles.icons}
                  >
                    <Ionicons name="save" size={30} color="red" />
                    <Text style={{ color: "#424242" ,fontWeight:"800" }}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ marginVertical: 20 }}>
            <ActivityIndicator color="#515256" size="large" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default JobDetaile;

const styles = StyleSheet.create({
  icons: {
    alignItems: "center",
  },
  p: {
    color: "black",
    fontSize: 15,
  },
  table: {
    borderRightColor: "gray",
  },
  li: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
  td: {
    color: "black",
    padding: 20,
    marginLeft: "50px",
    textAlign: "right",
  },
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
