<template>
	<div class="base-containter" v-if="role" >
		<div class="container-component1">
			<h2>Panel de Notificaciónes Alumno</h2>
			  <CategoriesNotifications v-if="role === 'alumno'" class='categories-notifications'/>
		    <LectureNotificationsAlumno  v-if="role==='alumno"/>
		</div>
		<div class="container-component-2">
		  <h2>Panel de Notificaciónes Profesor</h2>
		    <CategoriesNotificationProffessor v-if="role === 'profesor'" class='categories-notifications'/>
		    <LectureNotificationsProfessor  v-if="role==='profesor'"/>
		</div>
		  <!-- </div> -->
	</div>

	<div v-else>
		<p>Error el Rol no Fue definido</p>
	</div>
</template>

<script setup lang="ts">
	import {ref, onMounted} from 'vue';
    import {  useNotificationStore } from '@/stores/useNotificationStore.ts';
    import { CategoriesNotificationProffessor } from '@/components/CategoriesNotificationProffessor.vue';
    import { CategoriesNotifications } from '@/components/CategoriesNotification.vue';
    import {    LectureNotificationsProfessor } from '@/components/LectureNotificationsProfessor.vue';
    import {    LectureNotificationsAlumno } from '@/components/LectureNotificationsAlumno.vue';

	const store_base = useNotificationStore();

	 // # Definir el rol dinamicamente
	// const role = ref<'profesor' | 'alumno'>('profesor');

	const allNotifications = ref(store_base.notifications);

	     // Alternar la lectura de las Notificaciones
	    /*const toggleRead = async (notificationId: string, read: boolean) =>{
	  	  await store_base.readingType(notificationId,read);
	    }*/

        const miscelaneosCategoriesRole1=async()=> {
           const opcion = store_base;
           const procesar = ref('');
           
           switch(opcion){           	 case 1:
           		await store_base.readNotifications(procesar)           	 	
           	 case 2:
           		await store_base.recentNotifications(procesar)
           	 case 3:
           		await store_base.guardarNotificacion(idNotify);
           	  case 4:
	            await store_base.eliminarNotificacion(id);
	          case 5:
           		await store_base.prepararEdicion(notification);
           	   case 6:
           	    await store.toggleRead();
           }

       }

       onMounted(await	()=>{
       	  miscelaneosCategoriesRole1();
       })

	
</script>