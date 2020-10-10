import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import '@atlaskit/css-reset';
import './styles.css';

import Column from './column';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Org.Internacionais' },
    'task-2': { id: 'task-2', content: 'Ind.Farm.LTDA' },
    'task-3': { id: 'task-3', content: 'Musc.Sound Live Cmp' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Cliente em Potencial',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Dados Confirmados',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Reunião Agendada',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

class LeadsComponent extends React.Component {
  state = initialData;


  onDragEnd = result => {

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId);


      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };
      this.setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    if (newStart.id == "column-1" && newFinish.id == "column-3") {
      return;
    } else if (newStart.id == "column-2" && newFinish.id == "column-1") {
      return;
    } else if (newStart.id == "column-3" && newFinish.id == "column-2") {
      return;
    } else if (newStart.id == "column-3" && newFinish.id == "column-1") {
      return;
    } else {
      this.setState(newState);
    }
  };

  render() {
    return (
      <>
        <div className="container d-flex justify-content-center">
          <div className="div-lead">
            <h1 className="title-lead">Painel de Leads</h1>
            <button type="button" class="btn button-lead" data-toggle="modal" data-target="#staticBackdrop">
              Nova Lead (+)
            </button>
            <DragDropContext onDragEnd={this.onDragEnd} >
              <Container>
                {
                  this.state.columnOrder.map(columnId => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                    return <Column key={column.id} column={column} tasks={tasks} />;
                  })
                }
              </Container>
            </DragDropContext>
            <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Nova Lead</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <input type="text" id="content" className="teste" />
                      <input type="submit" value="Submit" />
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LeadsComponent;

