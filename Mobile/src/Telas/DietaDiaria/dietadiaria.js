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

  useEffect(() => {
    // Simulação de uma resposta da API com JSON corrigido
    const respostaDaApi = `
    {
      "dietaDoDia": [
        {
          "refeicao": "Café da manhã",
          "alimentos": [
            {"nome": "Iogurte light", "quantidade_g": 200, "calorias": 120},
            {"nome": "Banana", "quantidade_g": 100, "calorias": 90},
            {"nome": "Whey protein", "quantidade_g": 30, "calorias": 120}
          ],
          "total_calorias": 330
        },
        {
          "refeicao": "Lanche da manhã",
          "alimentos": [
            {"nome": "Maçã", "quantidade_g": 100, "calorias": 52},
            {"nome": "Ovo cozido", "quantidade_g": 50, "calorias": 78}
          ],
          "total_calorias": 130
        },
        {
          "refeicao": "Almoço",
          "alimentos": [
            {"nome": "Frango grelhado", "quantidade_g": 150, "calorias": 270},
            {"nome": "Arroz", "quantidade_g": 100, "calorias": 130},
            {"nome": "Feijão", "quantidade_g": 50, "calorias": 70},
            {"nome": "Brócolis", "quantidade_g": 80, "calorias": 30},
            {"nome": "Tomate", "quantidade_g": 50, "calorias": 10}
          ],
          "total_calorias": 510
        },
        {
          "refeicao": "Lanche da tarde",
          "alimentos": [
            {"nome": "Pão integral", "quantidade_g": 60, "calorias": 160},
            {"nome": "Ovo cozido", "quantidade_g": 50, "calorias": 78}
          ],
          "total_calorias": 238
        },
        {
          "refeicao": "Jantar",
          "alimentos": [
            {"nome": "Frango grelhado", "quantidade_g": 120, "calorias": 216},
            {"nome": "Alface", "quantidade_g": 50, "calorias": 8},
            {"nome": "Tomate", "quantidade_g": 50, "calorias": 10},
            {"nome": "Brócolis", "quantidade_g": 80, "calorias": 30}
          ],
          "total_calorias": 264
        },
        {
          "refeicao": "Ceia",
          "alimentos": [
            {"nome": "Iogurte light", "quantidade_g": 150, "calorias": 90},
            {"nome": "Banana", "quantidade_g": 100, "calorias": 90}
          ],
          "total_calorias": 180
        }
      ],
      "macronutrientesTotais": {
        "proteinas": 150,
        "carboidratos": 200,
        "gorduras": 70,
        "caloriasTotais": 1900
      },
      "observacao": "Você tem uma quantidade limitada de alimentos disponíveis. Considere adicionar mais fontes de proteínas, vegetais ou carboidratos complexos para equilibrar melhor sua dieta. Caso tenha outros alimentos que não foram mencionados, podemos adaptá-los à dieta."
    }
    `;

    try {
      // Converte a string JSON em um objeto JavaScript
      const dadosConvertidos = JSON.parse(respostaDaApi);
      setDieta(dadosConvertidos);
    } catch (error) {
      console.error("Erro ao parsear JSON:", error);
    }
  }, []);

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
                <Text style={styles.txt_p_body}>
                  Total de calorias: {refeicao.total_calorias} kcal
                </Text>
              </View>
            ))}
          </View>
          
          <View style={styles.box_macronutrientes}>
            <Text style={styles.txt_h1_body}>Macronutrientes Totais</Text>
            <Text style={styles.txt_p_body}>Proteínas: {dieta.macronutrientesTotais.proteinas}g</Text>
            <Text style={styles.txt_p_body}>Carboidratos: {dieta.macronutrientesTotais.carboidratos}g</Text>
            <Text style={styles.txt_p_body}>Gorduras: {dieta.macronutrientesTotais.gorduras}g</Text>
            <Text style={styles.txt_p_body}>Calorias Totais: {dieta.macronutrientesTotais.caloriasTotais} kcal</Text>
          </View>

          <View style={styles.box_observacao}>
            <Text style={styles.txt_h1_body}>Observação</Text>
            <Text style={styles.txt_p_body}>{dieta.observacao}</Text>
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
  box_macronutrientes: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  box_observacao: {
    backgroundColor: "#ffefef",
    padding: 15,
    borderRadius: 10,
  },
});
