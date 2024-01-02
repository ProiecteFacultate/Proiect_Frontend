import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './router.tsx';
import { RouterProvider } from "react-router-dom";
import { legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducersList from './store/reducers/reducer.ts';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducersList);
const store = createStore(persistedReducer);
const persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
