import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import timestampToDate from '../../functions/timestampToDate';
import { useTheme } from '@react-navigation/native';
import ContactImage from './ContactImage';

const RecentMessage = ({ data, editing, selected }:Props) => {
    let { id, name, message, time, image, gender, read } = data;
    const [ hasRead, setHasRead ] = useState<boolean>(read);
    const [ isSelected, setIsSelected ] = useState(false);
    const theme:any = useTheme();

    useEffect(() => {
        !editing ? setIsSelected(false) : '';
    }, [editing])
    
    const select = () => {
        setHasRead(true);

        if(editing){
            setIsSelected(!isSelected);
            const index = selected.indexOf(id);
            selected.includes(id) ? selected.splice(index, 1) : selected.push(id);
        }
    }

    return (
        <TouchableOpacity onPress={select}>
            <View style={{ flexDirection: "row", paddingTop: 2, paddingBottom: 2 }}>
                {/* Not Read Icon */}
                {
                    !hasRead ? <View style={{ position: "absolute", height: "100%", width: 10, left: -9, justifyContent: "center", alignItems: "center" }}>
                                <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: theme.colors.primary }}>

                                </View>
                            </View> : null
                }

                {/* Editing */}
                <View style={[styles.selectWrapper, { display: editing ? 'flex' : 'none' }]}>
                    <View style={[{ backgroundColor: isSelected ? theme.colors.primary : theme.colors.border }, styles.selectButton ]}>
                        {
                            isSelected ? <Icon2 name="ios-checkmark" size={22} color="#FFF"/> : null
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.imageWrapper}>
                        <ContactImage image={image} id={id} gender={gender} name={name}/>
                    </View>
                    <View style={{
                        width: Dimensions.get('screen').width - (editing ? 105 : 70) - 32,
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.border
                    }}>
                        <View style={[styles.info, { width: Dimensions.get('screen').width - (editing ? 105 : 60) - (editing ? 24 : 32) }]}>
                            <Text 
                                numberOfLines={1}
                                style={{
                                    fontSize: 16,
                                    fontWeight: '500'
                            }}>{name}</Text>

                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text numberOfLines={1} style={{ color: theme.colors.text2 }} >{timestampToDate(time)}</Text>
                                <Icon
                                    name="right"
                                    size={16}
                                    color={theme.colors.text2}
                                    style={{ marginLeft: 4 }}
                                />
                            </View>
                        </View>
                        <Text numberOfLines={2} style={[styles.message, { color: theme.colors.text2, width: Dimensions.get('screen').width - (editing ? 105 : 60) - (editing ? 24 : 32) }]}>{message}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    selectWrapper: {
        paddingRight: 15,
        justifyContent: "center",
    },
    selectButton: {
        height: 22,
        width: 22,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center"
    },
    imageWrapper: {
        height: 70,
        width: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    info: {
        flexDirection: "row",
        height: 20,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    message: {
        height: 42,
        paddingTop: 2,
        lineHeight: 20,
        maxHeight: 50,
    }
});

interface Props {
    data: any
    editing: boolean
    selected: any
}

export default RecentMessage;