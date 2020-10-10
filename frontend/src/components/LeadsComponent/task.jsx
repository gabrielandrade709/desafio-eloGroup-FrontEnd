import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 20px;
  padding: 8px;
  color: ${props => (props.isDragging ? '#14222B' : 'white')};
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'white' : '#14222B')};
  @media screen and (max-width: 280px) {
    font-size: 7px;
  }
  @media screen and (min-width: 320px) and (max-width: 375px) {
    font-size: 8px;
  }
`;


export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}