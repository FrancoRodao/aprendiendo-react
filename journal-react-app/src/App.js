import AppRouter from "./routers/AppRouter";
// eslint-disable-next-line
import styles from "./styles/styles.scss";

import { Provider } from "react-redux";
import { store } from "./redux/store/store";

if(process.env.NODE_ENV === 'production'){
  //cancel console logs
  window.console.log = () => {}
}

function App() {

  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
}

export default App;
