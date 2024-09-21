import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Stack, useRouter } from 'expo-router'
import Icon from "react-native-vector-icons/AntDesign";
import { useEnvironmentsStore } from "../store/EnvironmentsContext";
import { Task } from "../objects/Task";


const TemplatePage = () => {
  const environmentStore = useEnvironmentsStore()
  const router = useRouter()
  let environment = environmentStore.getEnvironment()

  const [templates, setTemplates] = useState([
    { 
      title: "Test Template", 
      items: [
        Task("test", "", 1, ["John"], "home"),
      ]
    },
    { 
      title: "Test Template 2", 
      items: [
        Task("test", "", 1, ["John"], "home"),
        Task("test", "", 1, ["John"], "home"),
        Task("test", "", 1, ["John"], "home"),
      ]
    },
  ]);

  const selectTemplate = (template) => {
    environment.tasks = template.items
    environmentStore.setEnvironment(environment)
    router.replace("/")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {templates.map((template, key) => {
          return (
            <Pressable key={key} style={styles.templateItem} onPress={() => selectTemplate(template)}>
              <Text style={styles.templateTitle}>{template.title}</Text>
              <View style={styles.iconsOnTemplates}>
                {template.items.map((task, key) => (
                  <Icon style={styles.templateIcon} size={25} name={task.icon} key={key}/>
                ))}
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  templateItem: {
    backgroundColor: "white",
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 4,
  },
  templateTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  iconsOnTemplates: {
    flexDirection: 'row',
    marginTop: 10
  },
  templateIcon: {
    marginRight: 5
  }
});

export default TemplatePage;