import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";  
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import "antd/dist/antd.css";
import "./styles/tailwind.css";
import "./styles/custom.css";
import { ToastContainer } from "react-toastify";

const persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Router>
			<Provider store={store}>
				<PersistGate loading={ <div>Loading...</div> } persistor={ persistor }>
					<ToastContainer />
					<App />
				</PersistGate>
			</Provider>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
