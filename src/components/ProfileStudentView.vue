<template>
	<!-- Edición del Perfil de Usuario: Alumno -->
		<section class="edicion refresh" :class="{activo: modoVista==='edicion'}">
			<h2 class="b-b-examp1">Edición del Perfil</h2>
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
				   <!-- Botones de Acciones -->
			    <button type="button" @click="action= 'delete'">Eliminar</button>
			    <button type="button" @click="action= 'edit'">Editar</button>
			    	<!-- Controladora de acciones del perfil del Usuario -->
			    <input type="submit" style="display: none;">
			</form>
		</section>
</template>

<script>
	import {  ref } from 'vue';
 import { useProfileStore } from '@/stores/profileStore.ts';


	const usuario = ref<User | null >(null);

	async function EditarAlumno() {		
		 if (!usuario.value) return;
		    await store.EditProfileAlumno(usuario.value,datosPerfil.value); //error 5.2	
		     alert('El perfil ha sido editado correctamente');
	}

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
		
	  /** Metodo para controlar el evento submit **/
	const handleSumbit = async()=>{ 
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