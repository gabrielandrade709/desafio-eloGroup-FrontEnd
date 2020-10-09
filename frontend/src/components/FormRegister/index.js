import React from 'react';
import { withRouter } from 'react-router-dom'
import './styles.css'

import Logo from '../../assets/FormRegister/logo.jpg'


class FormRegister extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {}
    }
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["user"]) {
      formIsValid = false;
      errors["user"] = "Informe o usuário!";
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Informe a senha!";
    }
    let number = /\d+/g;
    let specialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let alphanumeric = /[A-Za-z0-9]+$/;
    if (typeof fields["password"] !== "undefined") {
      if (fields["password"].length < 8) {
        formIsValid = false;
        errors["password"] = "Password deve possuir ao menos 8 caracteres!";
      }
      if (!specialCharacter.test(fields["password"])) {
        formIsValid = false;
        errors["password"] = "Password deve conter ao menos 1 caracter especial!";
      }

      if (!alphanumeric.test(fields["password"])) {
        formIsValid = false;
        errors["password"] = "Password deve conter ao menos 1 caracter alfanumérico!";
      }
    }
    if (typeof fields["password"] !== "undefined") {
      if (!number.test(fields["password"])) {
        formIsValid = false;
        errors["password"] = "Password deve conter ao menos 1 caracter numérico!";
      }
    }

    if (!fields["confirmPassword"]) {
      formIsValid = false;
      errors["confirmPassword"] = "Confirme a senha!"
    }

    if (typeof fields["confirmPassword"] !== "undefined") {
      if (fields["password"] !== fields["confirmPassword"]) {
        formIsValid = false;
        errors["confirmPassword"] = "As senhas não são iguais!";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  registerSubmit(e) {
    const { history } = this.props;
    e.preventDefault();

    if (this.handleValidation()) {
      history.push("/leads")
    }

  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  render() {

    return (
      <>
        <div className="container center-screen">
          <div className="main-form center-form">
            <div className="div-logo">
              <img src={Logo} alt="Logo" className="logo" />
            </div>
            <div className="div-form">
              <form id="form1" onSubmit={this.registerSubmit.bind(this)}>
                <label htmlFor="user">Usuário *</label>
                <div className="div-form-error">
                  <span className="form-error">{this.state.errors["user"]}</span>
                </div>
                <input type="text" name="user" onChange={this.handleChange.bind(this, "user")} value={this.state.fields["user"]} />

                <label htmlFor="password">Password *</label>
                <div className="div-form-error">
                  <span className="form-error">{this.state.errors["password"]}</span>
                </div>
                <input type="password" name="password" placeholder="*******" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} />

                <label htmlFor="confirmPassword" >Confirmação Password *</label>
                <div className="div-form-error">
                  <span className="form-error">{this.state.errors["confirmPassword"]}</span>
                </div>
                <input type="password" name="confirmPassword" placeholder="*******" onChange={this.handleChange.bind(this, "confirmPassword")} value={this.state.fields["confirmPassword"]} />

                <button type="submit" form="form1" value="Submit" className="register">
                  Registrar
              </button>

              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(FormRegister);