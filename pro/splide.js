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
      pagination: true,
      padding: {
        right: 0,
      },
    },
  },
};

new Splide("#prosReviewSlider", defaultOptions).mount();
new Splide("#getMoreJobsSlider", {
  arrows: true,
  perPage: 3,
  perMove: 3,
  gap: 16,
  classes: {
    prev: "splide__arrow--prev splide-prev-btn",
    next: "splide__arrow--next splide-next-btn",

    // Add classes for pagination.
    pagination: "splide__pagination", // container
    page: "splide__pagination__page hidden", // each button
  },
  breakpoints: {
    1024: {
      perPage: 2,
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
}).mount();
