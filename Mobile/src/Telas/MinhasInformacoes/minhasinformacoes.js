import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/Firebase/fb";

export default function MinhasInformacoes() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params;

  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [sexo, setSexo] = useState("");

  const [novaDoenca, setNovaDoenca] = useState(""); // Estado para o novo item de doença
  const [listaDoencas, setListaDoencas] = useState([]);

  const [novoAlimentoAlergico, setNovoAlimentoAlergico] = useState(""); // Estado para novo alimento alérgico
  const [listaAlimentosAlergicos, setListaAlimentosAlergicos] = useState([]); // Estado para alimentos alérgicos como objetos

  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  useEffect(() => {
    if (userData?.Doenca) {
      setListaDoencas(userData.Doenca);
    }
    if (userData?.Restricoes) {
      setListaAlimentosAlergicos(userData.Restricoes);
    }
  }, [userData]);

  if (!fontsLoaded) {
    return null;
  }

  // Função para adicionar itens às listas
  const adicionarItem = (item, setLista, setValor) => {
    if (item.trim() !== "") {
      setLista((prevLista) => [...prevLista, item]);
      setValor(""); // Limpa o campo de entrada
    }
  };

  // Função para remover itens das listas
  const removerItem = (index, setLista) => {
    setLista((prevLista) => prevLista.filter((_, i) => i !== index));
  };

  const updatePerfil = async () => {
    const saveUserData = {
      Nome: userData.Nome,
      Email: userData.Email,
      Pais: userData.Pais,
      Telefone: userData.Telefone,
      DataAniversario: userData.DataAniversario,
      Altura: altura || userData.Altura,
      Peso: peso || userData.Peso,
      Meta: userData.Meta,
      Genero: sexo || userData.Genero,
      Idade: userData.Idade,
      NivelAtividade: userData.NivelAtividade,
      Restricoes: listaAlimentosAlergicos || userData.Restricoes,
      Senha: userData.Senha,
      TaxaBasal: userData.TaxaBasal,
      Doenca: listaDoencas || userData.Doenca,
    };

    try {
      await updateDoc(doc(db, "usuarios", userData.Email), {
        Altura: saveUserData.Altura,
        Peso: saveUserData.Peso,
        Genero: saveUserData.Genero,
        Doenca: saveUserData.Doenca,
        Restricoes: saveUserData.Restricoes,
      });
      alert("Dados atualizados com sucesso!");

      navigation.navigate("Perfil", {
        userData: saveUserData,
      });
    } catch (e) {
      console.error("Error updating document: ", e);
      alert("Erro ao salvar os dados, tente novamente.");
    }
  };

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
            <View style={styles.container_input}>
              <Text style={styles.txt_input}>Altura</Text>
              <TextInput
                style={styles.input}
                fontSize={24}
                placeholder={userData.Altura}
                placeholderTextColor={"#E6E3F6"}
                fontFamily={"BreeSerif_400Regular"}
                value={altura}
                onChangeText={setAltura}
              />
              <View style={styles.view_line}>
                <Image
                  source={require("../../../assets/line_txtInput.png")}
                  resizeMode="repeat"
                />
              </View>
            </View>

            <View style={styles.container_input}>
              <Text style={styles.txt_input}>Peso</Text>
              <TextInput
                style={styles.input}
                fontSize={24}
                placeholder={userData.Peso}
                placeholderTextColor={"#E6E3F6"}
                fontFamily={"BreeSerif_400Regular"}
                value={peso}
                onChangeText={setPeso}
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
                placeholder={userData.Genero}
                placeholderTextColor={"#E6E3F6"}
                fontFamily={"BreeSerif_400Regular"}
                value={sexo}
                onChangeText={setSexo}
              />
              <View style={styles.view_line}>
                <Image
                  source={require("../../../assets/line_txtInput.png")}
                  resizeMode="repeat"
                />
              </View>
            </View>
          </View>

          {/* Seção de Doenças */}
          <View style={styles.box}>
            <View style={styles.conteiner_texto}>
              <Text style={styles.txtBox_h1}>Doenças:</Text>
              <View style={styles.campo_escreAq}>
                <TextInput
                  style={styles.txt_escreAq}
                  placeholder="escreva aqui"
                  placeholderTextColor="#E5E3F6"
                  value={novaDoenca} // Atualiza o valor com o estado da nova doença
                  onChangeText={setNovaDoenca} // Atualiza o estado quando o texto muda
                />
                <TouchableOpacity
                  style={styles.btEnviar}
                  onPress={() =>
                    adicionarItem(novaDoenca, setListaDoencas, setNovaDoenca)
                  }
                >
                  <Image
                    source={require("../../../assets/botaoEnviar.png")}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.conteiner_scrollview}>
              <ScrollView
                style={styles.txt_area_doencas}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {/* Renderizar cada doença como um item separado */}
                <View style={styles.conteiner_ScrollView}>
                  {listaDoencas.map((item, index) => (
                    <View style={styles.item_id1} key={index}>
                      <Text style={styles.txt_item_id1}>{item}</Text>
                      <TouchableOpacity
                        onPress={() => removerItem(index, setListaDoencas)}
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
          </View>

          {/* Seção de Alimentos Alergicos */}
          <View style={styles.box}>
            <View style={styles.conteiner_texto}>
              <Text style={styles.txtBox_h1}>Alimentos Alergicos:</Text>
              <View style={styles.campo_escreAq}>
                <TextInput
                  style={styles.txt_escreAq}
                  placeholder="escreva aqui"
                  placeholderTextColor="#E5E3F6"
                  value={novoAlimentoAlergico} // Atualiza o valor com o estado do novo alimento alérgico
                  onChangeText={setNovoAlimentoAlergico} // Atualiza o estado quando o texto muda
                />
                <TouchableOpacity
                  style={styles.btEnviar}
                  onPress={() =>
                    adicionarItem(
                      novoAlimentoAlergico,
                      setListaAlimentosAlergicos,
                      setNovoAlimentoAlergico
                    )
                  }
                >
                  <Image
                    source={require("../../../assets/botaoEnviar.png")}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.conteiner_scrollview}>
              <ScrollView
                style={styles.txt_area_doencas}
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                {/* Renderizar cada alimento alérgico como um item separado */}
                <View style={styles.conteiner_ScrollView}>
                  {listaAlimentosAlergicos.map((item, index) => (
                    <View style={styles.item_id1} key={index}>
                      <Text style={styles.txt_item_id1}>{item}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          removerItem(index, setListaAlimentosAlergicos)
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
          </View>
          <View style={styles.conteiner_btSalvar}>
            <TouchableOpacity
              style={styles.btSalvar}
              onPress={() => updatePerfil()}
            >
              <ImageBackground
                source={require("../../../assets/btSalvar.png")}
                style={styles.btSalvar}
              >
                <Text style={styles.txtBtSalvar}>Salvar Alterações</Text>
              </ImageBackground>
            </TouchableOpacity>
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

  container_body: {
    width: "90%",
    marginTop: 25,
    backgroundColor: "white",
    height: 300,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  view_txtEditarPerfil: {
    width: "80%",
  },

  txt_editarPerfil: {
    color: "#B5B2C6",
    fontSize: 34,
    fontFamily: "BreeSerif_400Regular",
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

  txt_area_doencas: {
    width: "90%",
    height: 200,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 15,
    marginBottom: 50,
  },

  conteiner_ScrollView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  conteiner_scrollview: {
    width: "100%",
    alignItems: "center",
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
    fontSize: 18,
    fontFamily: "BreeSerif_400Regular",
    marginRight: 10,
  },

  box: {
    width: "100%",
    top: 20,
    marginBottom: 40,
  },

  conteiner_texto: {
    left: 50,
  },

  txtBox_h1: {
    color: "#B5B2C6",
    fontSize: 36,
    fontFamily: "BreeSerif_400Regular",
  },

  campo_escreAq: {
    marginTop: 10,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 35,
    width: "70%",
    marginBottom: 20,
  },

  txt_escreAq: {
    color: "#E5E3F6",
    fontSize: 18,
    fontFamily: "BreeSerif_400Regular",
  },

  btEnviar: {
    backgroundColor: "#E5E3F6",
    padding: 5,
    borderRadius: 30,
  },
});
