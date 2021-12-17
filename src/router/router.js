const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "Home" */ "@/view/Home.vue"),
  },
  {
    path: "/search/:name",
    name: "search",
    params: {},
    component: () =>
      import(/* webpackChunkName: "SearchItem" */ "@/view/SearchItem.vue"),
  },
];

export default routes;
