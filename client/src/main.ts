import { mountApp } from "./modules/app/appPage";

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("#app not found");

mountApp(app);
