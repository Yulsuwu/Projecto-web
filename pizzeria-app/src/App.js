import './App.css';
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import {BrowserRouter as Router, Route, Routes} from "react-router";
import PokemonDetail from "./components/PokemonDetail";
import Nosotros from "./components/Nosotros";

const data = {
    count: 3,
    items: [
        {
            id: 1,
            name: "Pizzas",
            description: "Deliciosa pizza de pepperoni con queso derretido.",
            sprites: { front_default: "/pizza.png" },
        },
        {
            id: 2,
            name: "Bebidas",
            description: "Refresco de cola clásico y refrescante.",
            sprites: { front_default: "/bebida.png" },
        },
        {
            id: 3,
            name: "Complementos",
            description: "Crujientes papas fritas con sal y especias.",
            sprites: { front_default: "/nachos.png" },
        },
    ],
};


function App() {
    
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element = {<Home />} />
                    <Route path="/Nosotros" element = {<Nosotros />} />
                    <Route path="/Productos" element = {<About />} />
                    <Route path="/pokemon/:id" element={<PokemonDetail data={data} />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;