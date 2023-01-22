import * as React from "react"
import type { HeadFC } from "gatsby"
import 'react-slideshow-image/dist/styles.css'
import './styles.css'
import { Slideshow, SlideShowPage } from "./Slideshow";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Form } from "./Form";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<Form />} />
        <Route path="/" element={<SlideShowPage />} />
      </Routes>
    </BrowserRouter>
  )

}


export default App

export const Head: HeadFC = () => <title>Home Page</title>
