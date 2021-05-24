import React, { useState, createContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    //const [loading, setLoading] = useState(true);
    const [loading, setLoadingAuth] = useState(false);

    async function signIn(email, password){
        setLoadingAuth(true);

        await auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            //Buscar o nome do usuário logado
            const userProfile = await firestore().collection('users')
            .doc(uid).get();

            console.log(userProfile.data().nome);

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                email: value.user.email
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
        
    }

    async function signUp(email, password, name){
        setLoadingAuth(true);

        await auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid).set({
                nome: name
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
            })

        })
        .catch((error) => {
            console.log(error);
        })
    }

    async function storageUser(data){
        await AsyncStorage.setItem('devApp', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, signUp, signIn, loadingAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;