import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../../Config/Firebase/fb"; // Importando a configuração do Firestore
import { doc, getDoc } from "firebase/firestore"; // Importe os métodos corretos do Firestore

export default function RecuperarSenha() {
  const navigation = useNavigation();
  const route = useRoute(); // Obtém o objeto `route` para acessar os parâmetros
  const { email } = route.params; // Acessa o e-mail passado pela tela anterior

  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  const [codigo1, setCodigo1] = useState("");
  const [codigo2, setCodigo2] = useState("");
  const [codigo3, setCodigo3] = useState("");
  const [codigo4, setCodigo4] = useState("");
  const [codigo5, setCodigo5] = useState("");
  const [codigo6, setCodigo6] = useState("");

  if (!fontsLoaded) {
    return null;
  }

  // Função para verificar o código de recuperação
  const verifyCode = async (email, inputCode) => {
    try {
      const docRef = doc(db, "passwordResets", email); // Use o método correto para acessar o documento
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.code === inputCode) {
          const createdAt = data.createdAt.toDate();
          const now = new Date();
          const diffMinutes = (now - createdAt) / 1000 / 60;

          if (diffMinutes <= 10) {
            console.log("Código validado com sucesso!");
            return true;
          } else {
            console.log("Código expirado.");
            return false;
          }
        } else {
          console.log("Código incorreto.");
          return false;
        }
      } else {
        console.log("Nenhum código encontrado para esse e-mail.");
        return false;
      }
    } catch (error) {
      console.error("Erro ao verificar o código: ", error);
      return false;
    }
  };

  // Função para lidar com a recuperação da senha
  const handleRecoverPassword = async () => {
    const inputCode = `${codigo1}${codigo2}${codigo3}${codigo4}${codigo5}${codigo6}`;
    const isValid = await verifyCode(email, inputCode);

    if (isValid) {
      // Navega para a tela de redefinição de senha
      navigation.navigate("MudarSenha", { email: email });
    } else {
      console.log("Código inválido ou expirado.");
      // Aqui você pode mostrar uma mensagem de erro na interface do usuário
    }
  };

  // Função para reenvio de código
  const handleResendCode = async () => {
    try {
      // Aqui você deve reutilizar a função de envio de código
      await sendRecoveryCode(email);
      console.log("Código reenviado.");
    } catch (error) {
      console.error("Erro ao reenviar o código: ", error);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txt_h1_header}>Crie uma nova senha</Text>
        <Text style={styles.txt_p_header}>
          crie uma nova senha e nunca mande para ninguém para sua segurança
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.inputs_codigos}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={codigo1}
            onChangeText={setCodigo1}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={codigo2}
            onChangeText={setCodigo2}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={codigo3}
            onChangeText={setCodigo3}
          />
          <Text style={styles.dash}>-</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={codigo4}
            onChangeText={setCodigo4}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={codigo5}
            onChangeText={setCodigo5}
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={1}
            value={codigo6}
            onChangeText={setCodigo6}
          />
        </View>
        <TouchableOpacity
          style={styles.btRecuperar}
          onPress={handleRecoverPassword}
        >
          <Text style={styles.txt_h1_btRecuperar}>Recuperar</Text>
        </TouchableOpacity>
        <Text style={styles.reenviar}>
          Não recebeu o código?{" "}
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.link}>Reenvie.</Text>
          </TouchableOpacity>
        </Text>
      </View>
      <Image
        source={require("../../../assets/imgLogoHome.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
  },
  header: {
    marginBottom: 40,
    backgroundColor: "#CAC1F9",
    width: "100%",
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    height: 300,
  },
  txt_h1_header: {
    fontSize: 28,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFF",
    left: 30,
    top: 90,
  },
  txt_p_header: {
    fontSize: 16,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFF",
    marginTop: 30,
    left: 34,
    top: 60,
    width: 300,
  },
  box: {
    backgroundColor: "#FFF",
    borderRadius: 50,
    paddingVertical: 30,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "90%",
    bottom: 90,
  },
  inputs_codigos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  input: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#E6E3F6",
    textAlign: "center",
    fontSize: 24,
    color: "#333",
    marginHorizontal: 5,
  },
  dash: {
    fontSize: 28,
    color: "#CAC1F9",
  },
  btRecuperar: {
    backgroundColor: "#CAC1F9",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 50,
    marginVertical: 20,
  },
  txt_h1_btRecuperar: {
    fontSize: 32,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFF",
    bottom: 3,
  },
  reenviar: {
    fontSize: 14,
    color: "#666",
    fontFamily: "BreeSerif_400Regular",
    marginBottom: 15,
  },
  link: {
    color: "#CAC1F9",
    textDecorationLine: "underline",
  },
  logo: {
    width: 350,
    marginTop: 50,
  },
});
