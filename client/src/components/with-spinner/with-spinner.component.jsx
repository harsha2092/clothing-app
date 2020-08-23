import React from 'react';
 import Spinner from '../spinner/spinner.component';

const WithSpinner = (WrappedComponent) => {
    const SpinnerComponent = ({isLoading, ...otherProps}) => {
        return isLoading ? <Spinner/> : <WrappedComponent {...otherProps}/>
    };
    
    return SpinnerComponent;
}

export default WithSpinner;