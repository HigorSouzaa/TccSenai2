import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Telas/Home/home";
import Login from "./src/Telas/Login/login";
import Cadastro from "./src/Telas/Cadastro/cadastro";
import Main from "./src/Telas/Main/main";
import Graph from "./teste";
import GerarDieta from "./src/Telas/GerarDieta/gerarDieta";
import Perfil from "./src/Telas/Perfil/perfil";
import EditarPerfil from "./src/Telas/EditarPerfil/editarperfil";
import MinhasInformacoes from "./src/Telas/MinhasInformacoes/minhasinformacoes";
import DietaDiaria from "./src/Telas/DietaDieta/dietadiaria";
import RecuperarSenha from "./src/Telas/RecuperarSenha/recuperarsenha";
import MudarSenha from "./src/Telas/MudarSenha/mudarsenha";
import InsiraEmail from "./src/Telas/InsiraEmail/insiraEmail";
import Cadastro2 from "./src/Telas/Cadastro2/cadastro2";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Cadastro2"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "#E6E3F5" },
        }}
      >
        <Stack.Screen name="Main" component={Main} />

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Graph" component={Graph} />
        <Stack.Screen name="GerarDieta" component={GerarDieta} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
        <Stack.Screen name="MinhasInformacoes" component={MinhasInformacoes} />
        <Stack.Screen name="DietaDiaria" component={DietaDiaria} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
        <Stack.Screen name="MudarSenha" component={MudarSenha} />
        <Stack.Screen name="InsiraEmail" component={InsiraEmail} />
        <Stack.Screen name="Cadastro2" component={Cadastro2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <MyStack></MyStack>;
}
