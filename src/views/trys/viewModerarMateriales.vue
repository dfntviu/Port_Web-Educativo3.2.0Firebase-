	<template>
		<div class="status_moderate">
    	  <!-- Registro del Perfil del Usuario: Alumno -->
			<section v-for="mat in autorizados :key=ix_mat" class="mats_aprobados" :class="{habilitar_mode: modoModeracion === 'mats_aprobados' } ">
					<input type="text" placeholder="Id del Alumno"   v-model="form_send.name"> 
					<input type="text" placeholder="Apellido del Alumno" v-model="form_send.lname">
					<input type="text" placeholder="Titulo del Material" v-model="form_send.lname">
					<textarea type="text" placeholder="Cargando el contenido del Material..." v-model="form_send.lname">
					<input type="date"  placeholder="Fecha de Carga">
					<input type="date"  placeholder="Uuid perteneciente al Alumno ">	
					
					<button type="submit" @click="listadoMtAprobados">Materiales Aprobados</button>

			</section>
		
			<section  v-for="mat in no_autorizados :key=ix_mat" class="mats_rechazados" :class="{habilitar_mode: modoModeracion === 'mats_rechazados' } ">
					<input type="text" placeholder="Id del Alumno"   v-model="form_send.name"> 
					<input type="text" placeholder="Apellido del Alumno" v-model="form_send.lname">
					<input type="text" placeholder="Titulo del Material" v-model="form_send.lname">
					<textarea type="text" placeholder="Cargando el contenido del Material..." v-model="form_send.lname">
					<input type="date"  placeholder="Fecha de Carga">
					<input type="date"  placeholder="Uuid perteneciente al Alumno">	
					
					<button type="submit" @click="listadoMtRechazados" >Materiales Rechazados</button>
			</section>


			<section  v-for="mat in alls :key=ix_mat" class="alls_mats" :class="{habilitar_mode: modoModeracion === 'alls_mats' } ">
					<input type="text" placeholder="Id del Alumno"   v-model="form_send.name"> 
					<input type="text" placeholder="Apellido del Alumno" v-model="form_send.lname">
					<input type="text" placeholder="Titulo del Material" v-model="form_send.lname">
					<textarea type ="text" placeholder="Cargando el contenido del Material..." v-model="form_send.lname">
					<input type="date"  placeholder="Fecha de Carga">
					<input type="date"  placeholder="Uuid perteneciente al Alumno">	
					
					<button type="submit" @click="listadoTodosMaterials">Materiales Rechazados</button>
			</section>
    	</div>
	</template>

	<script>
	  import  { useModerationStore} from '@/stores/moderateStore.ts';
	   import  { User} from '@/stores/interf.index.ts';


	  const store_moderate = useModerationStore();
	  const estado = 'rechazado' | 'aprobado';

	    // Determinar listado de aquellos Materiales pertencientes a la 1° Clasificación
	        const tipo_usuario = ref <User | null >(null);
	  	  async function listadoMtAprobados() {
	  	  		if (autorizados.lenght > 0) {
	  	  			console.error('Los Alumnos aún no han subido materiales');
	  	  		}else{
	  	  			estado = 'aprobado'
	  	  			alert('Listado de Materiales Aprobados');
	  	  			const geniall_ap = await store_moderate.estadoDeModeracion(tipo_usuario.value);
	  	  		}
	  	  }

	     // Determinar listado de aquellos Materiales pertencientes a la 2° Clasificación
	  	 async  function listadoMtRechazados() {
	  	  	if (no_autorizados.lenght > 0) {
	  	  			console.error('Aún no se han revisado los materiales');
	  	  		}else{estado = 'rechazado'
	  	  		      alert('Listado de Materiales rechazados');
	  	  			const geniall_ap = await store_moderate.estadoDeModeracion(tipo_usuario.value);
	  	  		}
	  	  }
	  	     // Determinar listado de aquellos Materiales sin Clasificación

	  	  async function listadoTodosMaterials() {
	  	  	if (autorizados.length !== mat  && no_autorizados.length !== mat ){
	  	  		   const restantes =   await store_moderate.estadoDeModeracion.estadosDeModeracionPendientes();
	  	  		     console.log(`Los materriales aún no han sido revisados un total de : ${restantes}`);
	  	  	}else{
	  	  		if(autorizados>collection.length && no_autorizados>collection.length){
	  	  			console.error('Error: No existen más materiales, pues ya fueron revisados todos')
	  	  		}
	  	  	}
	  	  }
   			
   			const election_moderation = <'mats_aprobados'| 'mats_rechazados'>('all_mats')


   			/*static async arpobarMaterialsEduc(materialId: string, alumnoId: string){
      try{
 	   		const matRef = docf(db,collectionName, materialId);
 	   		  updateDoc(matRef, {estado: 'aprobado', aprobatoAt: new Date()});
          	   NotificationService.notifyAlumno(alumnoId,'El matarial fue Aprobado');
        }catch(error){
           console.error('Error al reibir los materiales de los Alumno');
            throw error;
        }

    }*/

	</script>

	<style scoped>
		 /*Aimacion entre paneles*/
		.paneles section{
			display: none;
			transition: all 0.3s ease-in-out; /** efecto de desvancer **/
			opacity: 0;  /*no me veo*/
		}

		.paneles section.habilitar_mode{
			display: block;
			opacity: 1;   /* me veo */
		}
	</style>