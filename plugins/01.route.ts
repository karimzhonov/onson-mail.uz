import loader from "~/store/loader";

export default defineNuxtPlugin(() => {
  const router = useRouter()
  router.beforeEach((to, from) => {
    if (to.path !== from.path) {
      loader().loading = true
      loader().currentPhase = 'initial'
    }
  });
  router.afterEach(() => {
    setTimeout(() => {
      loader().currentPhase = 'logo-fade' // fade out logo
    }, 1500)
  
    setTimeout(() => {
      loader().currentPhase = 'background-fade' // fade out background
    }, 2000)
  
    setTimeout(() => {
      loader().loading = false // полностью убрать
    }, 3000)
  });
});
