	<template>
	 <!-- PANELES DE PERFILES VISTA: DE LOS ROLES: PROFESOR y ALUMNO -->
		<section class="viewProfiles" :class="{activo: modoVista === 'registro' } ">
			<div class="panelVistas">
			      <!-- PANEL MODAL DEL PROFESOR -->
				<!-- <form @submit.prevet="registrarAlumno">  <-- error 1--> -->
				<input type="text" placeholder="Nombre del Usuario"   v-model="profile_see.name"> 
				<input type="text" placeholder="Apellido del Usuario" v-model="profile_see.lname">
				<input type="text" placeholder="Correo del Usuario" v-model="profile_see.email">  
				<label for="carrera">Carrera del Usuario</label>
				<select  v-model="profile_edit" >  <!-- resaltar la carrera que inscribio, demas inhabilitar -->
						<option value="">ICO</option>
						<option value="">IME</option>
						<option value="">ICI</option>
						<option value="">IEL</option>
						<option value="">IIA</option> 
						<option value="">ISES</option>
					</select>
					<input type="text" placeholder="Clasificación del Material"  v-model="profile_edit.classify_mat"> 
					<input type="date" placeholder="Selecciona Fecha de Registro" v-model="profile_edit.fechaActualizacion"> 
					<input type="number" placeholder="Digita tú Edad" v-model="profile_edit.age"> 
			</div>
		</section>
	 <!-- PANELES DE PERFILES EDICIÓN: DE LOS ROLES: PROFESOR y ALUMNO -->
		<section class="editProfiles">
			<div class="panelModales">
					<input type="text" placeholder="Nombre del Usuario"   v-model="profile_edit.name"> 
					<input type="text" placeholder="Apellido del Usuario" v-model="profile_edit.lname">
					<input type="text" placeholder="Correo del Usuario" v-model="profile_edit.email">  
					<label for="carrera">Carrera del Usuario</label>
					<select  v-model="profile_edit" >  <!-- resaltar la carrera que inscribio, demas inhabilitar -->
						<option value="">ICO</option>
						<option value="">IME</option>
						<option value="">ICI</option>
						<option value="">IEL</option>
						<option value="">IIA</option> 
						<option value="">ISES</option>
					</select>
					<input type="text" placeholder="Clasificación del Material"  v-model="profile_edit.classify_mat"> 
					<input type="date" placeholder="Selecciona Fecha de Registro" v-model="profile_edit.date"> 
					<input type="number" placeholder="Digita tú Edad" v-model="profile_edit.age"> 
			</div>
		</section>

	</template>

  <script>
     
  		// Formulario de Registro
		/*const profile_see = {
		  nombre = form.name
		apellido = form.lname
		 carrera = form.carrera // error4
		   curso = form.subject
		    edad =	form.age
		 fechaDeRegistro = form.value.date  // error4	     
		}

	// Formulario de Edición
	const profile_edit = ref({
	 	 	 name: '',
	 	 	lname: '',
	 	 	carrera: '',
	 	 	subject: '',
	 	 	  age: 0
	 	  });*/

	// incompleto
    </script>