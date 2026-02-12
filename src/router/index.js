import { createRouter, createWebHistory } from "vue-router";
import ListPage from "@/pages/ListPage.vue";
import DetailPage from "@/pages/DetailPage.vue";
import WritePage from "@/pages/WritePage.vue";
import EditPage from "@/pages/EditPage.vue";
import DeletePage from "@/pages/DeletePage.vue";
import AuthPage from "@/pages/AuthPage.vue";

const routes = [
  { path: "/", name: "list", component: ListPage },
  { path: "/write", name: "write", component: WritePage },
  { path: "/auth", name: "auth", component: AuthPage },
  { path: "/edit/:id(\\d+)", name: "edit", component: EditPage, props: true },
  { path: "/delete/:id(\\d+)", name: "delete", component: DeletePage, props: true },
  { path: "/:id(\\d+)", name: "detail", component: DetailPage, props: true }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
