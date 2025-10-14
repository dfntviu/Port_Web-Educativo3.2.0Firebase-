<template>
	<!-- El script actual fue sustituido por el vStndRegister, la unica diferencia es que 
	   el codigo es muy extenso y el script actual se distribuyo enn componentes se invocan
	   y se usar por logica JS directa, y devuelve el Componente segun corrresponda  -->
	<!-- Manipulation between of the panels -->
		<div class="acciones">
			<button @click="mostrarRegistro">Registro Alumno</button>
			<button @click="mostrarEdicion">Edición  Alumno</button>
		</div>

		<div class="paneles">
			<button @click="current='register">Registrar</button>
			<button @click="current= 'edit'">Personality</button>
			<div :is="currentView"></div>
		</div>
</template>
 <script setup>
 	import {ref, computed } from 'vue';
 	import { RegisterStudentView } from '@/components/RegisterStudentView.vue';
 	import { ProfileStudentView  } from '@/components/ProfileStudentView.vue';
 	import {validacionesPerfilProfessor} from '@/utils/validacionsProfileTeacher.js'; //*

 	const current = ref('register');
 	const currentView = computed(()=>current.value === 'register' ? RegisterStudentView : ProfileStudentView)

 	// const modoVista = ref<'registro' | 'edicion'>('registro'); [en su lugar quedo 'current']

 	function mostrarRegistro() {
		current.value = 'registro';
	}

	function mostrarEdicion() {
		current.value = 'edicion';
	}

	/*Todo se sumariza a que la lógica centralizada todavia es posible refactorizarse aun mas
	 utilizando le tecnica de composable. Las 12 Lineas del componente actuales son reducidas 
	 significativamente a 2 lineas*/

		/*** IMPORTANTE: P/DESENPOLVAR ****/
	/*Sugerencia crear directorio composables:
	  a. Recordando:
	   ================================================================================
	   COMPOSABLE: Un composable es una unidad de codigo(como script, componente o función) 
	    que encapsula estructuras de datos, objetos, formularios o metodos con lógica sencilla. 
	   Estos bloques de código  pueden ser utilizados y retornados en otros scripts, lo que
	   permite que la logica principal del Sistema permanezca limpia y separada de la lógica
	   auxiliar o de definicion. La separación permite que la Lógica del negocio y la de 
	   definición no se mezclen, lo que facilita el mantenimiento y la escalabilidad del  código.

	   Expresando de la forma más sencilla: El composable permite separar la lógica de negocio 
	   de la lógica de infraestructura o utilidades.
	  ================================================================================ 
	  Es por ello que podemos centralizar la lógica que encapsula las utilidades(entradas[data-structure])
	 */

 </script>
 <style>
 	 /*Aimacion entre paneles*/
	.paneles section{
		display: none;
		transition: all 0.3s ease-in-out; /** efecto de desvancer **/
		opacity: 0;  /*no me veo*/
	}

	.paneles section.activo{
		display: block;
		opacity: 1;   /* me veo */
	}

	.acciones{
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin: 2rem;
	}

	.acciones button {
		padding: 0.5rem;
		font-size: 1rem;
		border: none;
		border-radius: 5px;
		background-color: #0d6efd;  /** primario Bootstrap **/
		  color: white;
 	     cursor: pointer;
         transition: background-color 0.3s;
	}

	.acciones button:hover {
		background-color: #ob5ed7;
	}
	/*.paneles section {  
	 	background-color: #f8f9fa;
	 	border-radius: 8px;
	 	padding: 2rem;
	 	width: 100%;
  		max-width: 600px;
  		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}*/
 </style>