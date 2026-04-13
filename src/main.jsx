import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CursorPixel from './components/CursorPixel/CursorPixel'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CursorPixel />
    <App />
  </>,
)
