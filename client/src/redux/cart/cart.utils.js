export const addToCartItems = (existingCartItems, cartItemToAdd) => {
    if(getExistingCartItem(existingCartItems, cartItemToAdd)) {

        return existingCartItems.map(
            (item) => {
                return item.id === cartItemToAdd.id ? 
                    {...item, quantity: item.quantity+1}
                :
                    item;
            }
        );
    }

    return [...existingCartItems, {...cartItemToAdd, quantity: 1}];
}

export const removeCartItem = (existingCartItems, cartItemToRemove) => {
    const existingCartItem = getExistingCartItem(existingCartItems, cartItemToRemove) 

    if(existingCartItem && existingCartItem.quantity > 1){
        return existingCartItems.map(
            (item) => {
                return item.id === cartItemToRemove.id ? 
                    {...item, quantity: item.quantity-1}
                :
                    item;
            }
        );
    }

    return existingCartItems.filter(
        (item) => item.id !== cartItemToRemove.id
    );
}

const getExistingCartItem= (existingCartItems, cartItemToAdd) => {
    const existingCartItem = existingCartItems.find(
        item => item.id === cartItemToAdd.id 
    );

    return existingCartItem;
}