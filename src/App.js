import Router from "./route/Index";

import { Toaster } from "react-hot-toast";
import ThemeProvider from "./layout/provider/Theme";
import { Provider } from "react-redux";
import store from "./app/store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
};
export default App;
