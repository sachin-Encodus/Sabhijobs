import {
  NavigationContainer } from "@react-navigation/native";

import React, { useEffect, useState } from "react";
import VersionCheck from "react-native-version-check";
import {
  View,
  Text,
  Linking,
  StyleSheet,
  useWindowDimensions,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  BackHandler,
} from "react-native";
import { fcmService } from "./app/Notification/FCMService";
import { localNotificationService } from "./app/Notification/LocalNotificationService";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import {navigationRef , navigate} from "./src/RootNavigation"

import Colors from "./src/constants/Colors";

import Styles from "./src/common/Styles";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/screens/Home";
import Qualification from "./src/screens/Qualification";
import JobDetail from "./src/screens/JobDetail";
import JobsList from "./src/screens/JobsList";
import { LogBox } from "react-native";
import SavedJobs from "./src/screens/SavedJobs";
import RadialGradient from "react-native-radial-gradient";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import CategoryJobs from "./src/screens/CategoryJobs";
import SearchJobs from "./src/screens/SearchJobs";
import SplashScreen from "./src/screens/SplashScreen";
import Demo from "./src/screens/Demo";

LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const UserView = ({ navigation }) => {
  return (
    <TouchableOpacity>
      <View style={styles.drawerHeader}>
        <Image
          style={styles.profileImage}
          source={require("./src/assets/s.png")}
        />
      </View>
    </TouchableOpacity>
  );
};

const CustomDrawer = (props) => {
  return (
    <RadialGradient
      style={Styles.container}
      colors={[Colors.white, "rgba(255,255,255,0.6)", "rgba(255,255,255,0.4)"]}
      center={[145, 100]}
      radius={650}
    >
      <DrawerContentScrollView {...props}>
        <UserView {...props} />
        <DrawerItemList {...props} activeTintColor={Colors.accent} />
        <DrawerItem
          label="About us"
          onPress={() => Linking.openURL("https://www.sabhijobs.com/about-us/")}
          icon={({ color, size }) => (
            <FontAwesome5 name="user-tie" color={color} size={size} />
          )}
          labelStyle={{ fontSize: 14 }}
        />
        <DrawerItem
          label="Contact us"
          onPress={() =>
            Linking.openURL("https://www.sabhijobs.com/contact-us/")
          }
          icon={({ color, size }) => (
            <AntDesign name="infocirlce" color={color} size={size} />
          )}
          labelStyle={{ fontSize: 14 }}
        />
        <DrawerItem
          label="Privacy policy"
          onPress={() =>
            Linking.openURL("https://www.sabhijobs.com/privacy-policy/")
          }
          icon={({ color, size }) => (
            <MaterialIcons name="policy" color={color} size={size} />
          )}
          labelStyle={{ fontSize: 14 }}
        />
        <DrawerItem
          label="Terms & Condition"
          onPress={() =>
            Linking.openURL("https://www.sabhijobs.com/terms-and-conditions/")
          }
          icon={({ color, size }) => (
            <Ionicons name="newspaper-sharp" color={color} size={size} />
          )}
          labelStyle={{ fontSize: 14 }}
        />
        <DrawerItem
          label="Disclaimer"
          onPress={() =>
            Linking.openURL("https://www.sabhijobs.com/disclaimer/")
          }
          icon={({ color, size }) => (
            <AntDesign name="exclamationcircleo" color={color} size={size} />
          )}
          labelStyle={{ fontSize: 14 }}
        />
        <DrawerItem
          label="Rate our App"
          onPress={() =>
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.sabhijobs"
            )
          }
          icon={({ color, size }) => (
            <Entypo name="google-play" color={color} size={size} />
          )}
          labelStyle={{ fontSize: 14 }}
        />
        <DrawerItem
          label="Visit our  website"
          onPress={() => Linking.openURL("https://www.sabhijobs.com")}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="web" color={color} size={size} />
          )}
          labelStyle={{ fontSize: 14 }}
        />
      </DrawerContentScrollView>
    </RadialGradient>
  );
};

