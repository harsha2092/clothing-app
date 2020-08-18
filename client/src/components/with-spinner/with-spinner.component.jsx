import React from 'react';
 
import {SpinnerOverlay, SpinnerContainer} from './with-spinner.styles';

const WithSpinner = (WrappedComponent) => {
    const SpinnerComponent = ({isLoading, ...otherProps}) => {
        return isLoading ? (
         <SpinnerOverlay>
             <SpinnerContainer/>
         </SpinnerOverlay>   
        ) :
        (<WrappedComponent {...otherProps}/>)
    };
    
    return SpinnerComponent;
}

export default WithSpinner;