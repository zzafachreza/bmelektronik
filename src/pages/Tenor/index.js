import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';

export default function Tenor({route}) {
  const item = route.params;
  const total = parseInt(
    item.total.toString().replace(',', '').replace(',', ''),
  );

  const [cicilan, setCicilan] = useState(0);
  let perbulan = 0;

  if (item.tenor == 12) {
    perbulan = (total + (total * 36) / 100) / 12;
  } else {
    perbulan = (total + (total * 30) / 100) / 10;
  }

  const data = [];

  for (var i = 1; i <= item.tenor; i++) {
    data.push({
      id: i,
    });
  }

  return (
    <SafeAreaView style={{padding: 10}}>
      <ScrollView>
        {data.map(item => {
          return (
            <View
              style={{
                padding: 10,
                backgroundColor: colors.white,
                elevation: 1,
                marginVertical: 5,
                borderRadius: 5,
                flexDirection: 'row',
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 18,
                    color: colors.primary,
                  }}>
                  Angsuran ke - {item.id}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: fonts.secondary[600],
                  right: 5,
                  fontSize: windowWidth / 15,
                }}>
                Rp. {Math.round(perbulan).toLocaleString()}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View>
        <Text></Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
