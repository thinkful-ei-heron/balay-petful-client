import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Header from './Header';
import Dogs from './Dogs';
import Cats from './Cats';
import Success from './Success';

export default class App extends Component {
    


    render() {
        return (
            <div className="App">
                <header className="App_header">
                    <Header />
                </header>
                <main className="App_main">
                    <Switch>
                        <Route
                          exact
                          path={'/'}
                          component={HomePage}
                        />
                        <Route 
                          path={'/dogs'}
                          component={Dogs}
                        />
                        <Route 
                          path={'/cats'}
                          component={Cats}
                        />
                        <Route 
                          path={'/success_stories'}
                          component={Success}
                        />
                    </Switch>
                </main>

            </div>
        )
    }
}