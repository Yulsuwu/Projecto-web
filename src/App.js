import './App.css';
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import {BrowserRouter as Router, Route, Routes} from "react-router";
import Nosotros from "./components/Nosotros";
import UserCard from "./components/UserCard";
import PizzaDetails from "./components/PizzaDetails";
import BebidaDetails from "./components/BebidaDetails";
import ComplementoDetails from "./components/ComplementoDetails";
import PizzaPersonalizadaDetails from "./components/PizzaPersonalizadaDetails";
import { useState, useEffect } from 'react';

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
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);

    // Recuperar el usuario del localStorage al cargar la aplicación
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleAddToCart = (item) => {
        setCartItems(prevItems => {
            // Verificar si el item ya existe en el carrito
            const existingItemIndex = prevItems.findIndex(
                i => i.tipo === item.tipo && 
                     i.id_producto === item.id_producto && 
                     (item.tipo === 'pizza' ? i.tamaño === item.tamaño : true)
            );

            if (existingItemIndex >= 0) {
                // Si el item existe, incrementar la cantidad
                const newItems = [...prevItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    cantidad: newItems[existingItemIndex].cantidad + item.cantidad
                };
                return newItems;
            } else {
                // Si el item no existe, añadirlo al carrito
                return [...prevItems, item];
            }
        });
    };

    const handleUpdateCart = (newItems) => {
        setCartItems(newItems);
    };

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setCartItems([]); // Limpiar el carrito al cerrar sesión
    };

    return (
        <Router>
            <Layout 
                cartItems={cartItems} 
                onUpdateCart={handleUpdateCart}
                user={user}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Nosotros" element={<Nosotros />} />
                    <Route path="/Productos" element={<About />} />
                    <Route 
                        path="/usuario" 
                        element={
                            <UserCard 
                                onLogin={handleLogin}
                                user={user}
                                onLogout={handleLogout}
                            />
                        } 
                    />
                    <Route 
                        path="/pizzas" 
                        element={<PizzaDetails onAddToCart={handleAddToCart} />} 
                    />
                    <Route 
                        path="/bebidas" 
                        element={<BebidaDetails onAddToCart={handleAddToCart} />} 
                    />
                    <Route 
                        path="/complementos" 
                        element={<ComplementoDetails onAddToCart={handleAddToCart} />} 
                    />
                    <Route 
                        path="/pizza-personalizada" 
                        element={<PizzaPersonalizadaDetails onAddToCart={handleAddToCart} />} 
                    />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;