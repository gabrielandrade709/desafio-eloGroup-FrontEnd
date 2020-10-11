import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

import '@atlaskit/css-reset';
import './styles.css';

import Column from './column';
import CheckBox from '../CheckBoxLeads/index';

import Logo from '../../assets/FormRegister/logo.jpg';

const initialData = {
  count: 0,
  newTask: '',
  tasks: {},
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Cliente em Potencial',
      taskIds: [],
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

  inputChangeHandler = ({ target: { value } }) =>
    this.setState({
      newTask: value,
    });

  submitHandler = e => {
    e.preventDefault();
    this.setState(prevState => {
      const newCount = prevState.count + 1;
      const newId = `task-${newCount}`;
      return {
        count: newCount,
        newTask: '',
        tasks: {
          ...prevState.tasks,
          [newId]: { id: newId, content: prevState.newTask },
        },
        columns: {
          ...prevState.columns,
          'column-1': {
            ...prevState.columns['column-1'],
            taskIds: [...prevState.columns['column-1'].taskIds, newId],
          },
        },
      };
    });
    var frm = document.getElementsByName('form1')[0];
    frm.reset();
    alert("Lead incluído com sucesso!");

  };

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
            <div className="row">
              <div className="col-12">
                <h1 className="title-lead">Painel de Leads</h1>
                <button type="button" className="btn button-lead" data-toggle="modal" data-target="#staticBackdrop">
                  Novo Lead (+)
                </button>
              </div>
              <div className="col-12">
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
              </div>
            </div>
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="logo-modal-leads-div">
                      <img src={Logo} alt="Logo modal" className="logo-modal-leads" />
                    </div>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <h5 className="modal-title" id="staticBackdropLabel">Novo Lead</h5>
                  <div className="modal-body">
                    <form id="sectionForm" className="row form-leads" name="form1" onSubmit={this.submitHandler}>
                      <div className="col-lg-6 col-md-6 col-sm-12 input-leads-div ">
                        <label className="label-leads" htmlFor="nome">Nome *</label>
                        <input id="content" className="input-leads" type="text" name="nome" placeholder="informe o seu nome"
                          value={this.state.newTask}
                          onChange={this.inputChangeHandler}
                          required
                        />

                        <label className="label-leads" htmlFor="telefone">Telefone *</label>
                        <input className="input-leads" type="number" name="telefone" 
                          placeholder="Informe o seu telefone" 
                          required 
                        />

                        <label className="label-leads" htmlFor="email" >Email *</label>
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
                  <div className="modal-footer">
                    <button type="button" className="btn close-modal" data-dismiss="modal">Fechar</button>
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

