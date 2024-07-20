// app/privacy.jsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Privacy = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.goBack()} />
            </View>
            <View>
                <Text style={styles.title}>Privacy Policy</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.text}>
                    Last updated: 08/07/2024{"\n"}{"\n"}

                    At The Riders, we are committed to protecting your privacy. We collect personal information such as your name, email address, phone number, and payment information to provide and maintain our services, process bookings and payments, and improve user experience. We also collect location information for accurate ride tracking and booking, as well as usage data to optimize our services. Your information is shared with third parties only with your consent, to comply with legal obligations, or with service providers who assist in operating our App. We implement industry-standard security measures to protect your data, but please note that no method of transmission over the internet or electronic storage is 100% secure.


                </Text>

                <Text style={styles.text}> You have the right to access and update your personal information, request the deletion of your data, and opt-out of receiving marketing communications. We may update our Privacy Policy from time to time and will notify you of any changes by posting the new Privacy Policy on this page. If you have any questions or concerns about this Privacy Policy, please contact us at [Contact Information]. This privacy policy is provided for general information purposes only. Please adapt it to your specific needs and consult a legal professional to ensure compliance with relevant laws and regulations.</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingVertical: 20,
    },
    text: {
        fontSize: 13,
        lineHeight: 24,
        textAlign: 'justify',
        marginBottom: 10,
    },
});

export default Privacy;
