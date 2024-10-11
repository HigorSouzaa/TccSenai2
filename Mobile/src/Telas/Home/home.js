import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";

export default function Home() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container_header}>
        <View style={styles.container_nav}>
          <Image
            source={require("../../../assets/miniLogo.png")}
            resizeMode="contain"
          />
          <View style={styles.nav_links}>
            <TouchableOpacity style={styles.touchableopacity_header}>
              <Text style={styles.txt_links}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchableopacity_header}
              onPress={() => navigation.navigate("Perfil")}
            >
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
      <View style={styles.container_body}>
        <View style={styles.up_body}>
          <Text style={styles.txt_msm_usuario}>Olá ?????</Text>
          <TouchableOpacity
            style={styles.bt_gerar_dieta}
            onPress={() => navigation.navigate("GerarDieta")}
          >
            <Text style={styles.txt_bt_gerarDieta}>Gerar Dieta</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollView_body}>
          <View style={styles.conteiner_calorias}>
            <View style={styles.header_calorias}>
              <Text style={styles.h1_calorias}>Calorias</Text>
              <Text style={styles.p_calorias}>Restante = Meta - Alimentos</Text>
            </View>
            <View style={styles.body_calorias}>
              <View style={styles.rightBody_calorias}>
                <Text style={styles.txt_caloriasN}>0.000</Text>
                <Text style={styles.txt_caloriasT}>Restante</Text>
              </View>
              <View style={styles.leftBody_calorias}>
                <Text style={styles.txt_caloriasM}>Proteínas 000.0g</Text>
                <Text style={styles.txt_caloriasM}>Carbo 000.0g</Text>
                <Text style={styles.txt_caloriasM}>Gordura 000.0g</Text>
              </View>
            </View>
          </View>
          <View style={styles.conteiner_peso}></View>
          <TouchableOpacity style={styles.conteiner_refeicao}>
            <View style={styles.body_refeicao}>
              <Text style={styles.h1_refeicao}>Café da Manhã</Text>
              <Text style={styles.p_refeicao}>Nenhuma refeição registrada</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.conteiner_refeicao}>
            <View style={styles.body_refeicao}>
              <Text style={styles.h1_refeicao}>Lanche</Text>
              <Text style={styles.p_refeicao}>Nenhuma refeição registrada</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.conteiner_refeicao}>
            <View style={styles.body_refeicao}>
              <Text style={styles.h1_refeicao}>Almoço</Text>
              <Text style={styles.p_refeicao}>Nenhuma refeição registrada</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.conteiner_refeicao}>
            <View style={styles.body_refeicao}>
              <Text style={styles.h1_refeicao}>Lanche da Tarde</Text>
              <Text style={styles.p_refeicao}>Nenhuma refeição registrada</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.conteiner_refeicao}>
            <View style={styles.body_refeicao}>
              <Text style={styles.h1_refeicao}>Janta</Text>
              <Text style={styles.p_refeicao}>Nenhuma refeição registrada</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.conteiner_refeicao}>
            <View style={styles.body_refeicao}>
              <Text style={styles.h1_refeicao}>Lanche da Noite</Text>
              <Text style={styles.p_refeicao}>Nenhuma refeição registrada</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },

  container_header: {
    width: "80%",
    alignItems: "center",
    marginTop: 80,
  },

  touchableopacity_header: {
    height: 50,
  },

  container_nav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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

  container_body: {
    width: "85%",
    marginTop: 10,
  },

  up_body: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  txt_msm_usuario: {
    color: "#B5B2C6",
    fontSize: 34,
    fontFamily: "BreeSerif_400Regular",
  },

  bt_gerar_dieta: {
    backgroundColor: "#B5B2C6",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    borderRadius: 20,
    // IOS
    shadowColor: "#747281",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 4,
    shadowRadius: 3,
    // Android
    elevation: 2,
  },

  txt_bt_gerarDieta: {
    color: "#E6E3F6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
  },

  scrollView_body: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },

  conteiner_calorias: {
    width: "90%",
    height: 250,
    backgroundColor: "#e4e0f2",
    borderRadius: 24,
    marginBottom: 30,
    // Sombra Android
    elevation: 5,
    // Sombra IOS
    shadowColor: "#0002",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 3,
    shadowRadius: 4,
  },

  conteiner_peso: {
    width: "65%",
    height: 170,
    backgroundColor: "#e4e0f2",
    borderRadius: 24,
    marginBottom: 30,
    // Sombra Android
    elevation: 5,
    // Sombra IOS
    shadowColor: "#0002",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 3,
    shadowRadius: 4,
  },

  conteiner_refeicao: {
    width: "85%",
    height: 130,
    backgroundColor: "#e4e0f2",
    borderRadius: 24,
    marginBottom: 30,
    // Sombra Android
    elevation: 5,
    // Sombra IOS
    shadowColor: "#0002",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 3,
    shadowRadius: 4,
  },

  body_refeicao: {
    height: 130,
  },

  h1_refeicao: {
    left: 10,
    color: "#B5B2C6",
    fontSize: 32,
    fontFamily: "BreeSerif_400Regular",
    top: 10,
  },

  p_refeicao: {
    left: 12,
    bottom: 9,
    color: "#B5B2C6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
    top: 20,
  },

  header_calorias: {
    top: 8,
  },

  h1_calorias: {
    left: 10,
    color: "#B5B2C6",
    fontSize: 32,
    fontFamily: "BreeSerif_400Regular",
  },

  p_calorias: {
    left: 12,
    bottom: 9,
    color: "#B5B2C6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
  },

  body_calorias: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 170,
  },

  rightBody_calorias: {
    backgroundColor: "white",
    width: 145,
    height: 145,
    borderRadius: 120,
    borderWidth: 3.5,
    borderColor: "#B5B2C6",
    justifyContent: "center",
    alignItems: "center",
  },

  txt_caloriasN: {
    color: "#B5B2C6",
    fontSize: 30,
    fontFamily: "BreeSerif_400Regular",
  },

  txt_caloriasT: {
    color: "#B5B2C6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
  },

  leftBody_calorias: {
    alignItems: "center",
    justifyContent: "center",
  },

  txt_caloriasM: {
    color: "#B5B2C6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
  },
});
