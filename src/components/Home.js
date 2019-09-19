import React from 'react';
import fire from '../config/fire';
import Admin from './Admin';
import NormalUser from './NormalUser';
import firebase from 'firebase';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userRole: null
        }
    }

    logout() {
        fire.auth().signOut();
    }

    componentDidMount() {
        this.checkRole();
    }

    checkRole = () => {
        //gets the uid of currently logged in user
        var Id = firebase.auth().currentUser.uid;
        firebase.database().ref().child("users").orderByChild("userID").equalTo(Id).once("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                var childData = childSnapshot.val();
                console.log(childData.userRole);
                console.log(childData.userEmail);
                this.setState({
                    userRole: childData.userRole
                });
            });
        });
    }

    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: '70px' }}>
                <h1>You Are Logged In</h1>
                <br></br>
                <h1>Your email address: {this.props.emailId}</h1>
                <br></br>
                <h1>You role is: {this.state.userRole}</h1>
                {this.state.userRole === "admin" ? (<Admin />) : (<NormalUser />)}
                <button onClick={this.logout} className="logoutBtn">Logout</button>
            </div>
        )
    }
}

export default Home;