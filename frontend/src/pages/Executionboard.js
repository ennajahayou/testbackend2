import React, { useState } from 'react';
import './Executionboard.css';
import Sidebar from '../Components/Sidebar';

const Myexecution = [
    'Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X ',
    'Tester le composant Y',
    // ... ajoutez d'autres tâches ici
];

const DIOexecution = [
    'Créer la maquette de la page d’accueil',
    'Implémenter le routage',
    // ... ajoutez d'autres tâches terminées ici
];

const ExecutionBoard = () => {



    const [droppedTaskIndex, setDroppedTaskIndex] = useState(null);
    const [showEvaluation, setShowEvaluation] = useState(false); // Nouvel état

    const handleDropClick = (index) => {
        setDroppedTaskIndex(index);
    };

    const [currentQuestion, setCurrentQuestion] = useState(-1);

    const handleThanksClick = () => {
        setCurrentQuestion(0);
        setShowEvaluation(true);
    };


    return (
        <div className="container">
            <Sidebar />
            {showEvaluation ? (
    <div className="evaluation-container">
        {currentQuestion === 0 ? (
            <>
                <h2>How difficult was it?</h2>
                <button className="evaluation-button" onClick={() => setCurrentQuestion(1)}>Easy</button>
                <button className="evaluation-button" onClick={() => setCurrentQuestion(1)}>Challenging</button>
                <button className="evaluation-button" onClick={() => setCurrentQuestion(1)}>Hard</button>
                <button className="evaluation-button" onClick={() => setCurrentQuestion(1)}>Very hard</button>
            </>
        ) : currentQuestion === 1 ? (
            <>
                <h2>How reactive were you?</h2>
                <button className="evaluation-button" onClick={() => setCurrentQuestion(2)}>Cool</button>
                <button className="evaluation-button" onClick={() => setCurrentQuestion(2)}>On the Spot</button>
                <button className="evaluation-button" onClick={() => setCurrentQuestion(2)}>Over Expectation</button>
                <button className="evaluation-button" onClick={() => setCurrentQuestion(2)}>Prodigious</button>
            </>
        ) : (
            <>
                <h1>CONGRATULATION!</h1>
                <p>You will see your thanks in</p>
                <p>23:59:47</p>
            </>
        )}
    </div>
        ) : (
            <div className="execution-board">
                <h1>Execution Board</h1>
                <div className="execution-container">
                        <div className="executions my">
                            <h2>My Execution</h2>
                            {Myexecution.map((task, index) => (
                                <div className="execution" key={index}>
                                    {task}
                                    <div className="buttons-container">
                                        <button className="accept-button" onClick={() => handleDropClick(index)}>Drop</button>
                                        {droppedTaskIndex === index && <button className="thanks-button" onClick={handleThanksClick}>Get Your Thanks</button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="executions DIO">
                            <h2 className="fini">DIO Execution</h2>
                            {DIOexecution.map((task, index) => (
                                <div className="execution" key={index}>
                                    {task}
                                    <div className="buttons-container">
                                        <button className="accept-button">See</button>
                                        {droppedTaskIndex === index && <button className="thanks-button" onClick={handleThanksClick}>Peer review</button>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                
            </div>
            )}
        </div>
    );
};

export default ExecutionBoard;