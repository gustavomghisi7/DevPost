import React, { useState, useContext } from 'react';
import { Text, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles';

import * as Animatable from 'react-native-animatable';

const TitleAnimated = Animatable.createAnimatableComponent(Title);

export default function Login() {
    const { signIn, signUp, loadingAuth } = useContext(AuthContext);
    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Alternar entre as telas de SignIn e SignUp
    function toggleLogin(){
        setLogin(!login);
        setName('');
        setEmail('');
        setPassword('');
    }

    function handleLogin(){
        if(email === '' || password === ''){
            console.log('Preencha todos os campos!');
            return;
        }
        
        signIn(email, password);
    }

    function handleSignUp(){
        if(name === '' || email === '' || password === ''){
            console.log('Preencha todos os campos!');
            return;
        }

        //Cadastrando usuário
        signUp(email, password, name);
    }

    //SignIn
    if(login){
        return(
            <Container>
                <TitleAnimated animation="flipInY">Logo
                    <Text style={{ color: '#E52246'}}>Aqui</Text>
                </TitleAnimated>

                <Input
                    placeholder="email@email.com"
                    value={email}
                    onChangeText={ (text) => setEmail(text) }
                />

                <Input
                    placeholder="*****"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={ (text) => setPassword(text) }
                />

                <Button onPress={handleLogin}>
                    {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color="#FFF" />
                        ) : (
                            <ButtonText>Acessar</ButtonText>
                        )
                    }
                </Button>

                <SignUpButton onPress={ () => toggleLogin() }>
                    <SignUpText>Criar uma conta</SignUpText>
                </SignUpButton>
            </Container>
        )
    }

    //SignUp
    return (
        <Container>
            <TitleAnimated animation="fadeInUp">Logo
                <Text style={{ color: '#E52246'}}>Aqui</Text>
            </TitleAnimated>

            <Input
                placeholder="Seu nome completo"
                value={name}
                onChangeText={(text) => setName(text)}
            />

            <Input
                placeholder="email@email.com"
                value={email}
                onChangeText={ (text) => setEmail(text) }
            />

            <Input
                placeholder="*****"
                secureTextEntry={true}
                value={password}
                onChangeText={ (text) => setPassword(text) }
            />

            <Button onPress={handleSignUp}>
                {
                    loadingAuth ? (
                        <ActivityIndicator size={20} color="#FFF" />
                    ) : (
                        <ButtonText>Cadastrar</ButtonText>
                    )
                }
            </Button>

            <SignUpButton onPress={ () => toggleLogin() }>
                <SignUpText>Já tenho uma conta</SignUpText>
            </SignUpButton>
        </Container>
    );
}