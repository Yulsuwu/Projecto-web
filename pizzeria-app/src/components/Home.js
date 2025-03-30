import Carousel from './Carousel';

const Home = () => {
    return (

        <div style={{ position: "absolute", top: 0, left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: -1
        }}>
            <Carousel />
        </div>

    )
};


export default Home;
