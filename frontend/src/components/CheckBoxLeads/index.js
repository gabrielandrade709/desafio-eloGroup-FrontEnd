import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allChecked: false,
      list: [
        { id: 1, name: "RPA", isChecked: false },
        { id: 2, name: "Produto Digital", isChecked: false },
        { id: 3, name: "Analystics", isChecked: false },
        { id: 4, name: "BPM", isChecked: false },
      ],
    };
  }

  handleChange = (e) => {
    let list = this.state.list;
    let allChecked = this.state.allChecked;
    if (e.target.value === "checkAll") {
      list.forEach(item => {
        item.isChecked = e.target.checked;
        allChecked = e.target.checked;
      });
    }
    else {
      list.find(item => item.name === e.target.name).isChecked = e.target.checked;
    }
    this.setState({ list: list, allChecked: allChecked });
  }

  renderList = () => {
    return this.state.list.map(item =>
      <div>
        <input className="style-checkbox-leads" key={item.id} type="checkbox" name={item.name} value={item.name} checked={item.isChecked} onChange={this.handleChange} />
        <label className="style-label-checkbox-leads">{item.name}</label>
      </div>
    )
  }
  render() {
    return (
      <div>
        <input className="style-checkbox-leads"
          type="checkbox"
          value="checkAll"
          checked={this.state.allChecked}
          onChange={this.handleChange} />
        <label className="style-label-checkbox-leads" htmlFor="">Marcar/Desmarcar todos</label>
        <br />
        {this.renderList()}
      </div>
    );
  }
}