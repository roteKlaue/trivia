import { Navigate, Route, Routes } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Finish from "./components/Finish";
import Layout from "./components/Layout";
import Game from "./components/Game";

const App = () => {
    return (<>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<MainMenu />} />
                <Route path="/game" element={<Game />} />
                <Route path="/finish" element={<Finish />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>);
}

export default App;
