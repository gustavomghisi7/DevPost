import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Header, Avatar, Name, ContentView, Content, Actions, LikeButton, Like, TimePost } from './styles';

export default function PostsList({ data, userId }) {
    return (
        <Container>
            <Header>
                <Avatar
                    source={require('../../assets/avatar.png')}
                />
                <Name>Gustavo</Name>
            </Header>

            <ContentView>
                <Content>Esse é meu primeiro post aqui na plataforma</Content>
            </ContentView>

            <Actions>
                <LikeButton>
                    <Like>60</Like>
                    <MaterialCommunityIcons
                        name="heart-plus-outline"
                        size={20}
                        color="#E52246"
                    />
                </LikeButton>

                <TimePost>
                    há 10 minutos
                </TimePost>
            </Actions>

        </Container>
    );
}