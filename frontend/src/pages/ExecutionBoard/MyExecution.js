import React from 'react';

const MyExecution = ({ handleDropClick }) => {
    return (
        <div className="my-execution">
            <button onClick={handleDropClick}>Drop</button>
        </div>
    );
}

export default MyExecution;
