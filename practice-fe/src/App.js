import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routing/AppRouter";
import Auth from "./auth";

function App() {
  return (
      <BrowserRouter>
          <Auth>
              <AppRouter/>
          </Auth>
      </BrowserRouter>
  );
}

export default App;
