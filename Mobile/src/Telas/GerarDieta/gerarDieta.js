import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";

export default function GerarDieta() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params;

  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  // Chave API Key do Projeto
  const OPENAI_API_KEY =
    "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";

  // Estados para armazenar os valores de cada campo
  const [proteinas, setProteinas] = useState("");
  const [listaProteinas, setListaProteinas] = useState([]);

  const [carboidratos, setCarboidratos] = useState("");
  const [listaCarboidratos, setListaCarboidratos] = useState([]);

  const [vegetaisLegumes, setVegetaisLegumes] = useState("");
  const [listaVegetaisLegumes, setListaVegetaisLegumes] = useState([]);

  const [frutas, setFrutas] = useState("");
  const [listaFrutas, setListaFrutas] = useState([]);

  const [doces, setDoces] = useState("");
  const [listaDoces, setListaDoces] = useState([]);

  const [outros, setOutros] = useState("");
  const [listaOutros, setListaOutros] = useState([]);

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

  const gerarDieta = async () => {
    const TodasAsListas = [
      ...listaProteinas,
      ...listaCarboidratos,
      ...listaVegetaisLegumes,
      ...listaFrutas,
      ...listaDoces,
      ...listaOutros,
    ].join(", ");

    const prompt = `Quero que você atue como um assistente de nutrição para ajudar a pessoa a montar uma dieta personalizada com base nos alimentos que ela tem em casa, considerando suas metas de saúde, restrições alimentares e as quantidades limitadas de alimentos disponíveis.

    Etapas a seguir:
    
    1. Informações da pessoa:
       Idade: ${userData.Idade}
       Peso: ${userData.Peso}
       Altura: ${userData.Altura}
       Sexo: ${userData.Genero}
       Nível de atividade física: ${userData.NivelAtividade}
       Meta: ${userData.Meta}
       Restrições  alimentares: ${userData.Restricoes}
       Condições de saúde ou doenças: ${userData.Doenca}
    
    2. Análise de alimentos disponíveis:
       A pessoa informou que tem os seguintes alimentos disponíveis em casa: ${TodasAsListas}.
       Verifique a compatibilidade dos alimentos disponíveis com as alergias e condições de saúde informadas.
       Exclua os alimentos que podem causar reações alérgicas ou interferir nas condições de saúde e forneça sugestões de substituições se necessário, fora isso nao acresente outros alimentos fora da lista.
       
    3. Geração da dieta:
       Com base na meta de {inserir meta}, crie uma sugestão de refeições para um dia inteiro que atenda ao total de calorias diárias necessárias, com a seguinte distribuição de macronutrientes: {inserir distribuição de macros}.
       Divida a alimentação em 6 refeições.
       Monte sugestões de refeições utilizando os alimentos compatíveis e disponíveis, considerando as alergias e condições de saúde mencionadas. Especifique as porções de cada alimento em gramas e as calorias por refeição, visando alcançar a meta de calorias diárias da TMB. Tente tornar a dieta equilibrada e realista, evitando incluir alimentos no café da manhã que não sejam comuns para essa refeição, como arroz, a menos que seja necessário para cumprir os macros.
    
    4. Sugestões de ajustes e substituições:
       Caso o usuário tenha poucos alimentos disponíveis, avise sobre a quantidade limitada e sugira adicionar mais opções, como vegetais, fontes alternativas de proteína, ou carboidratos complexos. Se algum alimento necessário não estiver disponível, forneça sugestões de substituições com base em alimentos semelhantes ou complementares, sempre levando em consideração as restrições alimentares e condições de saúde.
    
    5. Formato de saída:
       Retorne a dieta no seguinte formato JSON, apenas com as informações solicitadas, informe somente a dieta ou seja o passo 3 ignore o resto use só para fazer a dieta, e também sem mensagens explicativas. Além disso, forneça o total de macronutrientes (proteínas, carboidratos e gorduras) e calorias para o dia inteiro, após as refeições.
    
       Exemplo de saída:
       {
         "dietaDoDia": [
           {
             "refeicao": "Café da manhã",
             "alimentos": [
               {"nome": "Alimento 1", "quantidade_g": 100, "calorias": 200},
               {"nome": "Alimento 2", "quantidade_g": 50, "calorias": 100}
             ],
             "total_calorias": 300
           },
           {
             "refeicao": "Lanche da manhã",
             "alimentos": [
               {"nome": "Alimento 3", "quantidade_g": 75, "calorias": 150},
               {"nome": "Alimento 4", "quantidade_g": 30, "calorias": 70}
             ],
             "total_calorias": 220
           },
           {
             "refeicao": "Almoço",
             "alimentos": [
               {"nome": "Alimento 5", "quantidade_g": 150, "calorias": 400},
               {"nome": "Alimento 6", "quantidade_g": 80, "calorias": 120}
             ],
             "total_calorias": 520
           },
           {
             "refeicao": "Lanche da tarde",
             "alimentos": [
               {"nome": "Alimento 7", "quantidade_g": 60, "calorias": 180},
               {"nome": "Alimento 8", "quantidade_g": 40, "calorias": 60}
             ],
             "total_calorias": 240
           },
           {
             "refeicao": "Jantar",
             "alimentos": [
               {"nome": "Alimento 9", "quantidade_g": 200, "calorias": 500},
               {"nome": "Alimento 10", "quantidade_g": 75, "calorias": 100}
             ],
             "total_calorias": 600
           },
           {
             "refeicao": "Ceia",
             "alimentos": [
               {"nome": "Alimento 11", "quantidade_g": 50, "calorias": 100},
               {"nome": "Alimento 12", "quantidade_g": 30, "calorias": 50}
             ],
             "total_calorias": 150
           }
         ],
         "macronutrientesTotais": {
           "proteinas": 150,
           "carboidratos": 200,
           "gorduras": 70,
           "caloriasTotais": 2000
         },
         "observacao": "Você tem uma quantidade limitada de alimentos disponíveis. Considere adicionar mais fontes de proteínas, vegetais ou carboidratos complexos para equilibrar melhor sua dieta. Caso tenha outros alimentos que não foram mencionados, podemos adaptá-los à dieta."
       }
    
    `;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1500,
          temperature: 0,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices[0].message.content) {
        // Tentando converter para JSON, caso o conteúdo seja JSON válido
        let dietaGerada;
        try {
          dietaGerada = JSON.parse(data.choices[0].message.content);
          navigation.navigate("DietaGerada", {userData: userData, dataResposta: dietaGerada})
          console.log(prompt)
        } catch (parseError) {
          // Se não for JSON, exibe o conteúdo como texto
          console.log("Resposta em formato de texto:", data.choices[0].message.content);
        }
      } else {
        console.error("Resposta inesperada da API:", data);
      }
    } catch (error) {
      console.error("Erro ao gerar dieta:", error);
    }
  };

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

      <View style={styles.container_body}>
        <Text style={styles.body_title}>Diga o que você tem em casa</Text>

        {/* Proteínas */}
        <View style={styles.box}>
          <Text style={styles.txtBox_h1}>Proteínas:</Text>
          <View style={styles.campo_escreAq}>
            <TextInput
              style={styles.txt_escreAq}
              placeholder="escreva aqui"
              placeholderTextColor="#E5E3F6"
              value={proteinas}
              onChangeText={setProteinas}
            />
            <TouchableOpacity
              style={styles.btEnviar}
              onPress={() =>
                adicionarItem(proteinas, setListaProteinas, setProteinas)
              }
            >
              <Image
                source={require("../../../assets/botaoEnviar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.txt_area_proteinas}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.conteiner_ScrollView}>
              {listaProteinas.map((item, index) => (
                <View key={index} style={styles.item_id1}>
                  <Text style={styles.txt_item_id1}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => removerItem(index, setListaProteinas)}
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

        {/* Carboidratos */}
        <View style={styles.box}>
          <Text style={styles.txtBox_h1}>Carboidratos:</Text>
          <View style={styles.campo_escreAq}>
            <TextInput
              style={styles.txt_escreAq}
              placeholder="escreva aqui"
              placeholderTextColor="#E5E3F6"
              value={carboidratos}
              onChangeText={setCarboidratos}
            />
            <TouchableOpacity
              style={styles.btEnviar}
              onPress={() =>
                adicionarItem(
                  carboidratos,
                  setListaCarboidratos,
                  setCarboidratos
                )
              }
            >
              <Image
                source={require("../../../assets/botaoEnviar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.txt_area_carboidratos}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.conteiner_ScrollView}>
              {listaCarboidratos.map((item, index) => (
                <View key={index} style={styles.item_id1}>
                  <Text style={styles.txt_item_id1}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => removerItem(index, setListaCarboidratos)}
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

        {/* Vegetais e Legumes */}
        <View style={styles.box}>
          <Text style={styles.txtBox_h1}>Vegetais e Legumes:</Text>
          <View style={styles.campo_escreAq}>
            <TextInput
              style={styles.txt_escreAq}
              placeholder="escreva aqui"
              placeholderTextColor="#E5E3F6"
              value={vegetaisLegumes}
              onChangeText={setVegetaisLegumes}
            />
            <TouchableOpacity
              style={styles.btEnviar}
              onPress={() =>
                adicionarItem(
                  vegetaisLegumes,
                  setListaVegetaisLegumes,
                  setVegetaisLegumes
                )
              }
            >
              <Image
                source={require("../../../assets/botaoEnviar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.txt_area_vegetais_legumes}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.conteiner_ScrollView}>
              {listaVegetaisLegumes.map((item, index) => (
                <View key={index} style={styles.item_id1}>
                  <Text style={styles.txt_item_id1}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => removerItem(index, setListaVegetaisLegumes)}
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

        {/* Frutas */}
        <View style={styles.box}>
          <Text style={styles.txtBox_h1}>Frutas:</Text>
          <View style={styles.campo_escreAq}>
            <TextInput
              style={styles.txt_escreAq}
              placeholder="escreva aqui"
              placeholderTextColor="#E5E3F6"
              value={frutas}
              onChangeText={setFrutas}
            />
            <TouchableOpacity
              style={styles.btEnviar}
              onPress={() => adicionarItem(frutas, setListaFrutas, setFrutas)}
            >
              <Image
                source={require("../../../assets/botaoEnviar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.txt_area_frutas}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.conteiner_ScrollView}>
              {listaFrutas.map((item, index) => (
                <View key={index} style={styles.item_id1}>
                  <Text style={styles.txt_item_id1}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => removerItem(index, setListaFrutas)}
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

        {/* Doces */}
        <View style={styles.box}>
          <Text style={styles.txtBox_h1}>Doces:</Text>
          <View style={styles.campo_escreAq}>
            <TextInput
              style={styles.txt_escreAq}
              placeholder="escreva aqui"
              placeholderTextColor="#E5E3F6"
              value={doces}
              onChangeText={setDoces}
            />
            <TouchableOpacity
              style={styles.btEnviar}
              onPress={() => adicionarItem(doces, setListaDoces, setDoces)}
            >
              <Image
                source={require("../../../assets/botaoEnviar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.txt_area_doces}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.conteiner_ScrollView}>
              {listaDoces.map((item, index) => (
                <View key={index} style={styles.item_id1}>
                  <Text style={styles.txt_item_id1}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => removerItem(index, setListaDoces)}
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

        {/* Outros */}
        <View style={styles.box}>
          <Text style={styles.txtBox_h1}>Outros:</Text>
          <View style={styles.campo_escreAq}>
            <TextInput
              style={styles.txt_escreAq}
              placeholder="escreva aqui"
              placeholderTextColor="#E5E3F6"
              value={outros}
              onChangeText={setOutros}
            />
            <TouchableOpacity
              style={styles.btEnviar}
              onPress={() => adicionarItem(outros, setListaOutros, setOutros)}
            >
              <Image
                source={require("../../../assets/botaoEnviar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.txt_area_outros}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.conteiner_ScrollView}>
              {listaOutros.map((item, index) => (
                <View key={index} style={styles.item_id1}>
                  <Text style={styles.txt_item_id1}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => removerItem(index, setListaProteinas)}
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
        <TouchableOpacity style={styles.gerarButton} onPress={gerarDieta}>
          <Text style={styles.gerarButtonText}>GERAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },

  container_nav: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  container_header: {
    width: "80%",
    alignItems: "center",
    marginTop: 80,
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
    width: "90%",
    top: 30,
  },

  body_title: {
    color: "#B5B2C6",
    fontSize: 24,
    fontFamily: "BreeSerif_400Regular",
  },

  box: {
    top: 20,
    marginBottom: 40,
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

  btEnviar: {
    backgroundColor: "#E5E3F6",
    padding: 5,
    borderRadius: 30,
  },

  txt_escreAq: {
    color: "#E5E3F6",
    fontSize: 18,
    fontFamily: "BreeSerif_400Regular",
  },

  txt_area_proteinas: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },

  txt_area_carboidratos: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },

  txt_area_vegetais_legumes: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },

  txt_area_frutas: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },

  txt_area_doces: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },

  txt_area_outros: {
    width: "100%",
    height: 150,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
  },

  gerarButton: {
    backgroundColor: "#B5B2C6",
    width: "100%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 100,
  },

  gerarButtonText: {
    color: "#E5E3F6",
    fontSize: 24,
    fontFamily: "BreeSerif_400Regular",
  },

  txt_item_id1: {
    color: "white",
    fontSize: 18,
    fontFamily: "BreeSerif_400Regular",
    marginRight: 10,
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

  conteiner_ScrollView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro para modal
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
