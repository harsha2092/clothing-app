import React from 'react';
import './collection-item.styles.scss';
import {connect} from 'react-redux';
import { addItem } from '../../redux/cart/cart.action';
import {
    CustomButtonContainer,
    CollectionItemContainer,
    ImageContainer,
    CollectionFooter,
    NameContainer,
    PriceContainer
} from  './collection-item.styles';

function CollectionItem({item, addItem}) {
    const {imageUrl, price, name} = item;

    return (
        <CollectionItemContainer>
            <ImageContainer
                imageUrl={imageUrl}
            />
            <CollectionFooter>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>{price}</PriceContainer>
            </CollectionFooter>
            <CustomButtonContainer 
                inverted
                onClick={() => addItem(item)}
            >
                Add to Cart
            </CustomButtonContainer>
        </CollectionItemContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null, mapDispatchToProps)(CollectionItem);