import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import {MyHeader} from '../../components';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import {colors} from '../../utils/colors';
import LottieView from 'lottie-react-native';
import {fonts, windowWidth} from '../../utils/fonts';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function BarangDiskon({navigation, route}) {
  const [key, setKey] = useState('');
  const [cari, setCari] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .post('https://zavalabs.com/bmelektronik/api/barang_baru.php')
      .then(res => {
        console.log('hasil cari', res.data);
        setData(res.data);
        // setData(res.data.data);
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Barang', item)}
        activeOpacity={1.0}>
        <Image style={styles.image} source={{uri: item.foto}} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 14,
              flex: 1,
              // backgroundColor: colors.primary,
              paddingHorizontal: 5,
              paddingVertical: 5,
              // borderBottomLeftRadius: 20,
              // borderTopRightRadius: 20,
              color: colors.black,
              // textAlign: 'center',
            }}>
            {item.nama_barang}
          </Text>
        </View>
        <View style={styles.detailsContainer}>
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 25,
                color: colors.warning,
              }}>
              {' '}
              Rp. {new Intl.NumberFormat().format(item.harga)}
            </Text>

            {item.diskon > 0 ? (
              <>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: fonts.secondary[600],
                      fontSize: windowWidth / 30,
                      color: colors.border,
                      left: 5,
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
                      backgroundColor: colors.warning,
                      borderRadius: 5,
                      color: colors.white,
                      paddingHorizontal: 5,
                    }}>
                    {Math.round(100 - (item.harga / item.harga_awal) * 100)}%
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    padding: 10,
                  }}>
                  <Text style={styles.subTitle}>{item.keterangan}</Text>
                </View>
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  padding: 10,
                }}>
                <Text style={styles.subTitle}>{item.keterangan}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#FFF',
          }}>
          <FlatList
            numColumns={2}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{flex: 1, backgroundColor: colors.primary}}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  card: {
    flex: 0.5,
    shadowColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -10,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 5.32,

    elevation: 5,

    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,

    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  detailsContainer: {
    // padding: 10,
    flex: 1,
  },
  detailsContainerButton: {
    paddingHorizontal: 5,
  },
  title: {
    marginBottom: 7,
    fontFamily: fonts.secondary[800],
    fontSize: 15,
    color: colors.warning,
  },
  subTitle: {
    // flex: 1,
    // backgroundColor: 'red',
    fontFamily: fonts.secondary[400],
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
});
