import { useRef, useEffect } from 'react';
import { StatusBar } from "react-native";
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { Background } from "./src/components/Background";
import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import './src/services/notificationConfigs'
import { getPushNotificationToken } from './src/services/getPushNotificationToken'

export default function App() {
  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificationToken()
  }, []);

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(console.log)

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(console.log)

    return () => {
      if(getNotificationListener.current){
        Notifications.removeNotificationSubscription(getNotificationListener.current)
      }

      if(responseNotificationListener.current){
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  }, [])

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
