import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import 'normalize.css'
import "cropperjs/dist/cropper.css";
import 'styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
        <App/>
)

// reportWebVitals();
