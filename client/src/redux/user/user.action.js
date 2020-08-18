import {UserActionTypes} from './user.types';
import {clearAllItemsFromCart} from '../cart/cart.action';
import {
    auth, 
    googleProvider,
    createUserProfileDocument,
    getAuthenticatedUserAsync
} from '../../firebase/firebase.utils';

const signUpStart = () => ({
    type: UserActionTypes.SIGN_UP_START
});

const signInStart = () => ({
    type: UserActionTypes.SIGN_IN_START
});

const signInSuccess = (user) => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});


const signInFailure = (error) => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS,
});


const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION 
});

export const signUpAsync = ({email, password, displayName}) => {
    return async dispatch => {
        dispatch(signUpStart());
        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            const userSnapshot = await getUserSnapshotFromUserAuth(user, {displayName});
            dispatch(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
        } catch(error){
            dispatch(signInFailure());
        }
    }
}

export const signInWithGoogleAsync = () => {
    return async dispatch => {
        dispatch(signInStart());
        try{
            const {user} = await auth.signInWithPopup(googleProvider);
            const userSnapshot = await getUserSnapshotFromUserAuth(user);
            dispatch(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
        }
        catch(error){   
            dispatch(signInFailure(error));
        } 
    };
};

export const signInWithEmailAsync = ({email, password}) => {
    return async dispatch => {
        dispatch(signInStart());
        try{
            const {user} = await auth.signInWithEmailAndPassword(email, password);;
            const userSnapshot = await getUserSnapshotFromUserAuth(user);
            dispatch(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
        }
        catch(error){   
            dispatch(signInFailure(error));
        } 
    };
};

export const isUserAuthenticatedAsync = () => {
    return async dispatch => {
        dispatch(checkUserSession());
        try{
            const userAuth = await getAuthenticatedUserAsync();
            if(!userAuth) return;
            const userSnapshot = await getUserSnapshotFromUserAuth(userAuth);
            dispatch(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
        } catch(error) {
            dispatch(signInFailure(error));
        }
    };
}

export const signOutAsync = () => {
    return async dispatch => {
        dispatch(signOutStart());
        try{
            await auth.signOut();
            dispatch(signOutSuccess());
            dispatch(clearAllItemsFromCart());
        }catch(error){
            dispatch(signOutFailure(error));
        }
    };
} 

const getUserSnapshotFromUserAuth = async (user, additionalData={}) => {
    console.log(user);
    const userRef = await createUserProfileDocument(user, additionalData);
    const userSnapshot = await userRef.get();
    return userSnapshot;
}