import 'react-slideshow-image/dist/styles.css'
import { SlideShowPage } from "./pages/Slideshow";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { UploadPage } from "./pages/Upload";
import './App.css';
import { Album } from './pages/Album';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/album" element={<Album />} />
          <Route path="*" element={<SlideShowPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
