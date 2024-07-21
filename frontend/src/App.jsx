import ParentRouter from "./components/parentrouter";
import "materialize-css/dist/css/materialize.min.css";
import "material-icons/css/material-icons.min.css";
import { DataProvider } from "./context_offline/offline_context";

const App = () => {
  return (
    <>
      {/* for importing parentRouter component below */}
      <DataProvider>
        <ParentRouter />
      </DataProvider>
    </>
  );
};

export default App;
