import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue";
import Verify from "../views/Verify.vue";
import Vote from "../views/Vote.vue";
import PostVote from "../views/PostVote.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/verify",
    name: "Verification",
    component: Verify,
    beforeEnter: (to, from, next) => {
      from.name == "Home" ? next() : next("/");
    }
  },
  {
    path: "/vote",
    name: "Vote",
    component: Vote,
    beforeEnter: (to, from, next) => {
      from.name == "Verification" ? next() : next("/");
    }
  },
  {
    path: "/result",
    name: "PostVote",
    component: PostVote,
    beforeEnter: (to, from, next) => {
      from.name == "Vote" ? next() : next("/");
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
