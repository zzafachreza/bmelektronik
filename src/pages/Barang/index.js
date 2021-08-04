import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts, windowWidth} from '../../utils/fonts';
import {MyButton, MyGap} from '../../components';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Modalize} from 'react-native-modalize';
import {showMessage} from 'react-native-flash-message';
import {getData} from '../../utils/localStorage';
import axios from 'axios';

export default function Barang({navigation, route}) {
  const item = route.params;

  const [jumlah, setJumlah] = useState(1);
  const [user, setUser] = useState({});

  useEffect(() => {
    getData('user').then(res => {
      console.log('data user', res);
      setUser(res);
    });
  }, []);

  const modalizeRef = useRef();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const addToCart = () => {
    const kirim = {
      id_member: user.id,
      id_barang: item.id,
      nama_barang: item.nama_barang,
      qty: jumlah,
      uom: item.uom,
      harga: item.harga,
      total: jumlah * item.harga,
      foto: item.foto,
    };
    console.log('kirim tok server', kirim);
    axios
      .post('https://zavalabs.com/bmelektronik/api/barang_add.php', kirim)
      .then(res => {
        console.log(res);
        // navigation.navigate('Success2', {
        //   message: 'Berhasil Tambah Keranjang',
        // });
        showMessage({
          type: 'success',
          message: 'Berhasil Masuk Keranjang',
        });
        modalizeRef.current.close();
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: '100%',
            aspectRatio: 1.5,
          }}
          source={{
            uri: item.foto,
          }}
        />
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
          }}>
          <View
            style={{
              padding: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
                color: colors.black,
              }}>
              {item.nama_barang}
            </Text>
            <Text
              style={{
                marginVertical: 5,
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.warning,
              }}>
              Rp. {new Intl.NumberFormat().format(item.harga)}
            </Text>
            {item.diskon > 0 ? (
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 25,
                    color: colors.border,

                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                    textDecorationColor: colors.black,
                  }}>
                  {' '}
                  Rp. {new Intl.NumberFormat().format(item.harga_awal)}
                </Text>
                <Text
                  style={{
                    left: 10,
                    backgroundColor: colors.primary,
                    borderRadius: 5,
                    color: colors.white,
                    paddingHorizontal: 5,
                  }}>
                  {Math.round(100 - (item.harga / item.harga_awal) * 100)}%
                </Text>
              </View>
            ) : (
              <View></View>
            )}
          </View>
          <View style={{padding: 10}}>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                fontSize: windowWidth / 30,
                color: colors.black,
              }}>
              {item.keterangan} ini adalah deskripsi dari produk
            </Text>
          </View>
        </View>
      </View>

      <MyButton
        fontWeight="bold"
        radius={0}
        title="TAMBAH KERANJANG"
        warna={colors.warning}
        onPress={onOpen}
      />

      <Modalize
        withHandle={false}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        snapPoint={275}
        HeaderComponent={
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Image
                  resizeMode="contain"
                  style={{
                    width: 100,
                    borderRadius: 20,
                    aspectRatio: 1,
                  }}
                  source={{uri: item.foto}}
                />
              </View>
              <View style={{flex: 1, padding: 10, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.warning,
                  }}>
                  Rp. {new Intl.NumberFormat().format(item.harga * jumlah)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => modalizeRef.current.close()}>
                <Icon type="ionicon" name="close-outline" size={35} />
              </TouchableOpacity>
            </View>
          </View>
        }
        withHandle={false}
        ref={modalizeRef}>
        <View style={{flex: 1, height: 330}}>
          <View style={{padding: 10, flex: 1}}>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                  }}>
                  Jumlah
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',

                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    jumlah == 1
                      ? showMessage({
                          type: 'danger',
                          message: 'Minimal pembelian 1 Pcs',
                        })
                      : setJumlah(jumlah - 1);
                  }}
                  style={{
                    backgroundColor: colors.secondary,
                    width: '30%',
                    borderRadius: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Icon type="ionicon" name="remove" color={colors.white} />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 16, fontFamily: fonts.secondary[600]}}>
                    {jumlah}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    jumlah >= item.stok
                      ? showMessage({
                          type: 'danger',
                          message: 'Pembelian melebihi batas !',
                        })
                      : setJumlah(jumlah + 1);
                  }}
                  style={{
                    backgroundColor: colors.secondary,
                    width: '30%',
                    borderRadius: 10,
                    marginLeft: 10,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon type="ionicon" name="add" color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>

            {/* <MyButton
              radius={20}
              fontWeight="bold"
              radius={0}
              title="TAMBAH KERANJANG"
              warna={colors.primary}
              onPress={addToCart}
            /> */}

            <View style={{marginTop: 15}}>
              <TouchableOpacity
                onPress={addToCart}
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                  padding: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 22,
                    color: colors.white,
                  }}>
                  TAMBAH KERANJANG
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
