import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";

export default function DietaDiaria() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });
  const [dieta, setDieta] = useState(null);

  
  if (!fontsLoaded || !dieta) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
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
          <View style={styles.viewVoltar}>
            <TouchableOpacity
              style={styles.conteiner_btVoltar}
              onPress={() => navigation.navigate("Perfil")}
            >
              <Image
                source={require("../../../assets/iconVoltar.png")}
                resizeMode="contain"
              />
              <Text style={styles.txtVoltar}>Voltar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.conteiner_body}>
            {dieta.dietaDoDia.map((refeicao, index) => (
              <View key={index} style={styles.box_body}>
                <Text style={styles.txt_h1_body}>{refeicao.refeicao}</Text>
                {refeicao.alimentos.map((alimento, idx) => (
                  <Text key={idx} style={styles.txt_p_body}>
                    {alimento.nome} - {alimento.quantidade_g}g ({alimento.calorias} kcal)
                  </Text>
                ))}
                <Text style={styles.txt_p_body_last}>
                  Total de calorias: {refeicao.total_calorias} kcal
                </Text>
              </View>
            ))}
          <View style={styles.box_observacao}>
            <Text style={styles.txt_h1_body}>Observação</Text>
            <Text style={styles.txt_p_body}>{dieta.observacao}</Text>
          </View>
          
          </View>
          
          
          
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 80,
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
  viewVoltar: {
    width: "80%",
    marginTop: 15,
  },
  conteiner_btVoltar: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtVoltar: {
    color: "#B5B2C6",
    fontSize: 24,
    fontFamily: "BreeSerif_400Regular",
    marginLeft: 5,
    marginBottom: 5,
  },
  conteiner_body: {
    backgroundColor: "white",
    marginTop: 30,
    width: "95%",
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 40,
    marginBottom: 70
  },
  box_body: {
    backgroundColor: "#E6E3F6",
    marginTop: 10,
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  txt_h1_body: {
    color: "#B5B2C6",
    fontSize: 28,
    fontFamily: "BreeSerif_400Regular",
    bottom: 5,
  },
  txt_p_body: {
    color: "#B5B2C6",
    fontSize: 18,
    fontFamily: "BreeSerif_400Regular",
  },
  txt_p_body_last: {
    color: "#B5B2C6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
    marginTop: 5  
  },
  box_macronutrientes: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  box_observacao: {
    backgroundColor: "#ffefef",
    padding: 15,
    borderRadius: 40,
    marginTop: 20,
    paddingVertical: 25
  },
});
