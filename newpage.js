import fs, { fdatasync } from "fs";
import mkdirp from "mkdirp";
import readline from "readline";

const ifc = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const creatFile = async (path, fileName, content) => {
  let location;
  if (path) {
    await mkdirp(path);
    location = `${path}/${fileName}`;
  } else location = fileName;

  fs.writeFile(location, content, (err) => {
    if (err) throw err;

    console.log(`${location} created!`);
  });
};

const addViteConfig = async (content) => {
  fs.readFile("./vite.config.js", async (err, data) => {
    if (err) throw err;
    let fileContent = data.toString();
    const token = "// DON'T REMOVE THIS COMMENT! IT IS USED BY newpage SCRIPT";

    fileContent = fileContent.replace(
      token,
      `${content}
        ${token}`
    );

    fs.writeFile("vite.config.js", fileContent, (err) => {
      if (err) throw err;
      console.log("vite.config.js updated!");
    });
  });
};

ifc.question("Page Name: ", async (pageName) => {
  const pageHTML = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <link rel="icon" type="icon" href="/fav.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${pageName}</title>
    </head>
    <body class="${pageName}">
      <div x-data="{open: false, showExploreMenu: false }">
        <div class="navbar">
          <a href="/">
            <svg class="brand" width="120" height="17" viewBox="0 0 156 21" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M115.67 17.929c-1.403 0-2.089-.873-2.087-1.777 0-1.183.88-1.775 1.99-1.93l3.781-.54v.685c-.001 2.71-1.858 3.562-3.685 3.562zm.76-12.358c4.344 0 7.108 2.157 7.108 6.395v8.613h-3.996l.016-1.702c-.8 1.202-2.517 2.124-4.642 2.123-3.425-.001-5.511-2.214-5.51-4.612 0-2.741 2.121-4.267 4.796-4.64 0 0 4.393-.52 5.017-.605 0-1.809-1.687-2.219-3.368-2.219-1.722 0-3.091.601-4.15 1.31l-1.567-2.727c1.643-1.162 3.802-1.936 6.296-1.936zm-92.81 1.99c1.09-1.449 2.716-1.962 4.39-1.962 3.475 0 5.954 2.308 5.954 5.702v9.306h-4.122v-8.04c0-2.11-1.105-3.272-2.985-3.272-1.769 0-3.237 1.1-3.237 3.303v8.01h-4.123V0h4.123v7.56zM78.18 11.3v9.306h-4.106v-8.04c0-2.11-1.121-3.272-2.985-3.272-1.769 0-3.238 1.1-3.238 3.303v8.01H63.73v-8.04c0-2.112-1.105-3.273-2.985-3.273-1.768 0-3.237 1.1-3.237 3.303v8.01h-4.122V5.991h4.011V7.71c1.09-1.553 2.764-2.112 4.502-2.112 2.21 0 4.027.95 5.053 2.504 1.185-1.855 3.19-2.504 5.196-2.504 3.6 0 6.033 2.308 6.033 5.702zm18.46 1.99c0 4.39-3.191 7.693-7.408 7.693-2.116 0-3.585-.814-4.58-1.99v1.613h-4.027V.015h4.106v7.5c.995-1.146 2.432-1.916 4.485-1.916 4.233 0 7.423 3.304 7.423 7.693zm-12.028 0c0 2.309 1.596 4.028 3.933 4.028 2.432 0 3.948-1.795 3.948-4.027 0-2.233-1.516-4.027-3.948-4.027-2.337 0-3.933 1.72-3.933 4.027zm54.715-4.931l-2.97 2.368c-.93-.95-1.926-1.463-3.268-1.463-2.132 0-3.838 1.599-3.838 4.027 0 2.443 1.69 4.027 3.822 4.027 1.326 0 2.464-.573 3.332-1.478l2.938 2.398c-1.437 1.765-3.586 2.745-6.143 2.745-4.881 0-8.15-3.258-8.15-7.692 0-4.42 3.269-7.693 8.15-7.693 2.557 0 4.72.996 6.127 2.76zm15.828-2.368l-5.544 5.463L156 20.607h-5.015l-4.264-6.617-1.864 1.84v4.777h-4.122V.015h4.122v11.41l5.338-5.433h4.961zM46.632 19.038C45.542 20.486 43.916 21 42.242 21c-3.475 0-5.954-2.307-5.954-5.701V5.992h4.122v8.039c0 2.111 1.105 3.273 2.985 3.273 1.769 0 3.237-1.101 3.237-3.303V5.99h4.122v14.616h-4.122v-1.569zM97.184 5.992h2.243V1.648h4.107v4.344h4.568v3.5h-4.568v6.183c0 1.023.741 1.644 1.553 1.644.855 0 1.967-.514 1.967-.514l1.328 3.131s-1.411 1.032-4.564 1.032c-2.085 0-4.391-1.507-4.391-4.434V9.49h-2.243v-3.5zm-85.924-.4v9.284c0 1.6-.44 3.173-1.277 4.56l-.926 1.532-.925-1.533a8.815 8.815 0 0 1-1.278-4.56V7.56c1.094-1.453 2.727-1.968 4.406-1.968zM0 3.937V0h18.115v3.937H0z"
              ></path>
            </svg>
          </a>
  
          <nav class="nav-links-desktop">
            <button class="btn-primary">Join as a pro</button>
            <!-- class="active" will style the link in active state -->
            <a
              href="/membership/"
              x-data="{showTooltip: false}"
              x-on:mouseenter="showTooltip = true"
              x-on:mouseleave="showTooltip = false"
            >
              <span> Membership </span>
              <div
                role="tooltip"
                class="tooltip"
                x-show="showTooltip"
                x-on:mouseenter="showTooltip = true"
                x-cloak
              >
                <p>
                  <span>
                    Thumbtack Plus members get exclusive discounts, home expert guidance and more.
                  </span>
                </p>
                <div class="up-arrow"></div>
              </div>
            </a>
            <a href="#" @click="showExploreMenu = !showExploreMenu">Explore</a>
            <a href="/register">Sign up</a>
            <a href="#">Login</a>
          </nav>
  
          <button
            class="nav-toggle"
            type="button"
            aria-label="Open Thumbtack navigation"
            @click="open = !open; $refs.navArrow.style.transform= open ? 'rotate(180deg)' : 'rotate(0deg)'"
          >
            <svg class="fill-primary" width="36" height="36" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0"></path>
              <path
                fill="#FFF"
                d="M8.973 10.385a3.71 3.71 0 0 1-.564 1.957L8 13l-.409-.658a3.704 3.704 0 0 1-.564-1.957v-3.14C7.51 6.62 8.231 6.4 8.973 6.4v3.985zM4 5.69V4h8v1.69H4z"
              ></path>
            </svg>
            <svg
              class="text-black"
              x-ref="navArrow"
              height="18"
              width="18"
              fill="currentColor"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.646 6.764L9 13 3.311 6.725a1 1 0 011.342-1.482L9 10l4.285-4.699c.2-.187.435-.301.715-.301a1 1 0 011 1c0 .306-.151.537-.354.764z"
              ></path>
            </svg>
          </button>
  
          <template x-teleport="#exploreMenuMobile">
            <div class="submenu">
              <div class="col">
                <div>
                  <div class="title">Home</div>
                  <ul>
                    <li>
                      <a href="/k/cheap-moving/near-me/" target="_self">
                        <p>
                          <span>Cheap Movers</span>
                        </p>
                      </a>
                    </li>
                    <li>
                      <a href="/k/house-cleaning/near-me/" target="_self"
                        ><p>
                          <span>House Cleaning Services</span>
                        </p>
                      </a>
                    </li>
                    <li>
                      <a href="/k/electricians/near-me/" target="_self"
                        ><p>
                          <span>Electricians</span>
                        </p>
                      </a>
                    </li>
                    <li>
                      <a href="/k/local-roofers/near-me/" target="_self"
                        ><p>
                          <span>Local Roofers</span>
                        </p>
                      </a>
                    </li>
                    <li>
                      <a href="/k/handyman/near-me/" target="_self"
                        ><p>
                          <span>Handyman Services</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/movers/near-me/" target="_self"
                        ><p>
                          <span>Movers</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/last-minute-movers/near-me/" target="_self"
                        ><p>
                          <span>Last Minute Movers</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/general-contractors/near-me/" target="_self"
                        ><p>
                          <span>General Contractors</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/single-item-movers/near-me/" target="_self"
                        ><p>
                          <span>Single Item Movers</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/home-painters/near-me/" target="_self"
                        ><p>
                          <span>Home Painters</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/affordable-roofers/near-me/" target="_self"
                        ><p>
                          <span>Affordable Roofers</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/interior-painting/near-me/" target="_self"
                        ><p>
                          <span>Interior Painters</span>
                        </p></a
                      >
                    </li>
                  </ul>
                  <a class="seeAllLink" href="/home-remodeling" target="_self">
                    <span>See all</span>
                    <svg
                      class="h2 m_h1 black-300"
                      height="18"
                      width="18"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.764 14.646L16 9 9.725 3.311a1 1 0 00-1.482 1.342L11.75 8H3.002A1 1 0 103 10h8.75l-3.449 3.285c-.187.2-.301.435-.301.715a1 1 0 001 1c.306 0 .537-.151.764-.354z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="col">
                <div>
                  <div class="title">Events and more</div>
                  <ul>
                    <li>
                      <a href="/k/affordable-attorneys/near-me/" target="_self"
                        ><p>
                          <span>Affordable Attorneys</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/personal-trainers/near-me/" target="_self"
                        ><p>
                          <span>Personal Trainers</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/app-developers/near-me/" target="_self"
                        ><p>
                          <span>App Developers</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/freelance-web-designers/near-me/" target="_self"
                        ><p>
                          <span>Freelance Web Designers</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/affordable-photographers/near-me/" target="_self"
                        ><p>
                          <span>Affordable Photographers</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/k/roofing/near-me/" target="_self"
                        ><p>
                          <span>Roofing Contractors</span>
                        </p></a
                      >
                    </li>
                  </ul>
                  <a class="seeAllLink" href="/events" target="_self">
                    <span>See all</span>
                    <svg
                      class="h2 m_h1 black-300"
                      height="18"
                      width="18"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.764 14.646L16 9 9.725 3.311a1 1 0 00-1.482 1.342L11.75 8H3.002A1 1 0 103 10h8.75l-3.449 3.285c-.187.2-.301.435-.301.715a1 1 0 001 1c.306 0 .537-.151.764-.354z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
              <div class="col">
                <div>
                  <div class="title">Other Info</div>
                  <ul>
                    <li>
                      <a href="/home-maintenance" target="_self"
                        ><p>
                          <span>Home Maintenance</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/weddings/" target="_self"
                        ><p>
                          <span>Weddings</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/prices" target="_self"
                        ><p>
                          <span>Cost Guides</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/guides/" target="_self"
                        ><p>
                          <span>Project Guides</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/questions" target="_self"
                        ><p>
                          <span>Questions and Answers</span>
                        </p></a
                      >
                    </li>
                    <li>
                      <a href="/app/" target="_self"
                        ><p>
                          <span>Get the App</span>
                        </p></a
                      >
                    </li>
                  </ul>
                  <a class="seeAllLink" href="/more-services" target="_self">
                    <span>See all</span>
                    <svg
                      class="h2 m_h1 black-300"
                      height="18"
                      width="18"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.764 14.646L16 9 9.725 3.311a1 1 0 00-1.482 1.342L11.75 8H3.002A1 1 0 103 10h8.75l-3.449 3.285c-.187.2-.301.435-.301.715a1 1 0 001 1c.306 0 .537-.151.764-.354z"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </template>
          <template x-teleport="#exploreMenuDesktop">
            <div class="submenu">
              <div class="col">
                <!-- <div> -->
                <div class="title">Home</div>
                <ul>
                  <li>
                    <a href="/k/cheap-moving/near-me/" target="_self">
                      <p>
                        <span>Cheap Movers</span>
                      </p>
                    </a>
                  </li>
                  <li>
                    <a href="/k/house-cleaning/near-me/" target="_self"
                      ><p>
                        <span>House Cleaning Services</span>
                      </p>
                    </a>
                  </li>
                  <li>
                    <a href="/k/electricians/near-me/" target="_self"
                      ><p>
                        <span>Electricians</span>
                      </p>
                    </a>
                  </li>
                  <li>
                    <a href="/k/local-roofers/near-me/" target="_self"
                      ><p>
                        <span>Local Roofers</span>
                      </p>
                    </a>
                  </li>
                  <li>
                    <a href="/k/handyman/near-me/" target="_self"
                      ><p>
                        <span>Handyman Services</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/movers/near-me/" target="_self"
                      ><p>
                        <span>Movers</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/last-minute-movers/near-me/" target="_self"
                      ><p>
                        <span>Last Minute Movers</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/general-contractors/near-me/" target="_self"
                      ><p>
                        <span>General Contractors</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/single-item-movers/near-me/" target="_self"
                      ><p>
                        <span>Single Item Movers</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/home-painters/near-me/" target="_self"
                      ><p>
                        <span>Home Painters</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/affordable-roofers/near-me/" target="_self"
                      ><p>
                        <span>Affordable Roofers</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/interior-painting/near-me/" target="_self"
                      ><p>
                        <span>Interior Painters</span>
                      </p></a
                    >
                  </li>
                </ul>
                <a class="seeAllLink" href="/home-remodeling" target="_self">
                  <span>See all</span>
                  <svg
                    class="h2 m_h1 black-300"
                    height="18"
                    width="18"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.764 14.646L16 9 9.725 3.311a1 1 0 00-1.482 1.342L11.75 8H3.002A1 1 0 103 10h8.75l-3.449 3.285c-.187.2-.301.435-.301.715a1 1 0 001 1c.306 0 .537-.151.764-.354z"
                    ></path>
                  </svg>
                </a>
                <!-- </div> -->
              </div>
              <div class="col">
                <!-- <div> -->
                <div class="title">Events and more</div>
                <ul>
                  <li>
                    <a href="/k/affordable-attorneys/near-me/" target="_self"
                      ><p>
                        <span>Affordable Attorneys</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/personal-trainers/near-me/" target="_self"
                      ><p>
                        <span>Personal Trainers</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/app-developers/near-me/" target="_self"
                      ><p>
                        <span>App Developers</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/freelance-web-designers/near-me/" target="_self"
                      ><p>
                        <span>Freelance Web Designers</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/affordable-photographers/near-me/" target="_self"
                      ><p>
                        <span>Affordable Photographers</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/k/roofing/near-me/" target="_self"
                      ><p>
                        <span>Roofing Contractors</span>
                      </p></a
                    >
                  </li>
                </ul>
                <a class="seeAllLink" href="/events" target="_self">
                  <span>See all</span>
                  <svg
                    class="h2 m_h1 black-300"
                    height="18"
                    width="18"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.764 14.646L16 9 9.725 3.311a1 1 0 00-1.482 1.342L11.75 8H3.002A1 1 0 103 10h8.75l-3.449 3.285c-.187.2-.301.435-.301.715a1 1 0 001 1c.306 0 .537-.151.764-.354z"
                    ></path>
                  </svg>
                </a>
                <!-- </div> -->
              </div>
              <div class="col">
                <!-- <div> -->
                <div class="title">Other Info</div>
                <ul>
                  <li>
                    <a href="/home-maintenance" target="_self"
                      ><p>
                        <span>Home Maintenance</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/weddings/" target="_self"
                      ><p>
                        <span>Weddings</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/prices" target="_self"
                      ><p>
                        <span>Cost Guides</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/guides/" target="_self"
                      ><p>
                        <span>Project Guides</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/questions" target="_self"
                      ><p>
                        <span>Questions and Answers</span>
                      </p></a
                    >
                  </li>
                  <li>
                    <a href="/app/" target="_self"
                      ><p>
                        <span>Get the App</span>
                      </p></a
                    >
                  </li>
                </ul>
                <a class="seeAllLink" href="/more-services" target="_self">
                  <span>See all</span>
                  <svg
                    class="h2 m_h1 black-300"
                    height="18"
                    width="18"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.764 14.646L16 9 9.725 3.311a1 1 0 00-1.482 1.342L11.75 8H3.002A1 1 0 103 10h8.75l-3.449 3.285c-.187.2-.301.435-.301.715a1 1 0 001 1c.306 0 .537-.151.764-.354z"
                    ></path>
                  </svg>
                </a>
                <!-- </div> -->
              </div>
            </div>
          </template>
        </div>
  
        <nav
          class="nav-links-mobile"
          x-show="open"
          x-cloak
          x-transition:enter="transition ease-out duration-200"
          x-transition:enter-start="-translate-y-full"
          x-transition:enter-end="translate-y-0"
          x-transition:leave="transition ease-in duration-200"
          x-transition:leave-start="translate-y-0"
          x-transition:leave-end="-translate-y-full"
        >
          <a href="#">Home</a>
          <div class="flex flex-col">
            <a href="#" @click="showExploreMenu = !showExploreMenu">
              <span class="flex">
                <span> Explore </span>
                <svg
                  :class="showExploreMenu ? 'rotate-90' : ''"
                  height="28"
                  width="28"
                  viewBox="0 0 28 28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.764 21.646L19 14l-8.275-7.689a1 1 0 00-1.482 1.342L16 14l-6.699 6.285c-.187.2-.301.435-.301.715a1 1 0 001 1c.306 0 .537-.151.764-.354z"
                  ></path>
                </svg>
              </span>
            </a>
            <div
              id="exploreMenuMobile"
              x-show="showExploreMenu"
              x-transition:enter="transition ease-out duration-200"
              x-transition:enter-start="-translate-y-full opacity-0"
              x-transition:enter-end="translate-y-0 opacity-100"
              x-transition:leave="transition ease-in duration-200"
              x-transition:leave-start="translate-y-0 opacity-100"
              x-transition:leave-end="-translate-y-full opacity-0"
            ></div>
          </div>
          <a href="#">Join as a pro</a>
          <a href="#">Membership</a>
          <a href="/register">Sign up</a>
          <a href="#">Login</a>
        </nav>
  
        <div
          id="exploreMenuDesktop"
          x-show="showExploreMenu"
          x-cloak
          @click.outside="showExploreMenu = false"
          x-transition:enter="transition ease-out duration-200"
          x-transition:enter-start="-translate-y-full opacity-0"
          x-transition:enter-end="translate-y-0 opacity-100"
          x-transition:leave="transition ease-in duration-200"
          x-transition:leave-start="translate-y-0 opacity-100"
          x-transition:leave-end="-translate-y-full opacity-0"
        ></div>
      </div>
  
  
  
      <footer>
        <div class="mx-5 lg:mx-auto max-w-screen-lg lg:border-t">
          <div class="text-base">
            <div class="py-5 md:py-14">
              <div class="footer-grid">
                <div
                  x-data="{open: window.innerWidth > 640}"
                  x-on:resize.window.debounce="open = window.innerWidth > 640"
                >
                  <div
                    class="section border-t pt-3 sm:border-t-0 sm:pt-0"
                    :class="open ? '!pb-4' : '!pb-0'"
                  >
                    <div class="section-title" @click="open = !open">
                      <div class="b black">
                        <div>Thumbtack</div>
                        <div>Consider it done.</div>
                      </div>
                      <div class="section-arrow flex items-center sm:hidden">
                        <svg
                          :class="open ? 'rotate-180' : ''"
                          height="18"
                          width="18"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.646 6.764L9 13 3.311 6.725a1 1 0 011.342-1.482L9 10l4.285-4.699c.2-.187.435-.301.715-.301a1 1 0 011 1c0 .306-.151.537-.354.764z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <ul class="section-links" x-cloak x-show="open">
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/about"
                          target="_self"
                          >About</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/careers"
                          target="_self"
                          >Careers</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/press/"
                          target="_self"
                          >Press</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="https://blog.thumbtack.com"
                          target="_self"
                          >Blog</a
                        >
                      </li>
                      <li class="flex mt-3">
                        <div class="mr-2">
                          <a
                            class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                            href="https://www.instagram.com/thumbtack/"
                            target="_self"
                            ><svg
                              aria-label="Instagram"
                              height="18"
                              width="18"
                              fill="currentColor"
                              viewBox="0 0 18 18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.908 1A3.096 3.096 0 0117 4.092v9.816a3.095 3.095 0 01-3.092 3.09H4.092A3.094 3.094 0 011 13.909V4.092A3.095 3.095 0 014.092 1h9.816zM5.215 7.549H2.94v5.963c0 .77.654 1.395 1.459 1.395h9.346c.804 0 1.459-.626 1.459-1.395V7.55H12.93c.197.462.308.966.308 1.495 0 2.195-1.868 3.982-4.165 3.982-2.297 0-4.164-1.787-4.164-3.982 0-.53.11-1.033.306-1.495zm3.857-1.226c-.818 0-1.542.405-1.988 1.022a2.435 2.435 0 00-.464 1.43c0 1.353 1.1 2.453 2.452 2.453 1.353 0 2.454-1.1 2.454-2.452 0-.534-.174-1.028-.465-1.43a2.45 2.45 0 00-1.989-1.023zm6.133-3.68l-.32.002-2.133.007.008 2.444 2.445-.008V2.644z"
                              ></path></svg
                          ></a>
                        </div>
                        <div class="mr-2">
                          <a
                            class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                            href="https://www.twitter.com/thumbtack"
                            target="_self"
                            ><svg
                              aria-label="Twitter"
                              height="18"
                              width="18"
                              fill="currentColor"
                              viewBox="0 0 18 18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.02 15.01c6.042 0 9.345-5.007 9.345-9.345 0-.144 0-.287-.007-.423A6.728 6.728 0 0017 3.54a6.666 6.666 0 01-1.887.518 3.283 3.283 0 001.444-1.819 6.652 6.652 0 01-2.084.797 3.285 3.285 0 00-5.592 2.997A9.318 9.318 0 012.11 2.6a3.295 3.295 0 00-.443 1.649 3.27 3.27 0 001.464 2.731 3.226 3.226 0 01-1.485-.409v.041a3.288 3.288 0 002.636 3.222 3.274 3.274 0 01-1.485.055 3.28 3.28 0 003.065 2.281A6.602 6.602 0 011 13.525a9.15 9.15 0 005.02 1.485z"
                              ></path></svg
                          ></a>
                        </div>
                        <div class="mr-2">
                          <a
                            class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                            href="https://www.pinterest.com/thumbtack/"
                            target="_self"
                            ><svg
                              aria-label="Pinterest"
                              height="18"
                              width="18"
                              fill="currentColor"
                              viewBox="0 0 18 18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.568 1C5.202 1 3 4.13 3 6.741c0 1.581.598 2.987 1.882 3.51.21.087.399.004.46-.23.042-.16.143-.567.188-.737.061-.23.037-.31-.133-.512-.37-.436-.607-1.001-.607-1.802 0-2.322 1.738-4.402 4.525-4.402 2.468 0 3.824 1.508 3.824 3.522 0 2.65-1.172 4.887-2.913 4.887-.962 0-1.681-.795-1.45-1.77.275-1.165.81-2.42.81-3.262 0-.752-.404-1.38-1.239-1.38-.983 0-1.772 1.017-1.772 2.38 0 .867.293 1.454.293 1.454l-1.182 5.008c-.351 1.486-.053 3.308-.028 3.491.015.11.155.136.219.054.09-.119 1.261-1.564 1.659-3.008.113-.409.646-2.526.646-2.526.32.61 1.253 1.145 2.245 1.145 2.954 0 4.959-2.693 4.959-6.298C15.386 3.54 13.077 1 9.568 1z"
                              ></path></svg
                          ></a>
                        </div>
                        <div class="mr-2">
                          <a
                            class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                            href="https://www.facebook.com/Thumbtack"
                            target="_self"
                            ><svg
                              aria-label="Facebook"
                              height="18"
                              width="18"
                              fill="currentColor"
                              viewBox="0 0 18 18"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 7h3v3h-3v7H8v-7H5V7h3V5.745c0-1.189.374-2.691 1.118-3.512C9.862 1.41 10.791 1 11.904 1H14v3h-2.1c-.498 0-.9.402-.9.899V7z"
                              ></path></svg
                          ></a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  x-data="{open: window.innerWidth > 640}"
                  x-on:resize.window.debounce="open = window.innerWidth > 640"
                >
                  <div class="section" :class="open ? '!pb-4' : '!pb-0'">
                    <div class="section-title" @click="open = !open">
                      <div class="b black">
                        <div>Customers</div>
                        <div></div>
                      </div>
                      <div class="section-arrow flex items-center sm:hidden">
                        <svg
                          :class="open ? 'rotate-180' : ''"
                          height="18"
                          width="18"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.646 6.764L9 13 3.311 6.725a1 1 0 011.342-1.482L9 10l4.285-4.699c.2-.187.435-.301.715-.301a1 1 0 011 1c0 .306-.151.537-.354.764z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <ul class="section-links" x-cloak x-show="open">
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/how-it-works"
                          target="_self"
                          >How to use Thumbtack</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/register"
                          target="_self"
                          >Sign up</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/app/"
                          target="_self"
                          >Get the app</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/near-me/"
                          target="_self"
                          >Services near me</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/prices"
                          target="_self"
                          >Cost estimates</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/how-to/"
                          target="_self"
                          >Project how to’s</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/guides/"
                          target="_self"
                          >Project guides</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/survey"
                          target="_self"
                          >Small business survey</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/questions"
                          target="_self"
                          >Questions and answers</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
  
                <div
                  x-data="{open: window.innerWidth > 640}"
                  x-on:resize.window.debounce="open = window.innerWidth > 640"
                >
                  <div class="section" :class="open ? '!pb-4' : '!pb-0'">
                    <div class="section-title" @click="open = !open">
                      <div class="b black">
                        <div>Pros</div>
                        <div></div>
                      </div>
                      <div class="section-arrow flex items-center sm:hidden">
                        <svg
                          :class="open ? 'rotate-180' : ''"
                          height="18"
                          width="18"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.646 6.764L9 13 3.311 6.725a1 1 0 011.342-1.482L9 10l4.285-4.699c.2-.187.435-.301.715-.301a1 1 0 011 1c0 .306-.151.537-.354.764z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <ul class="section-links" x-cloak x-show="open">
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="https://help.thumbtack.com/article/how-thumbtack-works/"
                          target="_self"
                          >Thumbtack for pros</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/pro"
                          target="_self"
                          >Sign up as a pro</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="https://community.thumbtack.com/"
                          target="_self"
                          >Community</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="https://help.thumbtack.com/resources/getsetup"
                          target="_self"
                          >Pro Resources</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="https://www.thumbtack.com/pro-center/stories/"
                          target="_self"
                          >Success stories</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/reviews/"
                          target="_self"
                          >Pro reviews</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/pro-app"
                          target="_self"
                          >iPhone app for pros</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/pro-app"
                          target="_self"
                          >Android app for pros</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  x-data="{open: window.innerWidth > 640}"
                  x-on:resize.window.debounce="open = window.innerWidth > 640"
                >
                  <div class="section" :class="open ? '!pb-4' : '!pb-0'">
                    <div class="section-title" @click="open = !open">
                      <div class="b black">
                        <div>Support</div>
                        <div></div>
                      </div>
                      <div class="section-arrow flex items-center sm:hidden">
                        <svg
                          :class="open ? 'rotate-180' : ''"
                          height="18"
                          width="18"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.646 6.764L9 13 3.311 6.725a1 1 0 011.342-1.482L9 10l4.285-4.699c.2-.187.435-.301.715-.301a1 1 0 011 1c0 .306-.151.537-.354.764z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <ul class="section-links" x-cloak x-show="open">
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="https://help.thumbtack.com"
                          target="_self"
                          >Help</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/safety/"
                          target="_self"
                          >Safety</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/covid-information"
                          target="_self"
                          >COVID-19 Info</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/terms/"
                          target="_self"
                          >Terms of Use</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/privacy/"
                          target="_self"
                          >Privacy Policy</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/privacy/#supplemental-privacy-notice-for-california-residents"
                          target="_self"
                          >CA Privacy Notice</a
                        >
                      </li>
                      <li>
                        <a
                          class="_230fLSlginFVu7q_SLOkRk _1Ct9lnM0pDObZs3Jh7I-Dx"
                          href="/syndication-opt-out"
                          target="_self"
                          >Do Not Sell My Info</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row justify-between py-3 md:border-t">

              <a href="/" class="flex items-center mb-2 sm:mb-0">
                <div class="text-gray-300 mr-2 flex">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <g fill-rule="evenodd">
                      <path
                        d="M11.971 0C5.36 0 0 5.36 0 11.97c0 6.612 5.36 11.972 11.971 11.972 6.612 0 11.972-5.36 11.972-11.972C23.943 5.36 18.583 0 11.97 0"
                      ></path>
                      <path
                        fill="#FFF"
                        d="M13.394 16.412a6.173 6.173 0 0 1-.825 3.083l-.598 1.037-.597-1.037a6.173 6.173 0 0 1-.825-3.083v-4.947c.706-.982 1.76-1.33 2.845-1.33v6.277zM6.122 9.015V6.353H17.82v2.662H6.12z"
                      ></path>
                    </g>
                  </svg>
                </div>
                <div class="font-mark text-sm">© 2022 Thumbtack, Inc.</div></a
              >
              <a href="/guarantee/" class="flex items-center gap-1">
                <div class="guarantee-logo">
                  <svg alt="" width="19" height="24" viewBox="0 0 19 24" fill="none">
                    <path
                      d="M18.436 3.115L9.8.046a.987.987 0 0 0-.595 0L.567 3.115A.863.863 0 0 0 0 3.909v9.769c0 2.288 1.332 4.174 3.068 5.783 1.737 1.607 3.922 3.003 5.928 4.388a.912.912 0 0 0 1.007 0c2.01-1.385 4.194-2.78 5.93-4.388C17.67 17.854 19 15.966 19 13.678V3.909a.854.854 0 0 0-.564-.794zM10.65 14.577c0 .846-.23 1.677-.665 2.41l-.483.81-.482-.81a4.714 4.714 0 0 1-.665-2.41v-3.868c.569-.767 1.419-1.04 2.295-1.04v4.908zm3.568-5.783H4.784V6.712h9.434v2.082z"
                      fill="#009fd9"
                    ></path>
                  </svg>
                </div>
                <div>
                  <span class="font-mark-bold text-sm text-gray-500">Thumbtack Guarantee</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
  
      <script defer type="module" src="./script.js"></script>
    </body>
  </html>
  `;
  const scriptJS = `import "@styles/component/${pageName}/${pageName}.scss";
  import Alpine from "alpinejs";

  window.Alpine = Alpine;

  Alpine.start();
`;
  const sassContent = `@import "@styles/baseConfig";

  // $navBarExpandAt: "screens.lg";
  
  @import "@styles/baseStyles";
  @import "@component/navbar";
  @import "@component/tooltip";
  @import "@component/footer";
  
  .${pageName} {}`;

  creatFile(pageName, "index.html", pageHTML);
  creatFile(pageName, "script.js", scriptJS);
  creatFile(`styles/component/${pageName}`, `${pageName}.scss`, sassContent);
  addViteConfig(`${pageName}: resolve(__DIR__, "${pageName}/index.html"),`);
  ifc.close();
});
