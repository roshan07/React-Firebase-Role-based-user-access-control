import React, { Component } from 'react';
import fire from '../config/fire';
import firebase from 'firebase';

export default class Login extends Component {

    login = () => {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        fire.auth().signInWithEmailAndPassword(email, password)
            .then((u) => {
                console.log('Successfully Logged In');
            })
            .catch((err) => {
                console.log('Error: ' + err.toString());
            })
    }

    signUp = () => {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then((u) => {
                //saving email and userId of authenticated users in real-time db
                var pushKey = firebase.database().ref().child("users").push().key;
                console.log(pushKey);
                firebase.database().ref('users/ ' + pushKey).set({
                    userID: u.user.uid,
                    userEmail: u.user.email,
                    userRole: "admin"
                });
                console.log('Successfully Signed Up');
                /* firebase.database().ref().child("users").push().set({
                    userID: u.user.uid,
                    userEmail: u.user.email,
                    userRole: "admin"
                }); */
                //console.log();
            })
            .catch((err) => {
                console.log('Error: ' + err.toString());
            })
    }

    render() {
        return (
            <div className="loginPage">
                <h2>Firebase Role Based Access Control</h2>
                <hr />
                <div>
                    <span>Email: </span>
                    <input type="email" placeholder="Enter Email" id="email" />
                </div>
                <br></br>
                <div>
                    <span>Password: </span>
                    <input type="password" placeholder="Enter Password" id="password" />
                </div>
                <button onClick={this.login} style={{ margin: '15px' }}>Login</button>
                <button onClick={this.signUp} style={{ margin: '15px' }}>Sign Up</button>
            </div>
        )
    }
}
