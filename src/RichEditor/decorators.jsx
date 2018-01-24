import React from 'react';

const Image = (props) => {
    const {
        height,
        src,
        width,
    } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <img src={src} height={height} width={width}/>
    );
};
function findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'IMAGE'
            );
        },
        callback
    );
}

const decorators = [
    {
        strategy: findImageEntities,
        component: Image,
    },
];

export default decorators;