import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";

const TemplatePage = () => {
  const [templates, setTemplates] = useState([
    { title: "Test Template", description: "This is a test template with nothing in it.", "templateId": "/" },
    { title: "Test Template", description: "This is a test template with nothing in it.", "templateId": "/" }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Pre-made Templates</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {templates.map((template, key) => {
          return (
          <Link key={key} href={template.templateId} asChild>
            <Pressable style={styles.templateItem}>
              <Text style={styles.templateTitle}>{template.title}</Text>
              <Text style={styles.templateDescription}>{template.description}</Text>
            </Pressable>
          </Link>)
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 24,
    padding: 16,
    textAlign: "center",
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
  templateDescription: {
    fontSize: 14,
    marginTop: 8,
  },
});

export default TemplatePage;