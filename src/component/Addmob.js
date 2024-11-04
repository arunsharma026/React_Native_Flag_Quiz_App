import React , {useEffect } from 'react'
import { View , StyleSheet} from "react-native";
import 'expo-dev-client';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAd, TestIds, BannerAdSize, AdEventType, RewardedAdEventType } from 'react-native-google-mobile-ads';

const adUnitId =  'ca-app-pub-8086273455259861/1815533216';
 
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  // keywords: ['fashion', 'clothing'],
});

const Addmob = () => {

    useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        interstitial.show();
    });
    // Start loading the interstitial straight away
    interstitial.load();
    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  return (
   <View style={styles.container}>
  <BannerAd 
      size={BannerAdSize.BANNER} 
      unitId={TestIds.BANNER} 
      // unitId={"ca-app-pub-9152919921144751/4080981743"} 
      // requestOptions={{
      //   requestNonPersonalizedAdsOnly:true,
      // }}
      />
   </View>
  )
}

export default Addmob;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });