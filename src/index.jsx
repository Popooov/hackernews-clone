import { useState, lazy, Suspense, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Nav from './components/Nav'
import Loading from './components/Loading'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
                <Routes>
                  <Route exact path='/' element={<TopStories />} />
                  <Route exact path='/new' element={<NewStories />} />
                  <Route exact path='/user' element={<UserInfo />} />
                  <Route exact path='/story' element={<StoryInfo />} />
                  <Route render={() => <h1>404</h1>} />
                </Routes>
              </Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
}
  
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)