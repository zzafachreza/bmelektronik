import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {MyInput, MyGap, MyButton} from '../../components';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import {Icon} from 'react-native-elements';

export default function Kredit({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    nama_lengkap: null,
    email: null,
    password: null,
    telepon: null,
    alamat: null,
  });

  const simpan = () => {
    setLoading(true);
    console.log(data);
    axios
      .post('https://zavalabs.com/bmelektronik/api/register.php', data)
      .then(res => {
        console.log(res);
        let err = res.data.split('#');

        // console.log(err[0]);
        if (err[0] == 50) {
          setTimeout(() => {
            setLoading(false);
            showMessage({
              message: err[1],
              type: 'danger',
            });
          }, 1200);
        } else {
          setTimeout(() => {
            navigation.replace('Success', {
              messege: res.data,
            });
          }, 1200);
        }
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <MyGap jarak={20} />
        <MyInput
          label="Nama Pendaftar"
          iconname="person"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Nomor Telepon Pendaftar"
          iconname="call"
          keyboardType="number-pad"
          value={data.telepon}
          onChangeText={value =>
            setData({
              ...data,
              telepon: value,
            })
          }
        />
        <MyInput
          label="Alamat Pendaftar"
          iconname="map"
          value={data.email}
          onChangeText={value =>
            setData({
              ...data,
              email: value,
            })
          }
        />
        <MyGap jarak={10} />
        <View
          style={{
            paddingVertical: 20,
            borderRadius: 10,
            backgroundColor: colors.border,
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: windowWidth / 22,
                fontFamily: fonts.secondary[400],
              }}>
              Fotocopy KTP Pendaftar
            </Text>
          </View>
          <View>
            <Icon
              color={colors.white}
              type="ionicon"
              name="cloud-upload-outline"
            />
          </View>
        </View>
        <MyGap jarak={10} />
        <MyInput
          label="Nama Penanggung Jawab"
          iconname="person-outline"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Nomor Telepon Penanggung Jawab"
          iconname="call-outline"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Alamat Penanggung Jawab"
          iconname="map-outline"
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />
        <MyGap jarak={10} />
        <View
          style={{
            paddingVertical: 20,
            borderRadius: 10,
            backgroundColor: colors.border,
            flexDirection: 'row',
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: colors.white,
                fontSize: windowWidth / 22,
                fontFamily: fonts.secondary[400],
              }}>
              Fotocopy KTP Penanggung Jawab
            </Text>
          </View>
          <View>
            <Icon
              color={colors.white}
              type="ionicon"
              name="cloud-upload-outline"
            />
          </View>
        </View>
        <MyGap jarak={20} />
        <MyButton
          warna={colors.primary}
          title="REGISTER"
          Icons="log-in"
          onPress={simpan}
        />
        <MyGap jarak={20} />
      </ScrollView>
      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
