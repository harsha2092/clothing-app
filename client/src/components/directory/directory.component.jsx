import React, { Component } from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';
import {connect} from 'react-redux';
import {selectSections} from '../../redux/directory/directory.selector';
const Directory = ({sections}) =>  {
    return (
            <div className="directory-menu">
                {sections.map(({title, id, imageUrl, size, linkUrl}) => 
                (
                <MenuItem 
                    key={id} 
                    title={title} 
                    imageUrl={imageUrl}
                    size={size}
                    linkUrl={linkUrl}/>
                ))
                }
            </div>
    );
}

const mapStateToProps = state => ({
  sections: selectSections(state)
})

export default connect(mapStateToProps)(Directory);