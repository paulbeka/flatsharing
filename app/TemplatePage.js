import React, { useState } from "react";
import { 
  SafeAreaView, View, ScrollView, Text, StyleSheet
} from "react-native";


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
            <Link>
              <View>
                <Text>{template.title}</Text>
                <Text>{template.description}</Text>
              </View>
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