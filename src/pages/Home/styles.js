import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #36393f;
`;

export const ButtonPost = styled.TouchableOpacity`
    background-color: #202225;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 5%;
    right: 4%;
`;

export const ListPosts = styled.FlatList`
    flex: 1;
    background-color: #F1F1F1;
`;