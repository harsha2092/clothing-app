import React from 'react';
import CollectionPreview from '../collection-preview/collection-preview.component';
import {connect} from 'react-redux';
import {selectCollectionsForPreview} from '../../redux/shop/shop.selector';

function CollectionOverview({collections}) {
    return (
        <div>
            { collections.map( (collection => (
                    <CollectionPreview 
                        key={collection.id} 
                        title={collection.title}
                        items={collection.items}/>
                    ) ) ) }
        </div>
    );
}

const mapStateToProps = (state) => ({
    collections: selectCollectionsForPreview(state)
})

export default connect(mapStateToProps)(CollectionOverview);