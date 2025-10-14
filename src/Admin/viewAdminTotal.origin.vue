 <template>
  	<section class="admin-alumnos">
  		<!-- Tabla de Alumnos -->
  		<h2>Administrador de Registro de Materiales</h2>
  		<table class="table_alumnos">
  			<thead>
  				<tr>Nombre</tr>
  				<tr>Apellido</tr>
  				<tr>Carrera</tr>
  				<tr>Curso</tr>
  				<tr>Fecha-Reg.</tr>
  				<tr>Edad</tr>
  			</thead>
  			<tbody>
  				<tr v-for="al in todos_alumnos" :key="al.uuid"></tr>
  				<td>{al.nombre}</td>
  				<td>{al.apellido}</td>
  				<td>{al.carrera}</td>
  				<td>{al.curso}</td>
  				<td>{al.fechaDeRegistro}</td>
  				<td>{al.edad}</td>
  			</tbody>
  		</table>

  		<!-- Boton de contador y  Total -->
  		<div class="contador-alumno">
  			<button @click="datoDeRegistros">Contar Alumnos</button>
  				<p>Total de Alumnos:{{ dato_total }}</p>
  		</div>
  	</section>
  </template>
 
 <script setup>
 	import {ref, onMounted} from 'vue';
 	import {useAdmAllStore} from '@/stores/allAdmStore.ts';

 	 	const storeAll = useAdmAllStore();

 	 const todos_alumnos = ref([]);
 	    const dato_total = ref(0);

 	    /*Obtener el total de Alumnos Registrados*/
 	async function todosAlumnosRegistradosFormTabla() {
 	  	 try{
 	  	 	todos_alumnos.value = await storeAll.monitoringTotal();
 	  	 	console.log("Alumnos cargados: ", todos_alumnos.value);
 	  	 }catch(err) {
 	  	 	console.error("Error al cargar a los Alumnos",merr);
 	  	 }

 	}

 	  /*Obtener el Total de alumnos*/
 	async function datoDeRegistros() {
 	  	try{
 	  		dato_total.value = await storeAll.cuantificateTotal();
 	  		console.log(`Total de Alumnos: ${dato_total.value}`);
 	  	}catch(err){
 	  	 	console.error("Error al contar el TOTAL Alumnos",err);
 	  	}
 	}
 	  /*Traer de forma autonoma los metodos correspondientes a la estadisitica minima de los alumnos*/
 	    onMounted(()=>{
 	  	  todosAlumnosRegistradosFormTabla();
 	  	  datoDeRegistros();
 	    });
 </script>
  <!-- Embellecer la Vista(Estilizar && Animar) -->

 <style scoped>
	.admin-alumnos{
		padding: 1rem;
	}

 	.table_alumnos{
 		width: 100%;
 		border-collapse: collapse;
 		margin-bottom: 1rem;
 	}
 	
 	.table_alumnos th,
	.table_alumnos td{
		border: 1px solid #ddd;
		padding: 0.5rem;
		text-align: left;
	}

	.table_alumnos tr:nth-child(even){
		background-color: #f9f9f9;
	}
	
	.table_alumnos tr:hover{
		background: #f1f1f1;
	}

 	.contador-alumnos{
      display: flex;
      align-items: center;
      gap: 1rem;
 	}
    button{
    	padding: 0.4rem;
    	border: 1px solid #ccc;
    	border-radius: 4px;
    	cursor: pointer;
    	background: #fafafa;
    }
 	button: hover{
 		background: #e0e0e0;
 	}
 	
 	/*Responsividad*/
 	@media (max-width: 600px) {
 		.table_alumnos th,
 		.table_alumnos tr{
 			font-size: 0.8rem;
 			padding: 0.3rem;
 		}
 	}	
 	/*Nota: Trasladar la Vista al style mejorado con experiencia ux. para obtener la vista por
 	 completo, y además de añadir las funcionalidades adicionales para tener al experiencia completa.*/
 </style>