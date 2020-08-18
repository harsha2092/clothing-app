import {createSelector} from 'reselect';

const selectShop = state => state.shop;

const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => collections[collectionUrlParam]
    );

const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
);

const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections 
);

export {
    selectCollection,
    selectCollectionsForPreview,
    selectIsCollectionLoaded
};