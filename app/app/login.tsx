import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter();

  const sendHome = () => {
    router.push("/")
  }

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.Navbar}>
        <Pressable style={styles.NavbarBox} onPress={() => sendHome()}>
          <Image style={styles.Arrow} source={require(
            '../assets/arrow.png',
          )}></Image>
  
          <Image style={styles.Logo} source={require(
            '../assets/Netflix.png',
          )}></Image>
        </Pressable>
      </View >
      {/* Forms */}
      <View style={styles.Forms}>
        <TextInput 
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#8e8e93"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#8e8e93"
          style={styles.input}
        />
        <Pressable style={styles.login}>
          <Text style={styles.loginText}>Entrar</Text>
        </Pressable>

        <Pressable style={styles.signup} onPress={() => router.push("/signup")}>
          <Text style={styles.signupText}>Novo por aqui? Inscreva-se agora.</Text>
        </Pressable>
      </View>
      {/* LoginExtraInfo */}
      <View style={styles.Extra}>
        <Text style={styles.signupText}>To use a Demo account Email: Demo@gmail.com Pass: DemoDemo</Text>
      </View>
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
  Navbar: {
    padding: 20,
    paddingLeft: 20,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%"
  },
  NavbarBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap:  10,
  },
  Forms: {
    width: "100%",
    paddingLeft: 30,
  },
  Extra: {
    width: "100%",
    paddingHorizontal: 45,
  },
  Logo: {
    height: 45,
    width: 90,
  },
  Arrow: {
    height: 12,
    width: 15,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#201f1fe6",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 16,
    color: "#eee",
    marginBottom: 20,
    width: "90%",
    height: 62,
  },
  login: {
    borderWidth: 2,
    borderColor: "#615f5f",
    width: "90%",
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10
  },
  loginText: {
    color: "#c7c1c1",
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: "600",
    textAlign: "center"
  },
  signupText: {
    color: "#c7c1c1",
    fontSize: 14,
    letterSpacing: 0.6,
    fontWeight: "600",
    textAlign: "center"
  },
  signup: {
    borderWidth: 2,
    width: "90%",
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 10,
  }
});

export default Login