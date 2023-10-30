import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig'


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = () => {
    auth.signInWithEmailAndPassword(email, password)
    .then((creds) => {
      const user = creds.user;
      console.log("Logged in with: ", user.email)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Enter your email" />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
      </View>

      <Button title="Login" onPress={submitLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
    width: '80%'
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 8,
    height: 40,
    width: '100%'
  },
});

export default Login;
