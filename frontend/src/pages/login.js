import React, { Component } from "react";
import "./login.css";
import Sidebar from "../Components/Sidebar";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handlEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  handleLogin = () => {
    const { email, password } = this.state;

    // Envoyer les informations d'identification au backend
    fetch(process.env.REACT_APP_BACKEND_URL + "/login/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          // La connexion est réussie, rediriger l'utilisateur
          response.json().then((data) => {
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", data.userName);
            localStorage.setItem("isCEO", data.isCEO);
          });

          console.log(localStorage.getItem("isCEO"));

          window.location.href = "/";
        } else {
          // Afficher un message d'erreur
          alert("Identifiant ou mot de passe incorrect.");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion :", error);
      });
  };
  render() {
    return (
      <div className="App">
        <Sidebar />
        <div className="login-container">
          <h2>Connexion</h2>
          <form>
            <div className="form-group">
              <label>Email :</label>
              <input
                type="email"
                value={this.state.email}
                onChange={this.handlEmailChange}
              />
            </div>
            <div className="form-group">
              <label>Mot de passe :</label>
              <input
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <button type="button" onClick={this.handleLogin}>
              Se connecter
            </button>
          </form>
          <p>
            Si vous n'avez pas encore de compte, veuillez{" "}
            <a href="./signup">créer un compte</a>.
          </p>
        </div>
      </div>
    );
  }
}

export default LoginPage;
