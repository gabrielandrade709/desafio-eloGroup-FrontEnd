import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import InputMask from 'react-input-mask';

import '@atlaskit/css-reset';
import './styles.css';

import Column from './column';
import CheckBox from '../CheckBoxLeads/index';

import Logo from '../../assets/FormRegister/logo.jpg';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Org. Internacionais' },
    'task-2': { id: 'task-2', content: 'Ind. Farm. LTDA' },
    'task-3': { id: 'task-3', content: 'Musc. Sound Live Cmp' },
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
    if (newStart.id == 'column-1' && newFinish.id == 'column-3') {
      return;
    } else if (newStart.id == 'column-2' && newFinish.id == 'column-1') {
      return;
    } else if (newStart.id == 'column-3' && newFinish.id == 'column-2') {
      return;
    } else if (newStart.id == 'column-3' && newFinish.id == 'column-1') {
      return;
    } else {
      this.setState(newState);
    }
  };

  render() {

    var form = document.getElementById('sectionForm');

    function valthis() {
      const form = document.querySelector('#sectionForm');
      const checkboxes = form.querySelectorAll('input[type=checkbox]');
      const checkboxLength = checkboxes.length;
      const firstCheckbox = checkboxLength > 0 ? checkboxes[0] : null;

      function init() {
        if (firstCheckbox) {
          for (let i = 0; i < checkboxLength; i++) {
            checkboxes[i].addEventListener('change', checkValidity);
          }

          checkValidity();
        }
      }

      function isChecked() {
        for (let i = 0; i < checkboxLength; i++) {
          if (checkboxes[i].checked) return true;
        }

        return false;
      }

      function checkValidity() {
        const errorMessage = !isChecked() ? 'Selecione ao menos uma oportunidade!' : '';
        firstCheckbox.setCustomValidity(errorMessage);
      }

      init();
    }
    return (
      <>
        <div className="container d-flex justify-content-center">
          <div className="div-lead">
            <h1 className="title-lead">Painel de Leads</h1>
            <button type="button" class="btn button-lead" data-toggle="modal" data-target="#staticBackdrop">
              Novo Lead (+)
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
                    <div className="logo-modal-leads-div">
                      <img src={Logo} alt="Logo modal" className="logo-modal-leads" />
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <h5 class="modal-title" id="staticBackdropLabel">Novo Lead</h5>
                  <div class="modal-body">
                    <form id="sectionForm" className="row form-leads" >
                      <div className="col-lg-6 col-md-6 col-sm-12 input-leads-div ">
                        <label className="label-leads" htmlFor="nome">Nome *</label>
                        {/* <div className="div-form-error">
                  <span className="form-error">{this.state.errors["user"]}</span>
                </div> */}
                        <input className="input-leads" type="text" name="nome" placeholder="informe o seu nome" required />

                        <label className="label-leads" htmlFor="telefone">Telefone *</label>
                        {/* <div className="div-form-error">
                  <span className="form-error">{this.state.errors["password"]}</span>
                </div> */}
                        <InputMask mask="(99) 9999-9999" className="input-leads" name="telefone" placeholder="informe o seu telefone" required />

                        <label className="label-leads" htmlFor="email" >Email *</label>
                        {/* <div className="div-form-error">
                  <span className="form-error">{this.state.errors["confirmPassword"]}</span>
                </div> */}
                        <input className="input-leads" type="email" name="email" placeholder="informe o seu email" required />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 checkbox-leads-div">
                        <h3 className="title-checkbox">Oportunidades *</h3>
                        <CheckBox />
                        <br></br>
                        <button className="save-lead" onClick={valthis} >Salvar</button>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn close-modal" data-dismiss="modal">Fechar</button>
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

