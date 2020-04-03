import News from "./news";

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
