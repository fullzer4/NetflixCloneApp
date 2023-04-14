import { useState } from 'react';
import { Image, Pressable } from 'react-native';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const test = () => {
    alert(`${email}, ${password}`)
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.Logo}
          source={require('./assets/Netflix.png')}
        />
      </View>
      <View style={styles.Forms}>
        <TextInput style={styles.Input} placeholder='Email' placeholderTextColor="#999" onChangeText={text => setEmail(text)}/>
        <TextInput style={styles.Input} placeholder='Senha' placeholderTextColor="#999" onChangeText={text => setPassword(text)}/>
        <Pressable style={styles.Button} onPress={() => test()}>
          <Text style={styles.ButtonText}>Logar</Text>
        </Pressable>
      </View>
      <View>
        <Pressable style={styles.ButtonForgot} onPress={() => test()}>
          <Text style={styles.ButtonForgotText}>Esqueceu a senha?</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272626',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 45,
  },
  Logo: {
    width: 160,
    height: 80
  },
  Input: {
    backgroundColor: '#332f2f',
    color: '#dddada',
    height: 35,
    padding: 1,
    width: '100%',
    paddingHorizontal: 10,
    fontSize: 18,
    borderRadius: 5,
  },
  Forms: {
    width: 200,
    display: 'flex',
    gap: 32,
    alignItems:"center"
  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    height: 38,
    backgroundColor: '#332f2f',
    width: '70%'
  },
  ButtonText: {
    color: '#dddada',
    fontSize: 15
  },
  ButtonForgot: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    borderRadius: 4,
    height: 38,
    width: '70%',
  },
  ButtonForgotText: {
    color: '#dddada',
    fontSize: 15
  },
});
