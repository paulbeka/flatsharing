import React from "react";
import Checkbox from 'expo-checkbox';
import {
  View, Text, ScrollView, StyleSheet
} from "react-native"

const FlatmatePicker = ({flatmatesIncluded, setFlatmatesIncluded}) => {

  const handleFlatmateCheckboxChange = (index) => {
    const updatedFlatmatesIncluded = [...flatmatesIncluded];
    updatedFlatmatesIncluded[index].isIncluded = !updatedFlatmatesIncluded[index].isIncluded;
    setFlatmatesIncluded(updatedFlatmatesIncluded);
  };

  return (
    <View style={{width: '100%', alignItems: 'center' }}>
      <View style={{width: '100%'}}>
        <Text style={{fontFamily: 'Bold', fontSize: 15, marginTop: 5}}>Flatmates included:</Text>
      </View>

      <ScrollView style={{...styles.flatmatePicker, height: 100* flatmatesIncluded.length}}>
        {flatmatesIncluded.map((flatmate, index) => {
          return (
            <View style={styles.flatmateView} key={index}>
              {/* This will be the profile picture of the flatmate one day */}
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                <View style={{width: 40, height: 40, borderRadius: 20, borderWidth: 1}}></View>
                <Text style={{marginLeft: 20}}>{flatmate.name}</Text>
              </View>
              <View style={{marginRight: 20}}>
                <Checkbox
                  value={flatmate.isIncluded}
                  onValueChange={() => handleFlatmateCheckboxChange(index)}
                  color={false ? '#4630EB' : undefined}
                  style={{ width: 35, height: 35}}
                />
              </View>
            </View>
          )
        })}
      </ScrollView>  
    </View>
  )
}

const styles = StyleSheet.create({
  flatmatePicker: {
    marginTop: 10,
    marginBottom: 5,
    width: '100%',
  },
  flatmateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 10,
    marginBottom: 5,
    borderRadius: 10
  },
})

export default FlatmatePicker