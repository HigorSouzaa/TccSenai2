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
          <View style={styles.container_body}>
            <View style={styles.body}>
              <View style={styles.container_input}>
                <Text style={styles.txt_input}>Seu Nome</Text>
                <TextInput
                  style={styles.input}
                  fontSize={24}
                  placeholder="Ex: Breno A. Santos"
                  placeholderTextColor={"#E6E3F6"}
                  fontFamily={"BreeSerif_400Regular"}
                />
                <View style={styles.view_line}>
                  <Image
                    source={require("../../../assets/line_txtInput.png")}
                    resizeMode="repeat"
                  />
                </View>
              </View>

              <View style={styles.container_input}>
                <Text style={styles.txt_input}>Altura</Text>
                <TextInput
                  style={styles.input}
                  fontSize={24}
                  placeholder="Ex: 192"
                  placeholderTextColor={"#E6E3F6"}
                  fontFamily={"BreeSerif_400Regular"}
                />
                <View style={styles.view_line}>
                  <Image
                    source={require("../../../assets/line_txtInput.png")}
                    resizeMode="repeat"
                  />
                </View>
              </View>

              <View style={styles.container_input}>
                <Text style={styles.txt_input}>Idade</Text>
                <TextInput
                  style={styles.input}
                  fontSize={24}
                  placeholder="Ex: 20"
                  placeholderTextColor={"#E6E3F6"}
                  fontFamily={"BreeSerif_400Regular"}
                />
                <View style={styles.view_line}>
                  <Image
                    source={require("../../../assets/line_txtInput.png")}
                    resizeMode="repeat"
                  />
                </View>
              </View>

              <View style={styles.container_input}>
                <Text style={styles.txt_input}>Sexo</Text>
                <TextInput
                  style={styles.input}
                  fontSize={24}
                  placeholder="Ex: masculino ou feminino"
                  placeholderTextColor={"#E6E3F6"}
                  fontFamily={"BreeSerif_400Regular"}
                />
                <View style={styles.view_line}>
                  <Image
                    source={require("../../../assets/line_txtInput.png")}
                    resizeMode="repeat"
                  />
                </View>
              </View>

              <View style={styles.container_input}>
                <Text style={styles.txt_input}>Pais</Text>
                <TextInput
                  style={styles.input}
                  fontSize={24}
                  placeholder="Ex: Brasil"
                  placeholderTextColor={"#E6E3F6"}
                  fontFamily={"BreeSerif_400Regular"}
                />
                <View style={styles.view_line}>
                  <Image
                    source={require("../../../assets/line_txtInput.png")}
                    resizeMode="repeat"
                  />
                </View>
              </View>

              <View style={styles.container_input}>
                <Text style={styles.txt_input}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  fontSize={24}
                  placeholder="Ex: +55 19 9999-9999"
                  placeholderTextColor={"#E6E3F6"}
                  fontFamily={"BreeSerif_400Regular"}
                />
                <View style={styles.view_line}>
                  <Image
                    source={require("../../../assets/line_txtInput.png")}
                    resizeMode="repeat"
                  />
                </View>
              </View>

              <View style={styles.container_input}>
                <Text style={styles.txt_input}>Data de Nascimento</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.input}
                >
                  <Text style={styles.input}>{formattedDate}</Text>
                </TouchableOpacity>
                <View style={styles.view_line}>
                  <Image
                    source={require("../../../assets/line_txtInput.png")}
                    resizeMode="repeat"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Modal para seleção de data */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Escolha uma nova data:</Text>
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onChange}
                maximumDate={new Date()}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Modal>

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
    width: "90%",
    marginTop: 25,
    backgroundColor: "white",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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

  body: {
    width: "90%",
  },

  container_input: {
    marginBottom: 15,
  },

  txt_input: {
    color: "#BDBDBD",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
  },

  input: {
    fontSize: 20,
    color: "#E6E3F6",
    fontFamily: "BreeSerif_400Regular",
  },

  view_line: {
    marginTop: 10,
  },

  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },

  modalText: {
    marginBottom: 15,
    fontSize: 18,
    color: "white",
  },

  closeButton: {
    backgroundColor: "#B5B2C6",
    padding: 10,
    borderRadius: 5,
    marginTop: 20, // Adicionei margens para separar o botão
  },

  buttonText: {
    color: "white",
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
});
