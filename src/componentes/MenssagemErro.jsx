import React from 'react';

function MenssagemErro({ message }) {
    return (
        <div className="error-message">
            <p>{message}</p>
        </div>
    );
}

export default MenssagemErro;
