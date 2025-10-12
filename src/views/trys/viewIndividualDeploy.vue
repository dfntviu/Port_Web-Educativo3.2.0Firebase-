<template>
	
	<h2>Catalogo Individual Alumno</h2>
		<h3>Bienvenido: {alumno.nombre}. con el uid: {alumno.uid}</h3>
  		<table class="table_alumnos">
  			<thead>
  				<tr>Nombre</tr>
  				<tr>Apellido</tr>
  				<tr>Id del Material</tr>
  				<tr>Nombre del Material</tr>
  				<tr>Fecha de Subida</tr>
  			</thead>
  			<tbody>
  				<tr v-for="mat in mat_indivual" :key="mat.uid"></tr>
  				<td>{mat.nombre}</td>
  				<td>{mat.apellido}</td>
  				<td>{mat.id_mat}</td>
  				<td>{mat.nombre}</td>
  				<td>{mat.fechaDeSubida}</td>
  			</tbody>
  		</table>

</template>

<script setup lang="ts">
		// traer la libreria de alumnos, para dar la bienvenida al Alumno(identificar a quien pertenece el material)
	import {useProfileStore} from 'profileStore.ts';

	/* traer los metodos correspondiente a materiales y autor*/
	 import {useMaterialStoreR2} from 'materialStore.ts';
	 import {useAuthStore} from 'authStore.ts';

	/*Paso 1:  Instanciar al metodo de materiales de techers (obt la ref.) */
	 	const store_material_indiv = useMaterialStoreR2();
	 	const store_autentificado = useAuthStore();	
	 	const store_personality = useProfileStore();	

	 	 const uid = ref(<'alumno'>('alumno'));
	 	
	 	function verMaterialPorAlumno(uid){
	 		 	 try{
	 		 	 
	 		 	 	/*Paso 1a Guardar el contenido del material individual (obtener el acceso) */
	 		 	 	 		const mat_indivual = store_material_indiv.obtenerMaterialPorId(uid);
	 		 	 
	 		 	 	/*Paso 2: Validar que la informacion corresponda con  el id del alumno(vinculada a la autentificacioni atuh) **/
	 		 	 			if(useAuthStore.uid === mat_indivual.uid){
	 		 	 				console.log('Sea abrio la sesión corresp. al Material');
	 		 	 			}
	 		 	     /*Paso 3: Validar que al menos el usuario loggeado, pose un material PDF */
	 		 	 			if(mat_indivual.length<=0){
	 		 	 				console.error('Lo sentimos, ud no ha subida ningun material en su sesión');
	 		 	 			}
	 		 	 
	 		 	     /*Paso 4: Mostrar la informacion individual de materiales PDF subida por el alumno*/
	 		 	        /*Paso 4a Invocar al f(n) del store que sube el contenido alumno*/
	 		 	 			for(mat of mat_indivual){
	 		 	 				console.log(`Materiales del uid ${alum.uid}:\n Materiales: ${mat.id_material} -${mat.id_nombre} - ${mat.fechaDeSubida}`);
	 		 	 
	 		 	 	  			 /*Paso 4b Recorrer todo el catalogo de materiales por autentificacion y devolverlo */
	 		 	 				 return mat.nombre;
	 		 	 			}
	 		 	 			 const alumno = store_personality.fetchProfileUno(uid);
	 		 	 			 return alumno;
	 		 	 }catch(error){
	 		 	 	 console.error('Lo sentimos, no pudimos acceder a los materiales ni a su uid', error);
	 		 	 	   throw new error;
	 		 	 }
	 		}	  
	 		/*Informacion cruda*/
</script>
