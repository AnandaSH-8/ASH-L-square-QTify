import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./Carousel.module.css";

export default function Carousel({ data, renderItem }) {
  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerView={7}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>{renderItem(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
