import ReactDOM from 'react-dom/client'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import App from '@/app/app.tsx'
import { APP_BASE_PATH } from '@/constants'

const history = createBrowserHistory({ basename: APP_BASE_PATH })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router history={history}>
    <App />
  </Router>,
)
