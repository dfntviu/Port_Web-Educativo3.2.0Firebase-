<template>
	 <h2 class="b-b-examp1">Registro y Edición de Alumnos </h2>
	   <!-- Manipulation between(en medio) the panels -->
		<div class="acciones">
			<button @click="mostrarRegistro">Registro Alumno</button>
			<button @click="mostrarEdicion">Edición  Alumno</button>
		</div>
		<!-- Ctrl of CSS Animation -->
	<div class="paneles">
		    <!-- Registro del Perfil del Usuario: Alumno -->
		<section class="registro" :class="{activo: modoVista === 'registro' } ">
			<form @submit.prevent="registrarAlumno">  <!-- error 1-->
				<input type="text" placeholder="Escribe tú Nombre"   v-model="form_send.name"> <!-- error2-->
				<input type="text" placeholder="Escribe tú Apellido" v-model="form_send.lname">  <!-- error2-->
				<label for="carrera">Elige tú Carrera</label>
				<select  v-model="form_send.carrera" >
					<option value="">ICO</option>
					<option value="">IME</option>
					<option value="">ICI</option>
					<option value="">IEL</option>
					<option value="">IIA</option> <!--nueva-->
					<option value="">ISES</option>
				</select>
				<input type="text" placeholder="Escribe tú Materia"  v-model="form_edit.subject"> <!-- error2-->
				<input type="date" placeholder="Selecciona Fecha de Registro" v-model="form_edit.date"> <!-- error2-->
				<input type="number" placeholder="Digita tú Edad" v-model="form_edit.age"> <!-- error2-->

				<!-- Lo omiti, enviar informacion al Store(estado) -->
				<button type="submit">Registrar</button>
			</form>
		</section>
			<!-- Edición del Perfil de Usuario: Alumno -->
		<section class="edicion refresh" :class="{activo: modoVista==='edicion'}">
			<form @submit.prevent="handleSumbit"> <!-- error 1-->
				<input type="text" placeholder="Esc. tú nuevo Nombre"  v-model="form_edit.name">
				<input type="text" placeholder="Esc. tú nuevo Apellido" v-model="form_edit.lname">
				<label v-model="form_edit.carrera">Elige tú Carrera</label>
				<select  v-model="">
					<option value="">ICO</option>
					<option value="">IME</option>
					<option value="">ICI</option>
					<option value="">IEL</option>
					<option value="">IIA</option>Cambiar
					<option value="">ISES</option>
				</select>
				<input type="text" placeholder="Cambia la Materia" v-model="form_edit.subject">
				  <!-- <input type="text" placeholder=" Esc. Nueva  Fecha de Registro"> -->
				<input type="text" placeholder="Esc. Nueva Edad" v-model="form_edit.age">
				  <!-- Botónes de Accion -->
				<button type="button" @click="action= 'edit'">Editar</button>
				<button type="button" @click="action= 'delete'">Eliminar</button>

 				   <!-- Se aniadio hidden input para manejar el submit -->
				 <input type="submit" style="display: none;">
				 <!-- En action se guarda la accion a ejecutarse -->
			</form>
		</section>
	</div>

</template>

