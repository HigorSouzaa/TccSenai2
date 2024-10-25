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
  Platform,
  ImageBackground,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase/fb";

export default function EditarPerfil() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params || {};
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState(
    userData?.DataAniversario || "Selecione uma data"
  );
  const [modalVisible, setModalVisible] = useState(false);

  const [nome, setNome] = useState(userData?.Nome || "");
  const [email, setEmail] = useState(userData?.Email || "");
  const [pais, setPais] = useState(userData?.Pais || "");
  const [telefone, setTelefone] = useState(userData?.Telefone || "");

  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setShowPicker(false);
      setDate(currentDate);
      const options = { year: "numeric", month: "long", day: "numeric" };
      const dateString = currentDate.toLocaleDateString("pt-BR", options);
      setFormattedDate(dateString);
    }
    setModalVisible(false);
  };

  const updatePerfil = async () => {
    try {
      const userDocRef = doc(db, "usuarios", userData.Email);
      await updateDoc(userDocRef, {
        Nome: nome,
        Email: email,
        Pais: pais,
        Telefone: telefone,
        DataAniversario: formattedDate,
      });
      alert("Dados mudados com sucesso!");
      navigation.navigate("Home", {
        userData: {
          ...userData,
          Nome: nome,
          Email: email,
          Pais: pais,
          Telefone: telefone,
          DataAniversario: formattedDate,
        },
      });
    } catch (e) {
      console.error("Error updating document: ", e);
      alert("Erro ao salvar os dados, tente novamente.");
    }
  };

  return (
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
                onPress={() =>
                  navigation.navigate("Home", { userData: userData })
                }
              >
                <Text style={styles.txt_links}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableopacity_header}
                onPress={() =>
                  navigation.navigate("Perfil", { userData: userData })
                }
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
            onPress={() =>
              navigation.navigate("Perfil", { userData: userData })
            }
          >
            <Image
              source={require("../../../assets/iconVoltar.png")}
              resizeMode="contain"
            />
            <Text style={styles.txtVoltar}>Voltar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.view_txtEditarPerfil}>
          <Text style={styles.txt_editarPerfil}>Editar seu Perfil</Text>
        </View>
        <View style={styles.container_body}>
          <View style={styles.body}>
            <View style={styles.container_input}>
              <Text style={styles.txt_input}>Seu Nome</Text>
              <TextInput
                style={styles.input}
                fontSize={24}
                placeholder="Nome"
                placeholderTextColor={"#E6E3F6"}
                fontFamily={"BreeSerif_400Regular"}
                value={nome}
                onChangeText={setNome} // Atualiza o estado ao digitar
              />
              <View style={styles.view_line}>
                <Image
                  source={require("../../../assets/line_txtInput.png")}
                  resizeMode="repeat"
                />
              </View>
            </View>

            <View style={styles.container_input}>
              <Text style={styles.txt_input}>Email</Text>
              <TextInput
                style={styles.input}
                fontSize={24}
                placeholder="Email"
                placeholderTextColor={"#E6E3F6"}
                fontFamily={"BreeSerif_400Regular"}
                value={email}
                onChangeText={setEmail} // Atualiza o estado ao digitar
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
                placeholder="Pais"
                placeholderTextColor={"#E6E3F6"}
                fontFamily={"BreeSerif_400Regular"}
                value={pais}
                onChangeText={setPais} // Atualiza o estado ao digitar
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
                placeholder="Telefone"
                placeholderTextColor={"#E6E3F6"}
                fontFamily={"BreeSerif_400Regular"}
                value={telefone}
                onChangeText={setTelefone} // Atualiza o estado ao digitar
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

        <View style={styles.conteiner_btSalvar}>
          <TouchableOpacity
            style={styles.btSalvar}
            onPress={() => updatePerfil()}
          >
            <ImageBackground
              source={require("../../../assets/btSalvar.png")}
              style={styles.btSalvar}
            >
              <Text style={styles.txtBt}>Salvar</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    height: 450,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  view_txtEditarPerfil: {
    width: "80%",
  },

  txt_editarPerfil: {
    color: "#B5B2C6",
    fontSize: 34,
    fontFamily: "BreeSerif_400Regular",
  },

  body: {
    width: "90%",
    height: 400,
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
    marginTop: 20,
    alignItems: "flex-end", // Alinha o botão à direita
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
});
