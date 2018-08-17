import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import styles from '../../../styles/custom/Login/login-container.sass';
import { signIn } from '../../actions/index';

class LoginContainer extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      fields: {
        email: '',
        password: '',
      },
    };
  }

  onFormSubmit(evt) {
    evt.preventDefault();

    const { email, password } = this.state.fields;
    this.props.signIn(email, password);
  }

  onInputChange(evt) {
    const { fields } = this.state;
    fields[evt.target.name] = evt.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <section styleName="hero is-fullheight">
        <div styleName="hero-body">
          <div styleName="container has-text-centered">
            <div styleName="column is-4 is-offset-4">
              <h3 styleName="title has-text-grey">Login</h3>
              <p id="subtitle-login" styleName="subtitle has-text-grey">Easy Class - Área Adminisrativa</p>

              <div styleName="box">
                <figure styleName="avatar">
                  <img alt="avatar" src="https://placehold.it/128x128" />
                </figure>

                <form onSubmit={this.onFormSubmit}>
                  <div styleName="field">
                    <div styleName="control">
                      <input
                        styleName="input is-large"
                        type="email"
                        placeholder="Seu Email"
                        autoFocus=""
                        name="email"
                        value={this.state.fields.email}
                        onChange={this.onInputChange}
                      />
                    </div>
                  </div>

                  <div styleName="field">
                    <div styleName="control">
                      <input
                        styleName="input is-large"
                        type="password"
                        placeholder="Sua Senha"
                        name="password"
                        value={this.state.fields.password}
                        onChange={this.onInputChange}
                      />
                    </div>
                  </div>

                  <button styleName="button is-block is-info is-large is-fullwidth">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

LoginContainer.propTypes = {
  signIn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ signIn }, dispatch);
const mapStateToProps = ({ staffData }) => ({ staffList: staffData.staff });

export const styledComponent = CSSModules(LoginContainer, styles, { allowMultiple: true });
export default connect(mapStateToProps, mapDispatchToProps)(styledComponent);
