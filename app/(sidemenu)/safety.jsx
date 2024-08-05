import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Safety = () => {
    const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
         <View style={styles.goBack}>
                <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.goBack()} />
            </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Safety is Our Priority</Text>
      </View>
      <View style={styles.section}>
        <Image source={require('@/assets/images/taxi.jpg')} style={styles.image}/>
        <Text style={styles.sectionTitle}>Safety Measures</Text>
        <Text style={styles.sectionText}>
          We take your safety seriously. Our vehicles are sanitized regularly, and our drivers undergo rigorous background checks and safety training.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Passenger Tips</Text>
        <Text style={styles.sectionText}>
          - Always check the driver's identification and vehicle details before starting your ride.
          {'\n'}- Share your trip details with a trusted contact.
          {'\n'}- Wear a seatbelt at all times and follow local safety regulations.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <Text style={styles.sectionText}>
          In case of an emergency, please contact local authorities or our 24/7 support at (123) 456-7890.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  goBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
},
  header: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#B99470',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6B7769',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default Safety;
