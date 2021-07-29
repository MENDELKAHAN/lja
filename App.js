import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function App() {

const [zamanimLoading, setZamanimLoading] = useState(true);
const [zamanim, setZamanim] = useState([]);

const [weatherLoading, setWeatherLoading] = useState(true);
const [weather, setWeather] = useState([]);

const getCalender = async () => {
  try {
    const response = await fetch('http://www.hebcal.com/shabbat/?cfg=json&geonameid=2643741&m=50');
    const json = await response.json();
    setZamanim(json);
  } catch (error) {
    console.error(error);
  } finally {
    setZamanimLoading(false);
  }
}

const getWeather = async () => {
  try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=london&appid=47686cb56b700a7978f8dbe52f283e67');
    const json = await response.json();
    setWeather(json);
  } catch (error) {
    console.error(error);
  } finally {
    setWeatherLoading(false);
  }
}


useEffect(() => {
  getCalender();
  getWeather();
}, []);




  return (
    <View style={styles.container}>
       <View style={styles.section} >

       

       <Text style={styles.title}>Weather</Text>
       <View style={styles.secondary} >
       {weatherLoading ? <ActivityIndicator/> : (
         <View>
              <Text>London</Text>
              <Text>{weather.weather[0].main} / {weather.weather[0].description}</Text>
              <Text>{Number((weather.main.temp - 273.15).toFixed(2))} &#8451;
</Text>
              
          </View>

       )}
       </View>
       </View>
       <View style={styles.section} >
       <Text style={styles.title}>Zamunim</Text>
       <View style={styles.secondary} >
       {zamanimLoading ? <ActivityIndicator/> : (
         <View>
              <Text>{zamanim.items[1].hebrew}</Text>
              <Text>{zamanim.items[0].title}</Text>
              
          </View>
         

       )}
       </View>
       </View>

        <View style={styles.section} >

       

       <Text style={styles.title}>section 3</Text>
       <View style={styles.secondary} >
       
       </View>
       </View>
     
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
      justifyContent: 'space-between',
  },
  section :{
    width: "100%", 
    height: 250,
    borderStyle: 'dashed', 
   borderWidth: 1,
   borderColor: 'gray'

  },
  title:{
    fontSize: 50,
    textAlign:"center",
    backgroundColor: "#e8e8e8"
  },
  secondary:{
    padding:"1em"
  }

});
