import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListConsultant from './components/ListConsultant';
import AddConsultant from './components/AddConsultant';
import UpdateConsultant from './components/UpdateConsultant';
import ViewConsultant from './components/ViewConsultant';

function App() {
  return (
    <Router>
    <div className="container">
        <div>
          <Switch>
            <Route path="/" exact component={ListConsultant} />
            <Route path="/consultants"  component={ListConsultant} />
            <Route path="/addconsultant"  component={AddConsultant} />
            <Route path="/update-consultant/:ohr"  component={UpdateConsultant} />
            <Route path="/view-consultant/:ohr"  component={ViewConsultant} />
          </Switch>
        </div>
        </div>
        </Router>
  );
}

export default App;
