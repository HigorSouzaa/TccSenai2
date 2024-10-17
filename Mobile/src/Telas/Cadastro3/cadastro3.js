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
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";

export default function Cadastro3() {
  const navigation = useNavigation();

  const [restricoes, setRestricoes] = useState("");
  const [listaRestricoes, setListaRestricoes] = useState([]);

  const [doencas, setDoencas] = useState("");
  const [listaDoencas, setListaDoencas] = useState([]);

  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  const adicionarItem = (item, setItem, lista, setLista) => {
    if (item.trim() !== "") {
      setLista((prevLista) => [...prevLista, item]);
      setItem("");
    }
  };

  const removerItem = (index, lista, setLista) => {
    setLista((prevLista) => prevLista.filter((_, i) => i !== index));
  };

  if (!fontsLoaded) {
    return null; // Você pode adicionar um carregador aqui se desejar
  }

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
              Precisamos de mais informações
            </Text>
          </View>

          {/* Container para adicionar o body */}
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
                  value={restricoes}
                  onChangeText={setRestricoes} // Atualiza o estado conforme o usuário digita
                />
                <TouchableOpacity
                  onPress={() =>
                    adicionarItem(
                      restricoes,
                      setRestricoes,
                      listaRestricoes,
                      setListaRestricoes
                    )
                  }
                >
                  <Image source={require("../../../assets/botaoEnviar.png")} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.view_Restricoes}>
            <Text style={styles.h1_restricoes}>Restrições Alimentares:</Text>
            <ScrollView
              style={styles.txt_area_restricoes}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.conteiner_ScrollView}>
                {listaRestricoes.map((item, index) => (
                  <View key={index} style={styles.item_id1}>
                    <Text style={styles.txt_item_id1}>{item}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        removerItem(index, listaRestricoes, setListaRestricoes)
                      }
                    >
                      <Image
                        source={require("../../../assets/BtCancelar.png")}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Container para doenças */}
          <View style={styles.container_doenca}>
            <Text style={styles.h2_body}>Possui alguma doença?</Text>
            <View style={styles.container_input}>
              <TextInput
                style={styles.input}
                fontSize={22}
                placeholder="R: escreva aqui."
                value={doencas}
                onChangeText={setDoencas} // Atualiza o estado conforme o usuário digita
              />
              <TouchableOpacity
                onPress={() =>
                  adicionarItem(
                    doencas,
                    setDoencas,
                    listaDoencas,
                    setListaDoencas
                  )
                }
              >
                <Image source={require("../../../assets/botaoEnviar.png")} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.view_Restricoes}>
            <Text style={styles.h1_restricoes}>Doenças:</Text>
            <ScrollView
              style={styles.txt_area_restricoes}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.conteiner_ScrollView}>
                {listaDoencas.map((item, index) => (
                  <View key={index} style={styles.item_id1}>
                    <Text style={styles.txt_item_id1}>{item}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        removerItem(index, listaDoencas, setListaDoencas)
                      }
                    >
                      <Image
                        source={require("../../../assets/BtCancelar.png")}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Ajustando a posição do botão "Salvar" */}
          <View style={styles.conteiner_btSalvar}>
            <TouchableOpacity style={styles.btSalvar}>
              <ImageBackground
                source={require("../../../assets/btSalvar.png")}
                style={styles.btSalvar}
              >
                <Text style={styles.txtBt}>Próximo</Text>
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

  view_txtEditarPerfil: {
    width: "80%",
  },

  txt_editarPerfil: {
    color: "#B5B2C6",
    fontSize: 30,
    fontFamily: "BreeSerif_400Regular",
    marginTop: 10,
  },

  container_body: {
    width: "100%",
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  container_restricaoAlimentar: {
    backgroundColor: "white",
    width: "90%",
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 35,
  },

  container_doenca: {
    backgroundColor: "white",
    width: "90%",
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 35,
    marginTop: 40,
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

  h1_restricoes: {
    color: "#B5B2C6",
    fontSize: 26,
    fontFamily: "BreeSerif_400Regular",
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 25,
  },

  txt_area_restricoes: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 10,
  },

  conteiner_ScrollView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  item_id1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "#E6E3F6",
    marginHorizontal: 5,
    marginVertical: 5,
  },

  txt_item_id1: {
    color: "white",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
    marginRight: 10,
  },

  view_Restricoes: {
    width: "90%",
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
