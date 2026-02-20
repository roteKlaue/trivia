import { Route, Routes } from "react-router-dom";
import MainMenu from "./components/main/MainMenu";
import Credits from "./components/credits/Credits";
import Finish from "./components/end/Finish";
import Layout from "./components/layout/Layout";
import Game from "./components/game/Game";

const App = () => {
    return (<>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/trivia" element={<MainMenu />} />
                <Route path="/trivia/game" element={<Game />} />
                <Route path="/trivia/finish" element={<Finish />} />
                <Route path="/trivia/credits" element={<Credits />} />
            </Route>
        </Routes>
    </>);
}

export default App;
