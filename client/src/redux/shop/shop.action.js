import shopActionTypes from './shop.types';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

const fetchCollectionStart = () => ({
    type: shopActionTypes.FETCH_COLLECTION_START
});

const fetchCollectionSuccess = collectionMap => ({
    type: shopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload: collectionMap
});

const fetchCollectionFailure = errroMessage => ({
    type: shopActionTypes.FETCH_COLLECTION_FAILURE,
    payload: errroMessage
});


export const fetchCollectionStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        
        dispatch(fetchCollectionStart());
        
        collectionRef
        .get()
        .then(snapshot => {
               const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
               dispatch(fetchCollectionSuccess(collectionsMap));
            }
        ).catch(error => 
            dispatch(fetchCollectionFailure(error))
        );    
    }
};