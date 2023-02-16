import {useColorScheme, Animated} from 'react-native';
import React, {useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FoodScreen from "./screens/FoodScreen";
import LoginElements from "./screens/LoginElements";
import OrdersScreen from "./screens/OrdersScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CartScreen from "./screens/CartScreen";

let StatusBarColor = "light";
const Stack = createNativeStackNavigator();

export default function App() {
  let colorScheme = useColorScheme();

  if (colorScheme !== 'dark') {
    StatusBarColor = "light";
    console.log(colorScheme)
  } else {
    StatusBarColor = "dark"
    console.log(colorScheme)
  }

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }
    ).start();
  }, []);

    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });


  return (
      // <Animated.View style={{ opacity: fadeAnim }}>
      //   <SafeAreaView>
      //     <StatusBar style={[StatusBarColor]}/>
      //     <Login />
      //   </SafeAreaView>
      // </Animated.View>
      <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName="Home" mode="modal">
              <Stack.Screen screenOptions={forFade} options={{headerShown: false, }} name="Login" component={LoginElements}/>
              <Stack.Screen screenOptions={forFade} options={{headerShown: false, }} name="Food" component={FoodScreen}/>
              <Stack.Screen screenOptions={forFade} options={{headerShown: false, }} name="Orders" component={OrdersScreen}/>
              <Stack.Screen screenOptions={forFade} options={{headerShown: false, }} name="Cart" component={CartScreen}/>
              <Stack.Screen screenOptions={forFade} options={{headerShown: false, }} name="Settings" component={SettingsScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}