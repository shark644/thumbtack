import "@splidejs/splide/css";
import Splide from "@splidejs/splide";

const defaultOptions = {
  arrows: true,
  perPage: 1,
  perMove: 1,
  gap: 0,
  width: "100%",
  classes: {
    prev: "splide__arrow--prev splide-prev-btn",
    next: "splide__arrow--next splide-next-btn",

    // Add classes for pagination.
    pagination: "splide__pagination", // container
    page: "splide__pagination__page", // each button
  },
  breakpoints: {
    1024: {
      perPage: 1,
    },
    640: {
      perPage: 1,
      arrows: false,
      drag: "free",
      pagination: false,
      padding: {
        right: 80,
      },
    },
  },
};

new Splide("#prosReviewSlider", defaultOptions).mount();
