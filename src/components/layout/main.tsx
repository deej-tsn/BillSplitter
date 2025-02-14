import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import store from '../../store/store.ts'
import StageController from '../setup/stageController.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <StageController/>
    </Provider>
  </StrictMode>,
)
