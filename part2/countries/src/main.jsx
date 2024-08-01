import ReactDOM from 'react-dom/client'

import App from './App'

const appStyle = {
    backgroundColor: 'coral'
}

ReactDOM.createRoot(document.getElementById('root')).render(<App style={appStyle} />)