<script setup>
	// Nota: Cambiar vista a TS, de lo contrario no se hace responsable esta capa de la arq MVMCC, lo que ingrese el usuario
	import { onMounted, ref } from 'vue';
	import { useProfileStore } from '@/stores/profileStore.ts';
	 import { User, Material } from '@/types/intef.index.ts';

     const store = useProfilesStore();

	// Formulario de Registro
	const form_send = {
	  nombre = form.name
	apellido = form.lname
	 carrera = form.carrera // error4
	   curso = form.subject
	    edad =	form.age
	 fechaDeRegistro = form.value.date  // error4	     
	}

	    // Formulario de Edición
		const form_edit = ref({
	 	 	 name: '',
	 	 	lname: '',
	 	 	carrera: '',
	 	 	subject: '',
	 	 	  age: 0
	 	}, actualizacionAlumno());  //a prueba

         // Datos Estructurados que recibe el Store ()
		const datosPerfil = computed(()=>({
			nombre: form_send.value.name,
			apellido: form_send.value.lname,
			carrera: form_send.value.carrera
			curso: form_send.value.subject,
			edad: form_send.value.age,
			fechaDeRegistro: form_send.value.date
		}));

	 // El usuario Actual
     const usuario = ref<User | null >(null);  // error6	  

     // registro_del_alumno
	export async function registrarAlumno(){
		 if (!usuario.value) return;
		   await store.whyProfileToSave(usuario.value,datosPerfil.value);  //error 5.1
		 alert('El registro del Alumno ha terminado correctamente');
	}	
       // registro_del_alumno
	const actualizacionAlumno = async()=> {
		  if (!form_edit.value) {
		  	 console.error('El Objeto de edición del Alumno no existe');
		  }else{
		  	  await store.updateStudentProfile(usuario.value, Material);
		  }
	}
       /* Met p/Editar el Perfil del Usuario [Profile]*/
	async function EditarAlumno {		
		 if (!usuario.value) return;
		    await store.EditProfileAlumno(usuario.value,datosPerfil.value); //error 5.2	
		     alert('El perfil ha sido editado correctamente');
	}
		// adicional -> Profile
	 
	  /* Eliminar el Perfil del usuario [Profile]*/
	async function deleteProfile(){	
		if (usuario.value) {	 // es incesesario definir el valor del rol, porq esta en el store
			  const eliminado = await store.selectedProfileForRoleDel(usuario.value);
			  if (eliminado) {
				alert(`Perfil ha sido eliminado Satisfactoriamente`);			  	
			  }else{
			  	alert(`No fue posible eliminar el Perfil del usuario: ${usuario.value.name}`);			  	
			  }
			   return eliminado;
		} else{
			 alert('Error: No hay usuario seleccionado para Eliminar');
			    return false;
		}
	} // #End_delProfile 

	      /* Logic of UserExperience(UX) -> [Experiencia de Usuario] */
		const modoVista = ref<'registro' | 'edicion'>('registro')

		function mostrarRegistro() {
			modoVista.value = 'registro';
		}

		function mostrarEdicion() {
			modoVista.value = 'edicion';
		}

        // onMounted solo es para el cargando de info

       /** Controlador de acciones: F(n) para manipular el evento submit **/
	const handleSumbit = async()=>{ /**  [profile_del_alumno] **/
		 if(!usuario.value){
		 	alert('No hay usuario seleccionado');
		 	 return;
		 }

		 if (action.value === 'edit') {
		 		await EditarAlumno();
		 } else if (action.value === 'delete') {
		 		await deleteProfile();
		 }
	};

</script>

<style scoped>

	/* Props Generales */
	.b-b-examp1{
		text-align: center;
		margin-top: 2rem;
		font-weight: bold;
		font-size: 1.8rem;
	}
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

	/*Estilos del formulario */
	 form{
	 	display: flex;
	 	flex-direction: column;
	 	gap: 1rem;
	 }

	 /*Entradas y Selector*/
	form input,
	form select {
	 	padding: 0.6rem;
	 	font-size:  1rem;
	 	border-radius: 5px;
	 	border: 1px solid #ced4da;
	 	width: 100%;  /** la magica **/
	}
	 /* Props de los Paneles */
	.paneles {
  		display: flex;
  		justify-content: center;
  		align-items: start;
  		min-height: 300px;
	}

	 /*Propiedades para las limitaciones de los Paneles*/
	.paneles section {  
	 	background-color: #f8f9fa;
	 	border-radius: 8px;
	 	padding: 2rem;
	 	width: 100%;
  		max-width: 600px;
  		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}
	 /* Botones del formulario */
	form button[type="submit"] {
	  background-color: #198754; /* Bootstrap success */
	  color: white;
	  border: none;
	  padding: 0.6rem;
	  border-radius: 5px;
	  font-weight: bold;
	  transition: background-color 0.3s;
	}

	form button[type="submit"]:hover {
	  background-color: #157347;
	}

	 /* Botones de Acciones*/
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

		/* Responsividad */
		@media (max-width: 768px) {
		  .paneles {
		    flex-direction: column;
		    align-items: center;
		  }
		}
</style>