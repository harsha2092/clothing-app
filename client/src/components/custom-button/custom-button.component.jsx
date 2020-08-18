import React from 'react';
import CustomButtonContainer from './custom-button.styles';
import './custom-button.styles.scss';

function CustomButton({children,...otherProps}) {
    return (
        <CustomButtonContainer {...otherProps}>
            {children}
        </CustomButtonContainer>
    );
}

export default CustomButton;