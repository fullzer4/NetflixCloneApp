import { useRouter } from 'expo-router';
import { useState } from 'react';
import {Linking, Pressable, StyleSheet, Text, View, Image, Animated, TextInput } from 'react-native';

const App = () => {
  const [placeholder, setPlaceholder] = useState('Email');
  const [email, setEmail] = useState("");

  const bottomPosition = new Animated.Value(-1000);

  const openSignup = () => {
    Animated.timing(bottomPosition, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const closeSignup = () => {
    Animated.timing(bottomPosition, {
      toValue: -1000,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }

  const router = useRouter();

  const sendSignin = () => {
    router.push("/login")
  }

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.Navbar}>
        <Image style={styles.Logo} source={require(
          '../assets/Netflix.png',
        )}></Image>
        <View style={styles.NavbarText}>
          <Text 
            style={styles.NavbarLinks}
            onPress={() => { 
              Linking.openURL('https://github.com/fullzer4/NetflixCloneApp'); 
            }}>GITHUB</Text> 
          <Pressable onPress={() => sendSignin()}>
            <Text style={styles.NavbarLinks} >ENTRAR</Text>
          </Pressable>
        </View>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Image style={styles.CardImage} source={require(
          '../assets/Anime.webp',
        )}></Image>
      </View>

      {/* Botao */}
      <Pressable style={styles.button} onPress={() => openSignup()}>
        <Text style={styles.buttonText}>VAMOS LÁ</Text>
      </Pressable>

      {/* PopUp Signup */}
      <Animated.View style={[styles.Popup, { bottom: bottomPosition }]}>
        <Pressable style={styles.Close} onPress={() => closeSignup()}>
          <Image style={styles.ClosePop} source={require(
            '../assets/close2.png',
          )}></Image>
        </Pressable>
        <View style={styles.FormPopup}>
          <Text style={styles.FormTitulo}>Tudo pronto para assistir?</Text>
          <Text style={styles.FormDescricao}>Informe seu email para criar ou acessar sua conta.</Text>
          <TextInput 
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#8e8e93"
            style={styles.input}
            onFocus={() => setPlaceholder("")}
            onBlur={() => setPlaceholder("Email")}
          />
          <Pressable style={styles.button} onPress={() => sendSignin()}>
            <Text style={styles.buttonText}>VAMOS LÁ</Text>
          </Pressable>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingBottom: 25,
  },
  button: {
    backgroundColor: "#d31b1b",
    width: "95%",
    height: "7%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#eee",
    fontSize: 18,
    letterSpacing: 1,
  },
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  Navbar: {
    width: "100%",
    height: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginTop: 20,
    zIndex: 1,
  },
  Logo: {
    height: 45,
    width: 90,
  },
  NavbarText: {
    display:"flex",
    flexDirection: "row",
    gap: 20,
  },
  NavbarLinks: {
    color: '#eee',
    fontSize: 15,
    letterSpacing: 0.5
  },
  CardImage:{
    height: 450,
    width: 300,
    borderRadius: 15,
  },
  Popup:{
    position: 'absolute',
    backgroundColor: '#ffffff',
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
  },
  Close:{
    marginTop: 40,
    margin: 30,
    alignItems: "flex-end",
  },
  ClosePop:{
    height: 20,
    width: 20,
  },
  FormPopup: {
    marginTop: 25,
    display: "flex",
    width:"100%",
    height: "100%",
    alignItems: "center",
    gap: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  FormTitulo: {
    color: '#000000',
    fontSize: 28,
    letterSpacing: 0.5,
    fontWeight: "500",
    textAlign: "center",
    paddingLeft: 40,
    paddingRight: 40,
  },
  FormDescricao: {
    color: '#000000',
    fontSize: 15,
    letterSpacing: 0.5,
    fontWeight: "400",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    width: "90%"
  },
});

export default App