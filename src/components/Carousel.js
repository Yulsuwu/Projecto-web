import {Pagination, Autoplay, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import  "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const Carousel = () => {
    return (

        <Swiper modules = {[Navigation,Pagination,Autoplay]} spaceBetween={0} slidesPerView={1} navigation
                pagination={{clickable: true}}
                autoplay = {{delay: 5000}}
                style={{ width: "100vw", height: "100vh", position: "relative" }}>

            <SwiperSlide>
                <img src="diapositiva1.jpg" alt="Slide 1" className="Slide"/>
            </SwiperSlide>

            <SwiperSlide>
                <img src="diapositiva2.jpg" alt="Slide 2" className="Slide"/>
            </SwiperSlide>

            <SwiperSlide>
                <img src="diapositiva3.png" alt="Slide 3" className="Slide"/>
            </SwiperSlide>

        </Swiper>



    )};

export default Carousel;
