import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import InputKehadiran from "./pages/input_hadir";
import LoginPage from "./pages/login_page";

const Routing = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/input-kehadiran" component={InputKehadiran} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routing;