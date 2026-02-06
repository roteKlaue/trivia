import { Route, Routes } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Finish from "./components/Finish";
import Layout from "./components/Layout";
import Game from "./components/Game";

const App = () => {
    return (<>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/trivia" element={<MainMenu />} />
                <Route path="/trivia/game" element={<Game />} />
                <Route path="/trivia/finish" element={<Finish />} />
            </Route>
        </Routes>
    </>);
}

export default App;
