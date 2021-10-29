import React, { useEffect, useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
//Import Stacks
import LoggedOutStackRoot from './LoggedOutStack';
import InitialRootStack from './InitialRootStack';
//Import AsyncStorage
import { storeData } from '../functions/AsyncStorage';

export const AuthContext = createContext(null)

const RootNavigation = () => {

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState(null);

    const onAuthStateChanged = async (result) => {
        if (result) {
            const userData = await firestore().collection('users').doc(result.uid).get();
            setUser(userData);
        } else {
            setUser(result)
        }
        if (initializing) setInitializing(false)
    }

    const getMenuItems = () => {
        const resultMenu = [];
        firestore().collection('menuItems').orderBy('orderMenu', 'asc').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const menu = doc.data();
                menu.id = doc.id;
                resultMenu.push(menu);
            });
            const jsonMenu = JSON.stringify(resultMenu)
            storeData('mainMenu', jsonMenu)
        })
    }

    useEffect(() => {
        const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
        // unsubscribe on unmount
        return authSubscriber
    }, []);

    useEffect(() => {
        getMenuItems();
    }, [])

    if (initializing) {
        return null
    }

    return (
        <NavigationContainer>
            {user ? (
                <AuthContext.Provider value={user}>
                    <InitialRootStack />
                </AuthContext.Provider>
            ) : (
                <LoggedOutStackRoot />
            )}
        </NavigationContainer>
    );
};

export default (RootNavigation);