import {createSelector} from 'reselect';

const selectDirectory = state => state.directory;

const selectSections = createSelector(
    [selectDirectory],
    directory => directory.sections
);

export {
    selectSections
};