import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // Importando useRoute
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../../Config/Firebase/fb"; // Importando a configuração do Firebase
import { collection, query, where, getDocs, setDoc } from "firebase/firestore";

export default function MudarSenha() {
  const navigation = useNavigation();
  const route = useRoute(); // Usando useRoute para acessar os parâmetros da navegação
  const { email } = route.params; // Obtendo o email passado da tela anterior

  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repeatPasswordVisible, setRepeatPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState(""); // Estado para nova senha
  const [repeatPassword, setRepeatPassword] = useState(""); // Estado para repetir a senha
  const [errorMessage, setErrorMessage] = useState(""); // Estado para a mensagem de erro

  if (!fontsLoaded) {
    return null;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setRepeatPasswordVisible(!repeatPasswordVisible);
  };

  const handleRecuperarSenha = async () => {
    console.log(email);
    if (newPassword !== repeatPassword) {
      setErrorMessage("As senhas não são iguais");
    } else {
      setErrorMessage("");

      // Crie uma query para buscar o documento onde o campo 'email' é igual ao email fornecido
      const usersRef = collection(db, "usuarios"); // Referência à coleção de usuários
      const q = query(
        usersRef,
        where("email", "==", email.trim().toLowerCase())
      ); // Query para buscar o email

      const querySnapshot = await getDocs(q); // Executa a query

      if (!querySnapshot.empty) {
        // Atualiza a senha do usuário para o primeiro documento encontrado
        const userDocRef = querySnapshot.docs[0].ref; // Referência ao primeiro documento encontrado
        await setDoc(userDocRef, { password: newPassword }, { merge: true });
        console.log("Senha alterada com sucesso!");
        setErrorMessage("Senha alterada com sucesso!");
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      } else {
        setErrorMessage("Usuário não encontrado.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txt_h1_header}>Crie uma nova senha</Text>
        <Text style={styles.txt_p_header}>
          Crie uma nova senha e nunca mande para ninguém para sua segurança
        </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.inputs}>
          <TextInput
            style={styles.txt_input}
            placeholder="Nova senha"
            placeholderTextColor="#CAC1F9"
            secureTextEntry={!passwordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            <Image
              source={
                passwordVisible
                  ? require("../../../assets/olhoAberto.png")
                  : require("../../../assets/olhoFechado.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.txt_input}
            placeholder="Repita a senha"
            placeholderTextColor="#CAC1F9"
            secureTextEntry={!repeatPasswordVisible}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={toggleRepeatPasswordVisibility}
          >
            <Image
              source={
                repeatPasswordVisible
                  ? require("../../../assets/olhoAberto.png")
                  : require("../../../assets/olhoFechado.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>
      <TouchableOpacity
        style={styles.btRecuperar}
        onPress={handleRecuperarSenha}
      >
        <Text style={styles.txt_h1_btRecuperar}>Trocar Senha</Text>
      </TouchableOpacity>
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
    paddingVertical: 50,
    paddingHorizontal: 40,
    alignItems: "center",
    width: "90%",
    bottom: 90,
    gap: 15,
  },
  inputs: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E6E3F6",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  txt_input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: "#333",
    fontFamily: "BreeSerif_400Regular",
  },
  eyeIcon: {
    padding: 10,
  },
  icon: {
    width: 20,
    height: 20,
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
    textAlign: "center",
  },
});
