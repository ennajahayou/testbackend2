const ExecutionDone = ({ execution }) => {
  return (
    <div className="execution" key={execution.id}>
      <div>
        <b>{execution.exec_description}</b>
      </div>
      <div>Execution Done</div>
      <div>Thanks : {execution.score_thanks}</div>
      <div>(Ajouter le score (thanks, tips...))</div>
    </div>
  );
};

export default ExecutionDone;
