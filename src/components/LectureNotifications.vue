<!-- Subcomponente Hijo de Categorias: 
    Proposito: Efectuar el trabajo en conjunto al componente padre
    CategoriesNotifications para obtener las lecturas de las notificaciones 
    y clasificar las notificaciones 
    viewNotificationBase  -->
 <template>
 	<div class="lecture-notifications">
 		<div class="filters">
 			<span>Estado de Lectura</span>
 			<button :class="{active: showAll}" @click="showAll=true">
 			   Todas lasNotificaciónes</button>

 			<button :class="{active: showAll}" @click="!showAll=false">
 			   Notificaciónes Leídas</button>

 			<button :class="{active: showAll}" @click="!showAll=false">
 			   Notificaciónes No Leídas</button>
 		</div>

 		<ul>
 			<li v-for="n in displayedNotifications" :key="n.id">
 				<span :class="{read: n.read} {read: n.message}"></span>
 				 <button @click="$emit('toogle-read', n.id, !n.read)">
 				 	{{n.read ? 'Marcar como No Leido' : 'Marcar como Leido'}}
 				 </button>
 			</li>
 		</ul>
 	</div><!-- <termino(el modo lectura) >  -->		
			
 </template>



<script setup lang="ts">
	import {ref, computed, watch} from 'vue';
	import type {Notification} from '@/types/interf.index.ts';

	const props = defineProps<{
		notifications: Notification[];
	}>();

	const showAll = ref(true);

	// Filtrado Reactivo por el tipo lectura
	 const displayedNotifications = computed(()=>{
	 	 if (showAll.value) return props.notifications;
	 	   return props.notifications.filter(n => n.read);
	 });
</script>
  <style scoped>
  	 .lecture-notifications
      	margin-top: 1rem;
     }

  	 .filters{
  	 	display: flex;
  	 	gap: 0.5rem;
  	 	margin-bottom: 1rem;
  	 }

  	 .filters button{          
   	 	padding: 0.25rem 0.5rem;
   	 	border: 1px solid #ccc;
   	 	border-radius: 4px;
   	 	cursor: pointer;
  	 }

  	 .filters button.active{
  	 	background-color: #2196f3;
  	 	color: white;
  	 }

  	 ul{
  	 	list-style: none;
  	 	padding: 0;
  	 }

  	 li{
  	 	display: flex;
  	 	justify-content: space-between;
  	 	padding: 0.5rem;
  	 	border-bottom: 1px solid #eee;
  	 }

  	 li span.read{
  	 	color: #999;
  	 	text-decoration: line-through;
  	 }
   
     botton {
  	 	cursor: pointer;
  	 	background: #f0f0f0;
  	 	border: none;
  	 	padding: 0.25rem 0.5rem;
  	 	border-radius: 4px;
     }
  	 
  	 button: hover{
  	 	background-color: #ddd;
  	 }
  </style>