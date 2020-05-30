import * as React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    ToastAndroid,
    ImageBackground,
    AsyncStorage,
    Button,
    Alert
} from 'react-native';
import * as theme from "../constants/Theme.js";
import {
    CustomText,
    CustomTextInput,
    CustomButton
} from "../components/CustomElements";
import { withFirebaseHOC } from "../config/Firebase";

const VALID_EMAIL = "";
const VALID_PASSWORD = "";
const RegisterScreen = (props) => {
    const { navigation, firebase } = props; 
    const name = "";   
    const [email, setEmail] = React.useState(VALID_EMAIL);
    const [password, setPassword] = React.useState(VALID_PASSWORD);
    const [errors, setErrors] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [botaoLogarDesativado, setBotaoLogarDesativado] = React.useState(true)
    const [authState, setAuthState] = React.useState(null);

    const handleOnLogin = async _ => {
        try {
            const response = await firebase.loginWithEmail(email, password);

            if (response.user) {
                Alert.alert(`Bem vindo ${response.user.email}`)
                navigation.navigate("Home");
            } else {
            }
        } catch (error) {
            Alert.alert('error', error.message)
            //actions.setFieldError("general", error.message);
        } finally {
            // Alert.alert('submit')
            // actions.setSubmitting(false);
        }
    }

    const handleLoginGoogle = async _ => {
        const response = firebase.loginWithGoogle()
    }

    React.useEffect(_ => {
        if (email.length > 0 && password.length > 0) setBotaoLogarDesativado(false)
    })

    const updateEmail = email => {
        setEmail(email)
    }

    const updatePassword = password => {
        setPassword(password)
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ImageBackground source={require('../assets/images/robot-dev.png')} style={[styles.image]}>

                <CustomTextInput                    
                    value={name}
                    textContentType="text"
                    type="text"
                    style={styles.input}
                    placeholder="Nome"
                />
                <CustomTextInput
                    onChangeText={updateEmail}
                    value={email}
                    textContentType="emailAddress"
                    type="emailAddress"
                    style={styles.input}
                    placeholder="Email"
                />
                <CustomTextInput
                    onChangeText={updatePassword}
                    value={password}
                    secureTextEntry={true}
                    textContentType="password"
                    type="password"
                    style={{ ...styles.input, marginBottom: 25 }}
                    placeholder="Senha"
                />
                <CustomButton isDisabled={botaoLogarDesativado}
                 title="Entrar" />
                <CustomText onPress={() => props.navigation.navigate('Links')}
                    style={styles.opcoesFinais}>
                    Teste Navigate Links
                </CustomText>
                
                <Button
                    title="Sign In with Google "
                    onPress={async () => handleLoginGoogle()}
                />
            </ImageBackground>

        </KeyboardAvoidingView>
    );
}

export default withFirebaseHOC(RegisterScreen)

RegisterScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    Button: {
        width:'40%'       
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        padding: 15,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 15,
    },
    logo_container: {
        flex: 1,
        position: 'absolute',
        top: '35%',
        zIndex: 5,
        width: '100%',
        borderBottomColor: 'green',
        borderBottomWidth: 1,
        borderLeftColor: 'green',
        borderLeftWidth: 1,
        borderRightColor: 'green',
        borderRightWidth: 1,
        alignSelf: 'center'
    },
    title: {
        width: '100%',
        fontSize: 32,
        marginTop: 15
    },
    subtitle: {
        marginVertical: 15,
        fontSize: 11,
        color: 'grey'
    },
    input: {
        backgroundColor: theme.colors.primary,
        padding: 13,
        paddingLeft: 25,
        marginBottom: 5,
        alignSelf: 'center',
        marginTop: 15
    },
    imageBg: {
        width: '100%',
        height: 70,
        resizeMode: "cover",
        justifyContent: 'flex-end',
        justifyContent: 'center'
    },
    opcoesFinais: {
        color: 'grey',
        textAlign: 'center',
        width: '100%',
        fontSize: 14,
        marginTop: 25
    }
})