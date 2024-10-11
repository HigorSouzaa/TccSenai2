import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { db } from "../../Config/Firebase/fb"; // Importando a configuração do Firestore
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore"; // Importando métodos do Firestore

export default function InsiraEmail() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    BreeSerif_400Regular,
  });

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!fontsLoaded) {
    return null;
  }

  // Gera um código de 6 dígitos
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Função para lidar com o envio do código
  const handleSendCode = async () => {
    if (!email) {
      setErrorMessage("Por favor, insira seu email.");
      return;
    }

    console.log("Tentando enviar código para o email:", email);

    const code = generateCode(); // Gere o código de recuperação

    try {
      // Referência para a coleção 'usuarios'
      const usuariosRef = collection(db, "usuarios");

      // Cria uma query para buscar o documento com o email fornecido
      const q = query(usuariosRef, where("email", "==", email));

      // Executa a query
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage("Usuário não encontrado.");
        return;
      }

      // Salvar o código no Firestore na coleção 'passwordResets'
      await setDoc(doc(db, "passwordResets", email), {
        code: code,
        createdAt: new Date(), // Salvando o timestamp
      });

      // Enviar o e-mail usando SendGrid
      await sendEmail(email, code);

      // Exibe um alerta de sucesso e navega para a próxima tela
      Alert.alert("Sucesso", `Código enviado para ${email}`);
      navigation.navigate("RecuperarSenha", { email: email });
    } catch (error) {
      console.log("Erro ao verificar o email ou enviar o código:", error);
      setErrorMessage("Erro ao enviar o código. Tente novamente.");
    }
  };

  // Função para enviar e-mail usando SendGrid
  const sendEmail = async (to_email, code) => {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer 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`, // Sua API Key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: to_email }],
            subject: "Redefinição de Senha",
          },
        ],
        from: { email: "higorhenry200@gmail.com" }, // Use um e-mail que você autenticou
        content: [
          {
            type: "text/html",
            value: `
            <h2>Redefinição de Senha</h2>
            <p>Olá,</p>
            <p>Você solicitou um código de redefinição de senha.</p>
            <p>Seu código é: <strong>${code}</strong></p>
            <p>Se você não solicitou isso, por favor, ignore este e-mail.</p>
            <p>Atenciosamente,<br />IaHealthFit</p>
          `,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao enviar o e-mail");
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/imgLogoHome.png")}
          style={{ width: 340, marginTop: 140 }}
          resizeMode="contain"
        />
        <View style={styles.containerInputs}>
          <Text style={styles.txtInputs}>Email:</Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../../../assets/emailImg.png")}
              resizeMode="contain"
            />
            <TextInput
              style={styles.input}
              fontSize={22}
              placeholder="Insira seu email"
              placeholderTextColor={"#E6E3F6"}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrorMessage(""); // Limpar mensagem de erro ao digitar
              }}
            />
          </View>
        </View>

        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.btSendCode} onPress={handleSendCode}>
          <View>
            <Text style={styles.txt_btSendCode}>Enviar código</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.txt_footer}>LOGIN</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containerInputs: {
    width: "80%",
    marginTop: 80,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 55,
    borderRadius: 15,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
  },
  input: {
    marginLeft: 10,
    color: "#CAC1F9",
    width: "85%",
  },
  txtInputs: {
    marginBottom: 3,
    fontSize: 40,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFFF",
  },
  btSendCode: {
    marginTop: 50,
    marginBottom: 190,
    backgroundColor: "#CAC1F9",
    width: "70%",
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: "#0003",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 3,
    shadowRadius: 1,
  },
  txt_btSendCode: {
    fontSize: 40,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFFF",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CAC1F9",
    width: "98%",
    height: 150,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  txt_footer: {
    fontSize: 60,
    fontFamily: "BreeSerif_400Regular",
    color: "#FFFF",
    bottom: 10,
    letterSpacing: 3,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});
