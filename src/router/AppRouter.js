import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { ConfigScreen } from '../components/ConfigScreen';
import { FinishScreen } from '../components/FinishScreen';
import { GameScreen } from '../components/GameScreen';
import { HistoryScreen } from '../components/HistoryScreen';
import { StartScreen } from '../components/StartScreen';
import { Navbar } from '../components/ui/Navbar';


export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <div>
                <Switch>
                    <Route exact path="/start" component={ StartScreen } />
                    <Route exact path="/game" component={ GameScreen } />
                    <Route exact path="/history" component={ HistoryScreen } />
                    <Route exact path="/config" component={ ConfigScreen } />
                    <Route exact path="/finish" component={ FinishScreen } />
                    <Redirect to="/start" />
                </Switch>
            </div>
        </Router>
    )
}
