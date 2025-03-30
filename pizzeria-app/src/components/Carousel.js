import {Pagination, Autoplay, Navigation} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import  "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const Carousel = () => {
    return (

        <Swiper modules = {[Navigation,Pagination,Autoplay]} spaceBetween={50} slidesPerView={1} navigation
                pagination={{clickable: true}}
                autoplay = {{delay: 3000}}>

            <SwiperSlide>
                <img src="diapositiva1.jpg" alt="Slide 1" className="Slide"/>
            </SwiperSlide>

            <SwiperSlide>
                <img src="diapositiva2.jpeg" alt="Slide 2" className="Slide"/>
            </SwiperSlide>

            <SwiperSlide>
                <img src="diapositiva3.png" alt="Slide 3" className="Slide"/>
            </SwiperSlide>

        </Swiper>



    )};

export default Carousel;
