import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";

export default function Perfil() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_header}>
        <View style={styles.container_nav}>
          <Image
            source={require("../../../assets/miniLogo.png")}
            resizeMode="contain"
          />
          <View style={styles.nav_links}>
            <TouchableOpacity
              style={styles.touchableopacity_header}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.txt_links}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchableopacity_header}>
              <Text style={styles.txt_links}>Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={require("../../../assets/LineHeader.png")}
          style={{ marginTop: 10 }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.outerBorder}>
        {/* Parte superior esquerda da borda - Só Android */}
        {Platform.OS === "android" && <View style={styles.topLeftPart}></View>}
        {/* Outras partes do seu layout */}

        {/* Parte restante da borda */}
        <View style={styles.remainderBorder}></View>

        {/* Contêiner da imagem */}
        <View style={styles.imgPerfilContainer}>
          <Image
            source={require("../../../assets/bigodao.jpeg")}
            style={styles.imgPerfil}
            resizeMode="cover"
          />
        </View>
        {/* Botão de edição - Bolinha no canto inferior direito */}
        <TouchableOpacity style={styles.editButton}>
          <Image
            source={require("../../../assets/editImg.png")} // Ícone de edição
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.txt_nome}>Breno A. Silva</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditarPerfil")}>
          <ImageBackground
            source={require("../../../assets/background1.png")} // Substitua pelo caminho da sua imagem
            style={styles.conteiner_bt1}
          >
            <View style={styles.bt_editPerfil}>
              <Image
                source={require("../../../assets/editImg.png")}
                resizeMode="cover"
              ></Image>
            </View>
            <Text style={styles.txtBt}>Edite seu Perfil</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MinhasInformacoes")}
        >
          <ImageBackground
            source={require("../../../assets/background2.png")} // Substitua pelo caminho da sua imagem
            style={styles.conteiner_bt2}
          >
            <View style={styles.bt_editPerfil}>
              <Image
                source={require("../../../assets/perfilImg.png")}
                resizeMode="cover"
              ></Image>
            </View>
            <Text style={styles.txtBt}>Minhas Informações</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("DietaDiaria")}>
          <ImageBackground
            source={require("../../../assets/background3.png")} // Substitua pelo caminho da sua imagem
            style={styles.conteiner_bt3}
          >
            <View style={styles.bt_editPerfil}>
              <Image
                source={require("../../../assets/dieta.png")}
                resizeMode="cover"
              ></Image>
            </View>
            <Text style={styles.txtBt}>Dieta Diária</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity style={styles.conteiner_btSalvar}>
          <View style={styles.bt_sair}>
            <Image
              source={require("../../../assets/sairBt.png")}
              resizeMode="contain"
            ></Image>
          </View>
          <Text style={styles.txtBt}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    top: 80,
  },

  container_nav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  container_header: {
    width: "80%",
    alignItems: "center",
  },

  nav_links: {
    flexDirection: "row",
    top: 8,
  },

  txt_links: {
    color: "#B5B2C6",
    fontSize: 34,
    paddingHorizontal: 10,
    fontFamily: "BreeSerif_400Regular",
  },

  body: {
    top: 30,
    alignItems: "center",
    marginTop: 5,
    width: "90%",
    height: 400,
    // borderWidth: 0.5,
    // backgroundColor: "red",
  },

  outerBorder: {
    position: "relative", // para possibilitar o uso de posicionamento absoluto
    width: 200,
    height: 200,
    borderRadius: 100, // forma circular
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },

  topLeftPart: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%", // metade do círculo
    height: "50%",
    borderTopLeftRadius: 100, // arredondado apenas no topo esquerdo
    borderWidth: 10,
    borderColor: "#D5D3DD", // cor da parte superior esquerda
    borderBottomWidth: 0, // remove a borda inferior
    borderRightWidth: 0, // remove a borda direita
    zIndex: 2, // garantir que fique por cima da parte restante
  },

  remainderBorder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "#B4B1C3", // cor do restante da borda
    zIndex: 1, // ficar abaixo da parte superior esquerda
  },

  imgPerfilContainer: {
    position: "absolute",
    width: 180, // largura da imagem de perfil
    height: 180, // altura da imagem de perfil
    borderRadius: 90, // circular
    overflow: "hidden", // para garantir que a imagem fique dentro do contêiner circular
    zIndex: 3, // garantir que a imagem fique acima das bordas
    justifyContent: "center",
    alignItems: "center",
  },

  imgPerfil: {
    width: "100%",
    height: "100%",
  },

  // Estilo da bolinha de editar
  editButton: {
    position: "absolute",
    bottom: 5, // Ajuste fino para posicionar no canto inferior direito
    right: 5, // Ajuste fino para posicionar no canto inferior direito
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#B4B1C3",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4, // Garantir que fique acima da imagem de perfil e da borda
    borderWidth: 4,
    borderColor: "#D5D3DD", // Mesma cor da borda para manter a consistência
  },

  editIcon: {
    width: 25,
    height: 25,
  },

  txt_nome: {
    color: "#fff",
    fontSize: 34,
    fontFamily: "BreeSerif_400Regular",
    marginBottom: 10,
  },

  conteiner_bt1: {
    width: 309,
    display: "flex",
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    marginBottom: 20,
  },

  conteiner_bt2: {
    width: 347,
    display: "flex",
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    marginBottom: 20,
  },

  conteiner_bt3: {
    width: 241,
    display: "flex",
    flexDirection: "row",
    height: 80,
    alignItems: "center",
    marginBottom: 20,
  },

  bt_sair: {
    width: 50,
    height: 50,
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 25,
    justifyContent: "center",
  },

  conteiner_btSalvar: {
    backgroundColor: "#B4B1C3",
    width: "70%",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  bt_editPerfil: {
    backgroundColor: "#B4B1C3",
    width: 51,
    height: 51,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  txtBt: {
    left: 12,
    color: "#fff",
    fontSize: 28,
    fontFamily: "BreeSerif_400Regular",
  },
});
