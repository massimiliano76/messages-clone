import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import getInitials from '../../functions/getInitials';

const ContactImage = ({ image, id, gender, name }:Props) => {
    const theme:any = useTheme();
    const url = `https://randomuser.me/api/portraits/${gender === "male" ? "men" : "women"}/${id}.jpg`;

    if(!image){
        return (
            <View style={[styles.container, { backgroundColor: theme.colors.text2 }]}>
                <Text style={{ fontSize: 20, color: "#FFF" }}>{getInitials(name)}</Text>
            </View>
        )
    } else{
        return (
            <View style={styles.container}>
                <Image style={{ height: 50, width: 50, borderRadius: 50 }} source={{ uri: url }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
});

interface Props {
    image: boolean,
    id: number,
    gender: string,
    name: string
}

export default ContactImage;