import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

function CollectionPreview({title, items}) {
    return (
        <div className="collection-preview">
            <div className="title"> {title.toUpperCase()} </div>
            <div className="preview">
                {items.filter((item, index) => index < 4 )
                .map( ({id, name, price, imageUrl}) => (
                <CollectionItem 
                    key={id}
                    name={name}
                    price={price}
                    imageUrl={imageUrl}
                />
                ) )}
            </div>
        </div>
    );
}

export default CollectionPreview;