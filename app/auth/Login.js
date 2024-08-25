import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import { auth } from '../../firebaseConfig';
import { useFonts, Quicksand_400Regular } from '@expo-google-fonts/quicksand';
import { Stack, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';
import { useEnvironmentsStore } from "../store/EnvironmentsContext";

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// GoogleSignin.configure();

const Login = ({ setInitialView }) => {
  const environmentsStore = useEnvironmentsStore()
  const text = environmentsStore.language;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [error, setError] = useState("");

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const submitLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
      .then((creds) => {
        const user = creds.user;
      })
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          setError("Invalid login credentials. Please try again.");
        } else {
          setError("There was an internal error logging you in. Please contact an admin.")
        }
      });
  }

  const [fontsLoaded] = useFonts({
    Quicksand: Quicksand_400Regular,
  });

  if (!fontsLoaded) {
    return null; // You can return a loading indicator here if needed
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      

      <View style={{width: '100%', alignItems: 'center', marginTop: 75}}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={styles.loginViewText}>
            <Text style={{ fontSize: 32, fontFamily: 'Quicksand' }}>{text.logIn}</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder={text.email} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder={text.password}
              secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on visibility state
            />
            <Pressable onPress={togglePasswordVisibility} style={styles.visibilityIcon}>
              <Icon
                name={isPasswordVisible ? 'eye' : 'eyeo'}
                size={24}
                color="#000"
              />
            </Pressable>
          </View>

          {error !== "" ? <Text style={{color: 'red', width: '90%'}}>{error}</Text> : <></>}

          <Pressable style={styles.forgotPasswordLinkView}>
            <Text style={{ textDecorationLine: 'underline' }}>{text.forgotPassword}</Text>
          </Pressable>

          <Pressable onPress={submitLogin} style={styles.loginButton}>
            <Text style={{ fontSize: 26, fontWeight: 'semibold' }}>{text.logIn}</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
          <View>
            <Text style={{ width: 120, textAlign: 'center' }}>{text.orLogInWith}</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
        </View>

        <View style={styles.loginWithSocialMedia}>
          <Icon size={50} name="google" />
          <Icon size={50} color="#1877F2" name="facebook-square" />
          <Icon size={50} name="apple1" />
        </View>
      </View>
      

      <View style={styles.dontHaveAccount}>
        <Text>{text.dontHaveAnAccount} </Text>
        <Pressable onPress={() => {setInitialView("register")}}>
          <Text style={{ fontWeight: 'bold' }}>{text.signUpNow}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
    width: '90%',
    position: 'relative',
  },
  input: {
    borderWidth: 2,
    borderColor: '#D9D9D9',
    borderRadius: 15,
    paddingLeft: 20,
    height: 60,
    width: '100%',
  },
  loginViewText: {
    width: '90%',
    marginBottom: 30,
  },
  forgotPasswordLinkView: {
    width: '90%',
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  loginButton: {
    backgroundColor: '#80BDD7',
    borderRadius: 15,
    width: '90%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    marginBottom: 30
  },
  loginWithSocialMedia: {
    marginTop: 25,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-evenly',
  },
  dontHaveAccount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15
  },
  visibilityIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default Login;
