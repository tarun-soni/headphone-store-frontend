import React from 'react'
import { render } from 'react-dom'
import App from './App'
import './bootstrap.min.css'
import './base.scss'
import { RecoilRoot } from 'recoil'

render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
