import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { UseChatProvider } from './utils/useChat'
import './App.css'

import Home from './components/Home'
import Chat from './components/Chat'

const App = () => {
  return (
    <div className="main-container">
      <Router>
	      <UseChatProvider>
	        <Route path="/" exact component={Home} />
	        <Route path="/chat" component={Chat} />
        </UseChatProvider>
      </Router>
    </div>
  );
}

export default App;
