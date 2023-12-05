import HomePage from "./COMPONENTS/homePage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowTeam from "./COMPONENTS/showTeam.jsx";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="showTeam" element={<ShowTeam />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;