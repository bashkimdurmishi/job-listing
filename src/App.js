import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider, connect } from "react-redux";
import { loadJobs } from "./redux/jobs/actions";
import { loadUser } from "./redux/user/actions";
import store from "./store/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Component Import
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Dashboard from "./component/Dashboard/Dashboard";
import JobDetails from "./component/JobDetails/JobDetails";
import ProfileUser from "./component/ProfileUser/ProfileUser";
import { useEffect } from "react";
import AppliersDetails from "./component/AppliersDetails/AppliersDetails";

function App(props) {
  useEffect(() => {
    props.loadUser();
    props.loadJobs();
  }, []);

  return (
    <Provider store={store}>
      {/*<Navbar />*/}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/jobs/:jobId">
            <JobDetails />
          </Route>
          <Route exact path="/profile">
            <ProfileUser />
          </Route>
          <Route exact path="/jobPosts/:jobId">
            <AppliersDetails />
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer autoClose={2000} />
    </Provider>
  );
}

const mapDispatchToProps = {
  loadUser,
  loadJobs,
};

const mapStateToProps = (state) => ({
  jobs: state.jobs.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
