import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';

import { Modal, Platform } from 'react-native';

import {
    Container,
    UploadButton,
    UploadText,
    Avatar,
    Name,
    Email,
    Button,
    ButtonText,
    ModalContainer,
    ButtonBack,
    Input
} from './styles';

import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';


export default function Profile() {
    const { signOut, user, storageUser, setUser } = useContext(AuthContext);

    const [nome, setNome] = useState(user?.nome)
    const [url, setUrl] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function load(){
            try{
                let response = await storage().ref('users').child(user?.uid).getDownloadURL();
                setUrl(response);
            } catch(err){
                console.log('ERROR, Nenhuma foto foi encontrada.');
            }
        }

        load();
    }, []);


    //Atualizar Perfil
    async function updateProfile(){
        if(nome === ''){
            return;
        }

        await firestore().collection('users')
        .doc(user.uid).update({
            nome: nome
        })

        //Buscar todos posts desse usuario
        const postDocs = await firestore().collection('posts')
        .where('userId', '==', user.uid).get();

        //Percorrer e atualizar os nomes do autor desse post
        postDocs.forEach( async doc => {
            await firestore().collection('posts').doc(doc.id).update({
                autor: nome
            })
        })

        let data = {
            uid: user.uid,
            nome: nome,
            email: user.email,
        };

        setUser(data);
        storageUser(data);
        setOpen(false);
    }

    const uploadFile = () => {
        const options = {
            noData: true,
            mediaType: 'photo'
        };

        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel){
                console.log('Cancelou o Modal.');
            } else if (response.error){
                console.log('Parece que deu algum erro: ' + response.error);
            } else {
                uploadFileFirebase(response)
                .then( () => {
                    uploadAvatarPosts();
                })
                setUrl(response.uri);
            }
        })
    }

    const getFileLocalPath = response => {
        const { path, uri} = response;
        return Platform.OS === 'android' ? path : uri;
    }

    const uploadFileFirebase = async response => {
        const fileSource = getFileLocalPath(response);
        const storageRef = storage().ref('users').child(user?.uid);
        return await storageRef.putFile(fileSource)
    };

    async function uploadAvatarPosts(){
        const storageRef = storage().ref('users').child(user?.uid);
        const url = await storageRef.getDownloadURL()
        .then( async image => {
            //Atualizar todos avatarUrl dos posts desse user
            const postDocs = await firestore().collection('posts')
            .where('userId', '==', user.uid).get();

            postDocs.forEach( async doc => {
                await firestore().collection('posts').doc(doc.id).update({
                    avatarUrl: image
                })
            })
        })

        .catch((error) => {
            console.log(error);
        })

    }

    return (
        <Container>
            <Header/>

            {
                url ?
                (
                    <UploadButton onPress={ uploadFile }>
                        <UploadText>+</UploadText>
                        <Avatar
                            source={{ uri: url }}
                        />
                    </UploadButton>
                ) : 
                (
                    <UploadButton onPress={ uploadFile }>
                        <UploadText>+</UploadText>
                    </UploadButton>
                )
            }

            <Name numberOfLines={1}>{user.nome}</Name>
            <Email numberOfLines={1}>{user.email}</Email>

            <Button bg="#428CFD" onPress={ () => setOpen(true) }>
                <ButtonText color="#FFF">Atualizar Perfil</ButtonText>
            </Button>

            <Button bg="#F1F1F1" onPress={ () => signOut() }>
                <ButtonText color="#3B3B3B">Sair</ButtonText>
            </Button>

            <Modal visible={open} animationType="slide" transparent={true} >
                <ModalContainer behavior={ Platform.OS === 'android' ? '' : 'padding' } >
                    <ButtonBack onPress={ () => setOpen(false) }>
                        <Feather
                            name="arrow-left"
                            size={22}
                            color="#121212"
                        />
                        <ButtonText color="#121212">Voltar</ButtonText>
                    </ButtonBack>

                    <Input
                        placeholder={user?.nome}
                        value={nome}
                        onChangeText={ (text) => setNome(text) }
                    />

                    <Button bg="#428CFD" onPress={updateProfile}>
                        <ButtonText color="#F1F1F1">Atualizar</ButtonText>
                    </Button>
                </ModalContainer>
            </Modal>

        </Container>
    );
}