import { useState, lazy, Suspense, StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Nav from './components/Nav'
import Loading from './components/Loading'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme'
const TopStories = lazy(() => import('./components/TopStories'))
const NewStories = lazy(() => import('./components/NewStories'))
const UserInfo = lazy(() => import('./components/UserInfo'))
const StoryInfo = lazy(() => import('./components/StoryInfo'))

function App() {

    const [ theme, setTheme ] = useState('light')
    const toggleTheme = () => setTheme((t) => t === 'light' ? 'dark' : 'light')

    return (
      <Router>
        <ThemeProvider value={theme}>
          <div className={theme}>
            <div className={`container container-${theme}`}>
              <Nav toggleTheme={toggleTheme} />

              <Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path='/' component={TopStories} />
                  <Route exact path='/new' component={NewStories} />
                  <Route exact path='/user' component={UserInfo} />
                  <Route exact path='/story' component={StoryInfo} />
                  <Route render={() => <h1>404</h1>} />
                </Switch>
              </Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
}
  

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
   document.getElementById('root')
)