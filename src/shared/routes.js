import News from "./pages";

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
