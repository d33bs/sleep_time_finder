import React, {  Component } from 'react';
import {Menu} from './menu'
import {about_page} from './about'
import {time_page} from './showtime'
import {Switch, Redirect, BrowserRouter as Router, Route} from 'react-router-dom';

//primary app component
class App extends Component {

  
  render() {
    return (
        <div className="app">
            <div className="border">
                <Menu />
                <Switch>
                    <Route exact path="/projects/sleep_time_finder/" component={time_page}/>
                    <Route path="/projects/sleep_time_finder/about" component={about_page}/>
                    <Route name="redirector" path="*" render={() => <Redirect to="/projects/sleep_time_finder/" />} />
                </Switch>
            </div>
        </div>
    );
  }
}

export default App;
