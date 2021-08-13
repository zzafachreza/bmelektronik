import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import LottieView from 'lottie-react-native';
import {getData} from '../../utils/localStorage';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';
import {colors} from '../../utils/colors';
import {TouchableOpacity, Swipeable} from 'react-native-gesture-handler';
import {fonts, windowWidth} from '../../utils/fonts';
import {useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {showMessage} from 'react-native-flash-message';
export default function Metode({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View
        style={{
          backgroundColor: colors.white,
          padding: 10,
          borderRadius: 5,
          elevation: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.black,
                maxWidth: '80%',
                fontSize: windowWidth / 22,
                fontFamily: fonts.secondary[400],
              }}>
              Transfer Bank
            </Text>
          </View>
          <View>
            <Icon type="ionicon" name="chevron-down-outline" />
          </View>
        </View>
        <View style={{padding: 10}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/bukopin.png')}
                style={{height: 80, width: 100}}
                resizeMode="center"
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/bni.png')}
                style={{height: 80, width: 100}}
                resizeMode="center"
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/bri.png')}
                style={{height: 80, width: 100}}
                resizeMode="center"
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/mega.png')}
                style={{height: 80, width: 100}}
                resizeMode="center"
              />
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/mandiri.png')}
                style={{height: 80, width: 100}}
                resizeMode="center"
              />
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={require('../../assets/bca.png')}
                style={{height: 80, width: 100}}
                resizeMode="center"
              />
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          backgroundColor: colors.white,
          padding: 10,
          borderRadius: 5,
          elevation: 2,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.black,
                maxWidth: '80%',
                fontSize: windowWidth / 22,
                fontFamily: fonts.secondary[400],
              }}>
              Kartu Kredit BM Elektronik
            </Text>
          </View>
          <View>
            <Icon type="ionicon" name="chevron-down-outline" />
          </View>
        </View>
        <View
          style={{
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Kredit')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <Icon type="ionicon" name="add-circle" />
            </View>
            <Text
              style={{
                color: colors.black,
                left: 10,
                fontSize: windowWidth / 22,
                fontFamily: fonts.secondary[400],
              }}>
              Tambahkan Kartu Kredit BM Elektronik
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
