import React, { useState } from 'react';
import "../../assets/css/kanban.css";


{/* NÃO INVENTA BACKEND PRA ESTA MERDA*/}
{/* Essas constantes tem que ver onde vai colocar, provavelmente num arquvio a parte*/}
const COLUMNS = {
    A_FAZER: "A fazer",
    EM_PROGRESSO:"Em progresso",
    CONCLUIDO:"Concluído"
}

{/*evidencia que esse id em string, é devido a possivel necessidade de usar guid ou outro tipo de hash para task*/}
{/*(explicação) Se tu criar essas como int no banco, vc vai ter que mudar o numero de inteiro jajaj, imagina o trello colocando id int.*/}
const INITIAL_STATE = [
  { id: "ID_1", title: 'Tarefa 1', status: COLUMNS.A_FAZER },
  { id: "ID_2", title: 'Tarefa 2', status: COLUMNS.A_FAZER },
  { id: "ID_3", title: 'Tarefa 3', status: COLUMNS.EM_PROGRESSO },
  { id: "ID_4", title: 'Tarefa 4', status: COLUMNS.CONCLUIDO }
];


{/*Acho que tem que ter 3 componente, KanbanBoard, Column e Task*/}
{/*Cada um com seu CSS e arquivo proprio.*/}
const KanbanBoard = () => {
  const [tasks, setTasks] = useState(INITIAL_STATE);

  // Manipula o evento de início do arrasto
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('taskId', id);
  };

  // Manipula o evento de soltar a tarefa em uma coluna
  const handleDrop = (e, status) => {
    const id = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map(task => {
      if (task.id === (id)) {
        // Atualiza o status da tarefa
        task.status = status;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Permite a soltura da tarefa nas colunas
  const allowDrop = e => {
    e.preventDefault();
  };


  {/*Se a task tem que virar um compoennte a parte e so envocado aqui.*/}
  {/*Se pá até a coluna vira um componente, só nao complica mt por favor.*/}
  return (
    <div className="kanban-board">
    {/*eSSA PARADA AQYUE */}
      {/* Tem que explicar oque esse ObjectValues faz com o enum*/}
      {Object.values(COLUMNS).map(enum_column=>(<div className="column">
        <h2>{enum_column}</h2>
        <div
          className="task-list"
          onDrop={e => handleDrop(e, enum_column)}
          onDragOver={allowDrop}
        >
          {/* Renderiza as task, cada item desse map é uma task */}
          {tasks
            .filter(task => task.status === enum_column)
            .map(task => (
              <div 
                key={task.id}
                className="task"
                draggable
                onDragStart={e => handleDragStart(e, task.id)}
              >
                {task.title}
              </div>
            ))}
        </div>
      </div>))}
    </div>
  );
};

export default KanbanBoard;
