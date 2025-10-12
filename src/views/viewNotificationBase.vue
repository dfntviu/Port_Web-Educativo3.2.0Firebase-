<template>
	<div class="base-container">
		 <!-- Panel de Alumnos -->
		<div v-if="role === 'alumno'" class="container-component">
			<h2>Panel de Notificaciónes de Alumnos</h2>
			  <CategoriesNotifications  class='categories-notifications' />
			  <LectureNotificationsAlumno />
			  <!-- Panel de Profesores -->
		</div>
		<div v-if="role === 'profesor'"  class="container-component">
			<h2>Panel de Notificaciónes Profesor</h2>
			 <CategoriesNotificationProffesor class='categories-notifications' />
			 <LectureNotificationsProfessor />
		</div>
		<!-- Rol Indefinido -->
		<div v-else>
			<p>Error No Defininido</p>
		</div>
	</div>
</template>

<script setup lang="ts" >
	/** Cambios Aplicacos: 03/Oct/2025 **/
	import {onMounted} from 'vue';
	// librerias del store -> Acceso a Firebase
	import {useAuthStore} from '@/stores/authStore';
	import {useNotificationStore} from '@/stores/useNotificationStore.ts';
	// librerias propias
	import {CategoriesNotificationsAlumno} from '@/components/CategoriesNotificationsAlumno.vue';
	import {CategoriesNotificationProffesor} from '@/components/CategoriesNotifications.vue';
	import {LectureNotificationsAlumno} from '@/components/LectureNotificationsAlumno.vue';
	import {LectureNotificationsProfessor} from '@/components/LectureNotificationsProfessor.vue';

	 /* Estado base -> invocacion*/
	const  authStore = useAuthStore();
	const store_base = useNotificationStore();

	/* Roles de lo valores reales(desde auth)*/
	const role = authStore.role;
	const userId = authStore.user?.uid ?? '';
	   
	 /* Inincializarlo en la vista Principal*/
   onMounted(async ()=> {
      if(role && userId){
	      try{	
			  await store_base.fetchNotificationByRole(role,userId);
	      } catch(error){ // Informamos en devtools
				console.error("Error al cargar las notificaciónes, segun el tipo de Rol: ",error);
	      }
      } //#end_if 
   });

	   /*  habilitar por testeo rapido (evitar llenado de campos)
	      const role = ref<'alumno' || 'profesor'>('pred');
	      const userId = ref('user_005');   incializar un valor para no rellenar campos*/
  
</script>

 <style scoped>

 	.base-container{
 		display: flex;
 		flex-direction: column;
 		gap: 2rem;
 		padding: 1.5rem;
 		background: #f5f0e6;
 		min-width: 100vh;
 	}
 	
 	.container-component{
 		background: #ffffff;
 		border-radius: 12px;
 		padding: 1.2rem;
 		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.8);
 		 transition: transform 0.3s ease;
 	}
 	
 	.container-component: hover{
 		transform: translateY(-4px);
 	}

 	h2{
 		color: #5d4037;
 		font-size: 1.3rem;
 		font-weight: bold;
 		margin-bottom: 1rem;
 	}

 	.categories-notifications{
 		margin-bottom: 1rem;
 	}

 	/*  Animacion suave */
 	 .fade-in {
 	 	opacity: 0;
 	 	animation: fade-in 0.8s ease forwards;
 	 }

 	 @keyframes fade-in{
 	 	from { opacity:0; transform: translateY(10px); }
 	 	to { opacity: 1; transform: translateY(0);}
 	 }
 </style>
	  <!-- /** Mapeo de acciones **/ -->
	 <!-- /*const actionsMap: Record<number, ()=>Promise<void>> = {
		1:() => store_base.readNotifications(computed(()=> '')),
		2:() => store_base.recentNotifications(computed(()=> '')),
		4:() => store_base.guardarNotificacion(indNotify),
		5:() => store_base.eliminarNotificacion(id),
		6:() => store_base.prepararEdicion(notificacion),
	};  */

	/**
	 *   Ejecuta la acción basada en la opcion
	 const ejecucion_accion = async(opcion: number) =>{
	 	const accion = actionsMap[opcion];
	 	 if (accion) {
	 	 	 await accion();
	 	 }else{
	 	 	console.error("Accion definida para la opcion", opcion);
	 	 }
	 } **/ -->