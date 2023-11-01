import React, { useState } from "react";
import { 
  SafeAreaView, View, Text, StyleSheet, Pressable
} from "react-native";
import { Link } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";


const TemplatePage = () => {

  const [templates, setTemplates] = useState([
    {"title": "Test Template", "description": "This is a test template with nothing in it."}
  ])

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.titleText}>Pre-made Templates</Text>
      </View>
      <ScrollView>
        {templates.map((template, key) => {
          return (
            <Link href="/" asChild>
              <Pressable>
                <Text>{template.title}</Text>
                <Text>{template.description}</Text>
              </Pressable>
            </Link>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 18
  }
});


export default TemplatePage