import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DietaDiaria() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  if (!fontsLoaded) {
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
            <View style={styles.box_body}>
              <Text style={styles.txt_h1_body}>Café da Manhã</Text>
              <Text style={styles.txt_p_body}>2 ovos cozidos (129g)</Text>
              <Text style={styles.txt_p_body}>1 banana media (100g)</Text>
              <Text style={styles.txt_p_body}>
                1 Fatia de pão integral (50g)
              </Text>
            </View>

            <View style={styles.box_body}>
              <Text style={styles.txt_h1_body}>Lanche</Text>
              <Text style={styles.txt_p_body}>
                1 scoop de whey protein (30g) misturado com água
              </Text>
            </View>

            <View style={styles.box_body}>
              <Text style={styles.txt_h1_body}>Almoço</Text>
              <Text style={styles.txt_p_body}>100g de brócolis</Text>
              <Text style={styles.txt_p_body}>
                100g de arroz integral cozida
              </Text>
              <Text style={styles.txt_p_body}>
                150g de peito de frango grelhado
              </Text>
            </View>

            <View style={styles.box_body}>
              <Text style={styles.txt_h1_body}>Lanche da Tarde</Text>
              <Text style={styles.txt_p_body}>1 maçã médio</Text>
              <Text style={styles.txt_p_body}>20g de queijo</Text>
            </View>

            <View style={styles.box_body}>
              <Text style={styles.txt_h1_body}>Janta</Text>
              <Text style={styles.txt_p_body}>
                150g de carne moida cozida (129g)
              </Text>
              <Text style={styles.txt_p_body}>100g de feijão cozida</Text>
              <Text style={styles.txt_p_body}>100g de abobrinha refogada</Text>
            </View>

            <View style={styles.box_body}>
              <Text style={styles.txt_h1_body}>Lanche da Noite</Text>
              <Text style={styles.txt_p_body}>
                1 iogurte natural (170g) sem açúcar
              </Text>
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

  conteiner_btSalvar: {
    width: "90%",
    marginTop: 10,
    alignItems: "flex-end", // Alinha o botão à direita
    marginBottom: 50,
  },

  btSalvar: {
    width: 180,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  txtBt: {
    color: "#B5B2C6",
    fontSize: 32,
    fontFamily: "BreeSerif_400Regular",
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
    width: "90%",
    paddingVertical: 25,
    paddingHorizontal: 30,
    borderRadius: 40,
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
});
