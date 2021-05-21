import React, { useState } from 'react';
import { Text } from 'react-native';
import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles';

export default function Login() {
    const [login, setLogin] = useState(true);

    //Alternar entre as telas de SignIn e SignUp
    function toggleLogin(){
        setLogin(!login);
    }

    //SignIn
    if(login){
        return(
            <Container>
                <Title>Dev
                    <Text style={{ color: '#E52246'}}>Post</Text>
                </Title>

                <Input
                    placeholder="seuemail@provedor.com"
                />

                <Input
                    placeholder="*****"
                    secureTextEntry={true}
                />

                <Button onPress={ () => alert('Teste')}>
                    <ButtonText>Acessar</ButtonText>
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
            <Title>Dev
                <Text style={{ color: '#E52246'}}>Post</Text>
            </Title>

            <Input
                placeholder="Seu nome completo"
            />

            <Input
                placeholder="seuemail@provedor.com"
            />

            <Input
                placeholder="*****"
                secureTextEntry={true}
            />

            <Button onPress={ () => alert('Teste')}>
                <ButtonText>Cadastrar</ButtonText>
            </Button>

            <SignUpButton onPress={ () => toggleLogin() }>
                <SignUpText>Já tenho uma conta</SignUpText>
            </SignUpButton>
        </Container>
    );
}