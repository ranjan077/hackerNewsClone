import News from "./pages/NewsPage";

const routes = [
  {
    path: "/",
    exact: true,
    component: News
  },
  {
    path: "/news",
    component: News
  }
];

export default routes;
