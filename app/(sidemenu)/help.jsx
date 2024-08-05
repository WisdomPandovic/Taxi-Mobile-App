import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

const Help = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Ionicons name="help-circle" size={30} color="#000" />
                <Text style={styles.headerText}>Help & Support</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
                <Text style={styles.sectionContent}>
                    {/* Add FAQs or any relevant content here */}
                    1. How do I use the app?
                    {"\n"}2. What should I do if I encounter an issue?
                    {"\n"}3. How can I contact support?
                </Text>
                <Text style={styles.sectionTitle}>Contact Us</Text>
                <Text style={styles.sectionContent}>
                    If you need further assistance, please reach out to our support team at support@example.com.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        marginBottom: 20,
    },
});

export default Help;
