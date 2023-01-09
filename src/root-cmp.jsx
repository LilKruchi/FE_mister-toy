import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import './assets/style/main.css'
import { store } from './store/store.js'
import { AppHeader } from './cmps/app-header.jsx'
import { ToyIndex } from './pages/toy-index.jsx'
import { ToyDetails } from './cmps/toy-details'
import { ToyEdit } from './cmps/toy-edit'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <AppHeader />
                <section className='main-layout app'>
                    <Routes>
                        <Route path="/toy" element={<ToyIndex />} />
                        <Route path="/toy/:toyId" element={<ToyDetails />} />
                        <Route path="/toy/edit" element={<ToyEdit />} />
                        <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                    </Routes>
                </section>
            </Router>
        </Provider>
    )
}