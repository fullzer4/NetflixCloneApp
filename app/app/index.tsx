import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button, Linking, Pressable, StyleSheet, Text, View, Image } from 'react-native';

const App = () => {

  const openSignup = () => {
    alert("signup")
  }

  return (
    <View style={styles.container}>
      <StatusBar/>
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
          <Link style={styles.NavbarLinks} href="/login">ENTRAR</Link>
        </View>
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text>Bem vindo ao meu Clone do app da netflix</Text>
      </View>

      {/* Botao */}
      <Pressable style={styles.button} onPress={() => openSignup()}>
        <Text style={styles.buttonText}>VAMOS LÁ</Text>
      </Pressable>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: "space-between",
    padding: 10,
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
    padding: 5,
    marginTop: 5,
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
    letterSpacing: 0.5,
  }
});

export default App