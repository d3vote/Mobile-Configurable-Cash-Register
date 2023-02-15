import { View, Text } from "react-native";
import React from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

const HomeScreen = () => {
    return (
        <View style={{ marginLeft: 8, marginTop: 8 }}>
            <Header title={"Products"}/>
            <SearchBar/>
        </View>
    )
}

export default HomeScreen;