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

export default function Checkout({navigation, route}) {
  const isFocused = useIsFocused();
  const item = route.params;
  navigation.setOptions({title: 'Bayar Sekarang'});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const [kirim, setKirim] = useState(item);

  const simpan = () => {
    setLoading(true);
    console.log('kirim ke server', item);
    setTimeout(() => {
      axios
        .post('https://zavalabs.com/bmelektronik/api/transaksi_add.php', item)
        .then(res => {
          console.log(res);
          setLoading(false);
        });

      navigation.replace('MainApp');
      showMessage({
        type: 'success',
        message: 'Transaksi Berhasil, Terima kasih',
      });
    }, 1200);
  };

  const getUser = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  useEffect(() => {
    setKirim({
      ...kirim,
      ongkir: 15000,
    });

    if (isFocused) {
      getUser();
    }
  }, [isFocused]);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, padding: 10}}>
          <Text
            style={{
              color: colors.black,
              fontSize: windowWidth / 20,
              fontFamily: fonts.secondary[400],
            }}>
            Alamat Pengiriman
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              elevation: 2,
              borderRadius: 10,
              marginVertical: 10,
              padding: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{}}>
                <Text
                  style={{
                    color: colors.black,
                    maxWidth: '80%',
                    fontSize: windowWidth / 20,
                    fontFamily: fonts.secondary[600],
                  }}>
                  {user.nama_lengkap}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    maxWidth: '80%',
                    fontSize: windowWidth / 22,
                    fontFamily: fonts.secondary[400],
                  }}>
                  {user.alamat}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Alamat', user)}
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  type="ionicon"
                  name="create-outline"
                  color={colors.primary}
                />
                <Text
                  style={{
                    color: colors.primary,

                    fontSize: windowWidth / 22,
                    fontFamily: fonts.secondary[400],
                  }}>
                  Ubah
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* pembayaran */}

        <View style={{flex: 2, padding: 10}}>
          <Text
            style={{
              color: colors.black,
              fontSize: windowWidth / 20,
              fontFamily: fonts.secondary[400],
            }}>
            Metode Pembayaran
          </Text>
          <Text
            style={{
              color: colors.primary,
              fontSize: windowWidth / 22,
              fontFamily: fonts.secondary[400],
            }}>
            Transfer Bank - BNI
          </Text>
          <View
            style={{
              backgroundColor: colors.white,
              elevation: 2,
              borderRadius: 10,
              marginVertical: 10,
              padding: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Image
                  source={require('../../assets/bni.png')}
                  style={{height: 100, width: 200}}
                  resizeMode="center"
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Metode', user)}
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  type="ionicon"
                  name="create-outline"
                  color={colors.primary}
                />
                <Text
                  style={{
                    color: colors.primary,

                    fontSize: windowWidth / 22,
                    fontFamily: fonts.secondary[400],
                  }}>
                  Ubah
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItem: 'center',
            padding: 10,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.border,
                fontSize: windowWidth / 20,
                fontFamily: fonts.secondary[400],
              }}>
              Sub Total Untuk Produk:
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.black,
                fontSize: windowWidth / 18,
                fontFamily: fonts.secondary[400],
              }}>
              Rp. {new Intl.NumberFormat().format(item.total)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItem: 'center',
            padding: 10,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.border,
                fontSize: windowWidth / 20,
                fontFamily: fonts.secondary[400],
              }}>
              Subtotal Pengiriman:
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.black,
                fontSize: windowWidth / 18,
                fontFamily: fonts.secondary[400],
              }}>
              Rp. {new Intl.NumberFormat().format(kirim.ongkir)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItem: 'center',
            padding: 10,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                color: colors.border,
                fontSize: windowWidth / 20,
                fontFamily: fonts.secondary[400],
              }}>
              Total Pembayaran:
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: colors.black,
                fontSize: windowWidth / 18,
                fontFamily: fonts.secondary[400],
              }}>
              Rp. {new Intl.NumberFormat().format(item.total + kirim.ongkir)}
            </Text>
          </View>
        </View>
        <View style={{padding: 10}}>
          <MyButton
            onPress={simpan}
            title="BUAT PESANAN"
            warna={colors.primary}
            style={{
              justifyContent: 'flex-end',
            }}
          />
        </View>
      </SafeAreaView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{backgroundColor: colors.primary}}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
