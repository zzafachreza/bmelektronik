import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Linking,
} from 'react-native';
import {storeData, getData} from '../../utils/localStorage';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyButton, MyInput, MyGap, MyPicker} from '../../components';

export default function Account({navigation}) {
  const [user, setUser] = useState({});
  const [iLogo, setiLogo] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      setUser(res);
      // console.log(user);
      setiLogo(res.nama_lengkap.substring(0, 1));
    });
  }, []);

  const handleSave = () => {
    storeData('user', null);

    navigation.replace('GetStarted');
  };

  return (
    <ImageBackground
      // source={require('../../assets/back.jpeg')}
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <View
        style={{
          padding: 10,
          // backgroundColor: 'blue',

          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            padding: 10,
            // backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              // borderWidth: 1,
              backgroundColor: colors.secondary,
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
            }}>
            <Text
              style={{
                fontSize: 50,
                color: 'white',
              }}>
              {iLogo}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 25,
              fontFamily: fonts.secondary[600],
              top: 10,
              color: colors.white,
            }}>
            {user.nama_lengkap}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: fonts.secondary[400],
              top: 10,
              color: colors.white,
            }}>
            {user.tlp}
          </Text>
        </View>

        {/* mandiri */}
        <View
          style={{
            backgroundColor: colors.white,
            padding: 10,
            margin: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              E - Mail
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: 16,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              {user.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}>
            <Text
              style={{
                flex: 1,
                color: colors.black,
                fontSize: 16,
                fontFamily: fonts.secondary[400],
                padding: 10,
              }}>
              Alamat
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: 16,
                fontFamily: fonts.secondary[600],
                padding: 10,
              }}>
              {user.alamat}
            </Text>
          </View>
        </View>
        {/* mandiri */}
        <View
          style={{
            padding: 10,
            // backgroundColor: 'green',
            flex: 1,
          }}>
          {/* <View
            style={{
              marginVertical: 5,
              padding: 10,
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              E-mail
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
              }}>
              {user.email}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 5,
              padding: 10,
              borderRadius: 10,
              backgroundColor: colors.white,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
              }}>
              Alamat
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
              }}>
              {user.alamat}
            </Text>
          </View> */}

          <MyButton
            onPress={handleSave}
            title="Keluar"
            borderColor={colors.white}
            borderSize={1}
            iconColor={colors.white}
            Icons="log-out-outline"
          />
          <MyGap jarak={20} />
          <MyButton
            onPress={() =>
              Linking.openURL('https://goo.gl/maps/xmTcLZ7piRiD5Dth9')
            }
            title="Lihat Alamat Toko di Maps"
            warna={colors.white}
            colorText={colors.primary}
            iconColor={colors.primary}
            Icons="map-outline"
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