function MyDrawer() {
  const dimension = useWindowDimensions();
  const drawerType = dimension.width >= 700 ? "permanent" : "front";
  return (
    <Drawer.Navigator
      drawerStyle={{
        width: 280,
      }}
      screenOptions={{
        labelStyle: { fontSize: 17, fontWeight: "bold" },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Saved Items"
        component={SavedJobs}
        options={{
          drawerIcon: ({ color, size }) => (
            <Entypo name="save" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const App = () => {

// console.log("====xxxxxxxxxxxxxxx", navigationRef.current.getRootState());
//  const linking = {
//    prefixes: ["sabhijobs://"],
//    config: {
//      screens: {
//        Home: "home",
//        JobDetail: "jobdetail/:id",
//      },
//    },
//  };

//  useEffect(() => {
//     const unsubscribe = messaging().onMessage(async (remoteMessage) => {
//       PushNotification.localNotification({
//         message: remoteMessage.notification.body,
//         title: remoteMessage.notification.title,
//         bigPictureUrl: remoteMessage.notification.android.imageUrl,
//         smallIcon: remoteMessage.notification.android.imageUrl,
//       });
//     });
//     return unsubscribe;
//   }, []);








    useEffect(() => {
      fcmService.registerAppWithFCM();
      fcmService.register(onRegister, onNotification, onOpenNotification);
      localNotificationService.configure(onOpenNotification);
    }, []);

  const onRegister = (token) => {
    console.log("[App] Token", token);
  };
   const onNotification = (notify) => {
     // console.log("[App] onNotification", notify);
     const options = {
       soundName: "default",
       playSound: true,
       largeIcon: "ic_launcher", // (optional) default: "ic_launcherS"
       smallIcon: "ic_launcher", // (optional) default:  "ic_notification" with fallback for "ic_launcher"
     };

     localNotificationService.showNotification(
       0,
       notify.notification.title,
       notify.notification.body,
       notify,
       options
     );
   };

  const onOpenNotification = async (notify) => {
    if(notify.foreground){
       if(notify.userInteraction){
   if (notify.data.type && notify.data.type == "jobdetail") {
     navigate("JobDetail", { id: notify.data.id });
   }
   }
    }else{
 if (notify.data.type && notify.data.type == "jobdetail") {
   navigate("JobDetail", { id: notify.data.id });
 }
    }
   
  };











  // const linking = {
  //   prefixes: ["sabhijobs://"],
  //   config: {
  //     screens: {
  //       Home: "home",
  //       JobDetail: "jobdetail/:id",
  //     },
  //   },
  // };
  
  useEffect(() => {
    checkVersion();
  }, []);

  const checkVersion = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();

      if (updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          "Please Update",
          "You will have to update your app to the latest version to continue using."[
            {
              text: "Update",
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            }
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };



  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false }}
        initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Drawer" component={MyDrawer} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="JobsList" component={JobsList} />
        <Stack.Screen name="JobDetail" component={JobDetail} />
        <Stack.Screen name="Qualification" component={Qualification} />
        <Stack.Screen name="CategoryJobs" component={CategoryJobs} />
        <Stack.Screen name="Search" component={SearchJobs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  cardStyle: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  drawerNavigator: {
    width: 290,
    backgroundColor: "transparent",
    // backgroundColor: Colors.accent,
  },
  absolute: {
    flex: 1,
    height: "100%",
  },
  icon: {
    paddingBottom: 2,
  },
  drawerHeader: {
    marginVertical: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    resizeMode: "contain",
    width: widthPercentageToDP("40%"),
    height: heightPercentageToDP("10%"),
  },
  textContainer: {},
  title: {
    color: Colors.accent,
    fontSize: 22,
    fontWeight: "500",
    textTransform: "capitalize",
    textAlign: "center",
    marginTop: 10,
  },
  description: {
    color: Colors.accent,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginHorizontal: 8,
  },
  blurAbsolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

// https://documentation.onesignal.com/docs/data-tag-implementation#gettags-method
// i am rohit
// a am raja
