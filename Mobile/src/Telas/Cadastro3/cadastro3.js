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
  Switch,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import Checkbox from "expo-checkbox";
import { db } from "../../Config/Firebase/fb";
import { doc, updateDoc } from "firebase/firestore";

export default function Cadastro3() {
  const route = useRoute(); // Obtém o objeto `route` para acessar os parâmetros
  const { name, age, gender, height, phone, birthDate, country, email, peso } =
    route.params;

  const navigation = useNavigation();

  const [selectedGoal, setSelectedGoal] = useState(""); // Armazena o checkbox selecionado para a meta
  const [selectedActivityLevel, setSelectedActivityLevel] = useState(""); // Armazena o checkbox selecionado para o nível de atividade

  const [restricoes, setRestricoes] = useState("");
  const [listaRestricoes, setListaRestricoes] = useState([]);

  const [doencas, setDoencas] = useState("");
  const [listaDoencas, setListaDoencas] = useState([]);

  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  function calcularTMB(peso, altura, idade, sexo) {
    let tmb;

    if (sexo === "masculino") {
      tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;
    } else if (sexo === "feminino") {
      tmb = 10 * peso + 6.25 * altura - 5 * idade - 161;
    }

    return tmb;
  }

  const saveExtraDetails = async () => {
    const todasListaRestricoes =
      listaRestricoes.length > 0 ? [...listaRestricoes].join(", ") : "Nada";
    const todasListaDoencas =
      listaDoencas.length > 0 ? [...listaDoencas].join(", ") : "Nada";

    // Verificação se os checkboxes estão marcados
    if (!selectedGoal) {
      alert("Por favor, selecione uma meta.");
      return;
    }

    if (!selectedActivityLevel) {
      alert("Por favor, selecione um nível de atividade física.");
      return;
    }

    // Se tudo estiver correto, você pode prosseguir com o salvamento
    try {
      const userDocRef = doc(db, "usuarios", email); // Cria a referência do documento com o email como ID
      await updateDoc(userDocRef, {
        Nome: name,
        Idade: age,
        Genero: gender,
        Altura: height,
        Telefone: phone,
        DataAniversario: birthDate,
        Pais: country,
        Meta: selectedGoal,
        NivelAtividade: selectedActivityLevel,
        Restricoes: todasListaRestricoes,
        Doencas: todasListaDoencas,
        Peso: peso,
        TaxaBasal: calcularTMB(peso, height, age, gender),
      });
      alert("Dados salvos com sucesso!");

      // Navegar para outra tela ou resetar os campos, se necessário
      navigation.navigate("Home");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Erro ao salvar os dados, tente novamente.");
    }
  };

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

          <View style={styles.conteiner_checkBox}>
            <Text style={styles.h1_checkBox}>Qual o foco da sua dieta?</Text>
            <View style={styles.box_checkBox}>
              <Checkbox
                value={selectedGoal === "Emagrecer"}
                onValueChange={() => setSelectedGoal("Emagrecer")}
                color={selectedGoal === "Emagrecer" ? "#E6E3F6" : "#E6E3F6"}
                style={styles.checkbox}
              />
              <Text style={styles.h2_checkBox}>Emagrecer</Text>
            </View>
            <View style={styles.box_checkBox}>
              <Checkbox
                value={selectedGoal === "Ficar Saudável"}
                onValueChange={() => setSelectedGoal("Ficar Saudável")}
                color={
                  selectedGoal === "Ficar Saudável" ? "#E6E3F6" : "#E6E3F6"
                }
                style={styles.checkbox}
              />
              <Text style={styles.h2_checkBox}>Ficar Saudável</Text>
            </View>
            <View style={styles.box_checkBox}>
              <Checkbox
                value={selectedGoal === "Ganhar Massa"}
                onValueChange={() => setSelectedGoal("Ganhar Massa")}
                color={selectedGoal === "Ganhar Massa" ? "#E6E3F6" : "#E6E3F6"}
                style={styles.checkbox}
              />
              <Text style={styles.h2_checkBox}>Ganhar Massa</Text>
            </View>
          </View>

          <View style={styles.conteiner_checkBox}>
            <Text style={styles.h1_checkBox}>
              Qual nivel de atividade fisica voçê se considera?
            </Text>
            <View style={styles.box_checkBox}>
              <Checkbox
                value={selectedActivityLevel === "Muito ativo"}
                onValueChange={() => setSelectedActivityLevel("Muito ativo")}
                color={
                  selectedActivityLevel === "Muito ativo"
                    ? "#E6E3F6"
                    : "#E6E3F6"
                }
                style={styles.checkbox}
              />
              <Text style={styles.h2_checkBox}>Muito ativo</Text>
            </View>
            <View style={styles.box_checkBox}>
              <Checkbox
                value={selectedActivityLevel === "Ativo"}
                onValueChange={() => setSelectedActivityLevel("Ativo")}
                color={
                  selectedActivityLevel === "Ativo" ? "#E6E3F6" : "#E6E3F6"
                }
                style={styles.checkbox}
              />
              <Text style={styles.h2_checkBox}>Ativo</Text>
            </View>
            <View style={styles.box_checkBox}>
              <Checkbox
                value={selectedActivityLevel === "Levemente ativo"}
                onValueChange={() =>
                  setSelectedActivityLevel("Levemente ativo")
                }
                color={
                  selectedActivityLevel === "Levemente ativo"
                    ? "#E6E3F6"
                    : "#E6E3F6"
                }
                style={styles.checkbox}
              />
              <Text style={styles.h2_checkBox}>Levemente ativo</Text>
            </View>
            <View style={styles.box_checkBox}>
              <Checkbox
                value={selectedActivityLevel === "Sedentário"}
                onValueChange={() => setSelectedActivityLevel("Sedentário")}
                color={
                  selectedActivityLevel === "Sedentário" ? "#E6E3F6" : "#E6E3F6"
                }
                style={styles.checkbox}
              />
              <Text style={styles.h2_checkBox}>Sedentario</Text>
            </View>
          </View>

          {/* Ajustando a posição do botão "Salvar" */}
          <View style={styles.conteiner_btSalvar}>
            <TouchableOpacity
              style={styles.btSalvar}
              onPress={saveExtraDetails}
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

  conteiner_checkBox: {
    backgroundColor: "white",
    marginTop: 50,
    width: "90%",
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },

  h1_checkBox: {
    color: "#B5B2C6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
  },

  box_checkBox: {
    flexDirection: "row",
    marginTop: 2,
    alignItems: "center",
    left: 10,
  },

  h2_checkBox: {
    color: "#B5B2C6",
    fontSize: 20,
    fontFamily: "BreeSerif_400Regular",
    bottom: 1,
    left: 10,
  },

  checkbox: {
    borderRadius: 6,
    padding: 12,
  },
});
