 import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ImageBackground,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Cadastro3() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState("11 de setembro 2002");
  const [modalVisible, setModalVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateString = currentDate.toLocaleDateString("pt-BR", options);
    setFormattedDate(dateString);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          <View style={styles.view_txtEditarPerfil}>
            <Text style={styles.txt_editarPerfil}>
              Precisamos de mais informacoes
            </Text>
          </View>

          {/* Conteiner para adicionar o body */}
          <View style={styles.container_body}>
            <View style={styles.container_restricaoAlimentar}>
              <Text style={styles.h2_body}>
                Possui alguma restrição alimentar?
              </Text>
              <View style={styles.container_input}>
                <TextInput
                  style={styles.input}
                  fontSize={22}
                  placeholder="R: escreva aqui."
                ></TextInput>
                <TouchableOpacity>
                  <Image
                    source={require("../../../assets/botaoEnviar.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Ajustando a posição do botão "Salvar" */}
          <View style={styles.conteiner_btSalvar}>
            <TouchableOpacity style={styles.btSalvar}>
              <ImageBackground
                source={require("../../../assets/btSalvar.png")}
                style={styles.btSalvar}
              >
                <Text style={styles.txtBt}>Proximo</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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

  container_body: {
    width: "100%",
    marginTop: 25,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  view_txtEditarPerfil: {
    width: "80%",
  },

  txt_editarPerfil: {
    color: "#B5B2C6",
    fontSize: 30,
    fontFamily: "BreeSerif_400Regular",
    marginTop: 10,
  },

  conteiner_btSalvar: {
    width: "90%",
    marginTop: 40,
    alignItems: "flex-end", // Alinha o botão à direita
    marginBottom: 150,
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
    bottom: 5,
  },

  container_restricaoAlimentar: {
    backgroundColor: "white",
    width: "90%",
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 35,
  },

  h2_body: {
    color: "#B5B2C6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
    marginLeft: 5,
    marginBottom: 5,
  },

  container_input: {
    display: "flex",
    backgroundColor: "#E6E3F6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,
    marginLeft: 5,
    borderRadius: 50,
  },

  input: {
    color: "#B5B2C6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
    width: "90%",
  },
});
