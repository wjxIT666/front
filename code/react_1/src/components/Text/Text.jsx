import React from 'react';

export default function Text (props) {
    let { textContent } = props;
    return (
        <div>
            { textContent }
        </div>
    );
};