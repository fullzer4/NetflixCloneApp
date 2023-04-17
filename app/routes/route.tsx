import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="NovaPagina" component={NovaPagina} />
  </Stack.Navigator>
</NavigationContainer>