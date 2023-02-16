import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    SafeAreaView,
    useColorScheme
} from "react-native";
import {useState} from "react";
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const LoginElements = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpUser = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            console.log(user);
        } catch (error) {
            console.log(error.message);
        }
    }

    const signInUser = async () => {
        navigation.replace("Food")
    }


    return (
        <SafeAreaView style={{flex: 1, justifyContent: "center", margin: 10}}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <Text style={styles.loginTitle}>Anmeldung</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChange={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Passwort"
                        value={password}
                        onChange={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        onPress={signUpUser}
                        style={styles.buttonOutline}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={signInUser}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                </View>
                <Text style={styles.forgotPasswordText}>Passwort vergessen?</Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loginTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '95%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 25,
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'gray',
        marginTop: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
    },
    button:{
        backgroundColor: 'black',
        width: '45%',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
    },
    buttonOutline: {
        backgroundColor: 'white',
        width: '45%',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    },
    forgotPasswordText: {
        marginTop: 15,
        textDecorationLine: 'underline',
    }
})

export default LoginElements;