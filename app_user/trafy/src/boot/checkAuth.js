export default async ({ store, router }) => {
  router.beforeEach((to, from, next) => {
    const auth = window.localStorage.getItem("autenticate");
    let protectedRoute = false;
    if (to.path == "/login" || to.path == "/register" || to.path == "/welcome" || to.path == "/recover-password") {
      protectedRoute = true;
    }
    if (!auth && protectedRoute == false) {
      return next({
        path: "/login"
      });
    }
    if (auth && protectedRoute == true) {
      return next({
        path: "/"
      });
    }
    next();
  });
};
