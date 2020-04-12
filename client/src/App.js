// @ts-check

import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import store from './store'
import {Provider} from 'react-redux'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Home from './layouts/Home'
import Login from './layouts/Login'
import Admin from './layouts/dataTable'
import Score from './layouts/score'
import Map from './layouts/Map'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import SubmitStatus from './layouts/SubmitStatus'
import Form from './layouts/Form'

import './App.scss'

import es from './i18n/es.json'

import { getScore } from './actions'

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    defaultNS: 'translation',
    fallbackNS: 'translation',
    resources: {
      es,
    },
    fallbackLng: 'es',
    debug: process.env.NODE_ENV !== 'production',
    interpolation: {
      escapeValue: false
    }
  })

function App() {
  const [form, setForm] = useState({ progress: 0 })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [form.progress])
  store.dispatch(getScore());
  return (
    <div className="App">
      <Provider store = {store}>
      <BrowserRouter>
        <ScrollToTop formReset={setForm}>
          <NavigationBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/score" exact component={Score} />
            <Route path="/report" exact>
              <Protected level={0} current={form.progress}>
                <Form form={form} setFormState={setForm} />
              </Protected>
              <Protected level={1} current={form.progress}>
                <Map form={form} setFormState={setForm} />
              </Protected>
              <Protected level={2} current={form.progress}>
                <SubmitStatus form={form} setFormState={setForm} />
              </Protected>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
      </Provider>
    </div>
  )
}

/** @type {React.FC<{ formReset(param: { progress: 0 }): void }>} */
const ScrollToTop = ({ children, formReset }) => {
  const history = useHistory()
  useEffect(() => {
    const unlisten = history.listen(() => {
      formReset({ progress: 0 })
      window.scrollTo(0, 0)
    })
    return () => unlisten()
  }, [history, formReset])

  return <>{children}</>
}

export default App

/** @type {React.FC<{ level: number; current: number }>} */
const Protected = ({ level, current, children }) => (
  <>{level === current ? children : ''}</>
)
