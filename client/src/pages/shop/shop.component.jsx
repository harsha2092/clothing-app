import React, { useEffect } from 'react';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {Route} from 'react-router-dom';
import { fetchCollectionStartAsync } from '../../redux/shop/shop.action';
import {connect} from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {selectIsCollectionLoaded} from '../../redux/shop/shop.selector';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = (props) => {
    
    useEffect(() => {
        props.fetchCollectionStartAsync();
    }, [props.fetchCollectionStartAsync])

    const {match, isCollectionloaded} = props;
 
    return (
        <div className="shop-page">
            <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={!isCollectionloaded} {...props}/>} />
            <Route exact path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionloaded} {...props}/>} />
        </div>
    );
}


const mapDispatchToProps = (dispatch) => ({
    fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())  
});

const mapStateToProps = state => ({
    isCollectionloaded: selectIsCollectionLoaded(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);