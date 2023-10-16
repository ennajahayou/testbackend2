import React from 'react';
import './CEOProfil.css';
import Sidebar from '../Components/Sidebar';

const tasksInProgress = [
    'Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X Développer la fonctionnalité X DéveDévelopper la fonctionnalité X ',
    'Tester le composant Y',
    // ... ajoutez d'autres tâches ici
];

const finishedTasks = [
    'Créer la maquette de la page d’accueil',
    'Implémenter le routage',
    // ... ajoutez d'autres tâches terminées ici
];

const CEOProfil = () => {
    return (
        <div className="container">
            <Sidebar />
            
            <div className="ceo-profile">          
                <h1>CEO Profil</h1>

                <div className="tasks-container">
                    <div className="tasks in-progress">
                        <h2>In Progress</h2>
                        {tasksInProgress.map((task, index) => (
                            <div className="task" key={index}>
                                {task}
                                <div className="buttons-container">
                                    <button className="accept-button">Accepter</button>
                                    <button className="refuse-button">Refuser</button>
                                    <button className="action-button">Accepter une action</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="tasks finished">
                        <h2 className="fini">Finished</h2>
                        {finishedTasks.map((task, index) => (
                            <div className="task" key={index}>
                                {task}
                                <div className="buttons-container">
                                    <button className="accept-button">Accepter</button>
                                    <button className="refuse-button">Refuser</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CEOProfil;
