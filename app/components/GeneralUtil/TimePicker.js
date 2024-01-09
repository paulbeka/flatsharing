import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Platform } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import Checkbox from 'expo-checkbox';

const TimePicker = ({ timeInterval, setTimeInterval, taskType }) => {
  const [checkboxValues, setCheckboxValues] = useState({
    weekly: true,
    everyTwoWeeks: false,
    monthly: false,
    everyXDays: false,
  });
  const [xDays, setXDays] = useState(1)

  const timeDict = {
    weekly: 7,
    everyTwoWeeks: 14,
    monthly: 30,
  }

  const handleCheckboxChange = (key) => {
    setCheckboxValues((prevValues) => ({
      ...Object.fromEntries(Object.entries(prevValues).map(([k]) => [k, k === key])),
    }));
    if(key !== "everyXDays") {
      setTimeInterval(timeDict[key])
    } else {
      setTimeInterval(xDays)
    }
  };

  const setChangeXDays = (val) => {
    setXDays(parseInt(val))
    if(checkboxValues["everyXDays"]) {
      setTimeInterval(parseInt(val))
    }
  }

  const decTimeInterval = () => {
    if (timeInterval > 1) {
      setChangeXDays(timeInterval - 1);
    }
  };

  console.log(timeInterval)

  if (taskType === 0) {
    return (
      <View style={styles.mainContainer}>
        <Text>Select how often the task occurs:</Text>

        <View style={styles.optionsList}>
          <Pressable onPress={() => handleCheckboxChange('weekly')} style={styles.optionSelector}>
            <Checkbox
              value={checkboxValues.weekly}
              onValueChange={() => handleCheckboxChange('weekly')}
              color={checkboxValues.weekly ? '#4630EB' : undefined}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ marginLeft: 10 }}>Weekly</Text>
          </Pressable>
          <Pressable onPress={() => handleCheckboxChange('everyTwoWeeks')} style={styles.optionSelector}>
            <Checkbox
              value={checkboxValues.everyTwoWeeks}
              onValueChange={() => handleCheckboxChange('everyTwoWeeks')}
              color={checkboxValues.everyTwoWeeks ? '#4630EB' : undefined}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ marginLeft: 10 }}>Every 2 weeks</Text>
          </Pressable>
          <Pressable onPress={() => handleCheckboxChange('monthly')} style={styles.optionSelector}>
            <Checkbox
              value={checkboxValues.monthly}
              onValueChange={() => handleCheckboxChange('monthly')}
              color={checkboxValues.monthly ? '#4630EB' : undefined}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ marginLeft: 10 }}>Monthly</Text>
          </Pressable>
          <Pressable onPress={() => handleCheckboxChange('everyXDays')} style={styles.valueInput}>
            <Checkbox
              value={checkboxValues.everyXDays}
              onValueChange={() => handleCheckboxChange('everyXDays')}
              color={checkboxValues.everyXDays ? '#4630EB' : undefined}
              style={{ width: 15, height: 15 }}
            />
            <Text style={{ marginLeft: 10 }}>Every </Text>
            <Pressable onPress={decTimeInterval}>
              <Icon size={25} name="minus" />
            </Pressable>
            <TextInput
              value={xDays.toString()}
              onChangeText={(val) => setChangeXDays(val)}
              style={styles.inputBar}
              textAlign="center"
              keyboardType={Platform.OS !== 'android' ? 'numeric' : 'number-pad'}
            />
            <Pressable onPress={() => setChangeXDays(xDays + 1)} style={{marginRight: 5}}>
              <Icon size={25} name="plus" />
            </Pressable>
            <Text>days</Text>
          </Pressable>
        </View>

      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '89%',
  },
  optionsList: {
    marginLeft: 20,
  },
  optionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  valueInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBar: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#80BDD7',
    borderRadius: 15,
    padding: 10,
    height: 40,
  },
});

export default TimePicker;
