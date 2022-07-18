import "@splidejs/splide/css";
import Splide from "@splidejs/splide";

new Splide("#exploreMoreProjects", {
  arrows: true,
  perPage: 3,
  gap: 16,
  classes: {
    page: "hidden",
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
