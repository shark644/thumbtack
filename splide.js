import "@splidejs/splide/css";
import Splide from "@splidejs/splide";

const defaultOptions = {
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
};

new Splide("#exploreMoreProjects", defaultOptions).mount();
new Splide("#costGuidesSlider", defaultOptions).mount();
new Splide("#servicesSuggestionsSlider", defaultOptions).mount();
new Splide("#servicesQuestionsSlider", defaultOptions).mount();
