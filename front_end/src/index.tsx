import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './router.tsx';
import { RouterProvider } from "react-router-dom";
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
// import reducersList from './store/reducers/reducer.ts';
// import sagasList from './store/sagas/saga.ts';

// const sagaMiddleware = createSagaMiddleware();
// export const store = createStore(reducersList, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run(sagasList);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
