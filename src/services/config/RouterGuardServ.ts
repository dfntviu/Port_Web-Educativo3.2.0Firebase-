import {PermissionsService} from '@/services/PermissionsServ.ts';
import type {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
  import {useAuthStore} from '/stores/AuthStore.ts';

    class RouterGuardService {
    	 private permissionsService: PermissionsService;

    	 constructor(role: Role){
    	 	 this.permissionsService = new PermissionsService(role);
    	 }

    	 globalGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext){
    	 	 const auth_store = useAuthStore();


    	 	 if (auth_store.IsLoading) {
    	 	 	  await auth_store.checkAuthState();
    	 	 }

    	 	 if (to.meta.requieresAuth && !auth_store.isAuthenticated) { //not 
    	 	 	 return next( {name: Home});
    	 	 }

    	 	 if (to.meta.requieresAuth && !== to.meta.role) { //not identic
    	 	 	 return next( {name: 'PageError403'});
    	 	 	 // traerla de la version creada con vue
    	 	 }

    	 	 // De lo contrario, sino no es error de pagina, ni usuario registrado, ni atutentific cargada. Entonces

    	 	 // Se actualiza el rol para permiso actualizado
    	 	 	this.permissionsService.setRole(auth_store.role);

    	 	 if (to.meta.permission &&  !this.permissionsService.hasPermission(to.meta.permission)) { //not identic
    	 	 	 return next( {name: 'PageError403'});
    	 	 }

    	 	 next();

    	 }
    }

		    // ./router/index.ts
	/*import { createRouter, createWebHistory } from 'vue-router';
	import { RouterGuardService } from '@/services/RouterGuardService';

	const routes = [
	  // tus rutas
	];

	const router = createRouter({
	  history: createWebHistory(),
	  routes,
	});

	const guardService = new RouterGuardService('default'); // inicializa con role por defecto

	router.beforeEach((to, from, next) => guardService.globalGuard(to, from, next));

	export default router;
		*/