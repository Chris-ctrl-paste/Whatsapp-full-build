import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Chat from './components/Chat';
import Login from './components/Login';
import Sidebar from './components/Sidebar'
import './css/App.css';
import { useStateValue } from './StateProvider';
import * as firebase from 'firebase';

function App() {
  const [{ user },] = useStateValue();

  // const user = firebase.auth().currentUser;


  // firebase.auth().onAuthStateChanged(function (user) {
  //   if (!user) {
  //     return (
  //       <Login />
  //     )
  //   } else {
  //     return (

  //       <div className="app_body">
  //         <Router>
  //           <Sidebar />
  //           <Switch>
  //             <Route path="/rooms/:roomId" >
  //               <Chat />
  //             </Route>
  //             <Route path="/">
  //               <Chat />
  //             </Route>
  //           </Switch>
  //         </Router>

  //       </div>
  //     )
  //   }
  // });


  return (
    <div className="app">



      {!user ? (

        <Login />

      ) : (


          <div className="app_body">
            <Router>
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId" >
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
            </Router>

          </div>
        )}
    </div>
  );
}

export default App;
