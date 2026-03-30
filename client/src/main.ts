import { mountHomePage } from "./modules/home/homePage";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("#app not found");

mountHomePage(app);
