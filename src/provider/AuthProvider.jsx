import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);




    const createUser = (email, password) => {
        setLoading(true);
       return createUserWithEmailAndPassword(auth, email, password);
    }


    const signInUser = (email, password) => {
        setLoading(true);
       return signInWithEmailAndPassword(auth, email, password)
    }


    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }


    const logOut = ()=> {
        setLoading(true);
        return signOut(auth);
    }



    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Current value of the current user', currentUser)
            setUser(currentUser)
            setLoading(false);
        })
        return() => {
            unSubscribe();
        }
    },[])



    const authInfo = {
        user,
        loading,
        createUser,
        signInUser, 
        signInGoogle,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;





AuthProvider.propTypes = {
    children: PropTypes.node
}