 <template>
 	  <section class="admin-alumnos">
	    <table v-for="alumno in todos_al" class="table_alumnos">
	    	<thead>
	    		<th>nombre</th>
	    		<th>apellido</th>
	    		<th>carrera</th>
	    		<th>curso</th>
	    		<th>fechaDeRegistro</th>
	    		<th>Edad</th>
	    	</thead>
	      <td>
	 	  	<tr><button @click="todosAlumnosRegistradosFormTabla"></button> {{`Total es: ${todos_al}`}} </tr>
	 	  </td>
	    	
	 	  		
	    </table> 	  
 	  	
 	  	<div v-for="datos_cuantify in dato_tot_al" class="contador-alumnos">
 	  		  <li>
	 	  	<ul>
	 	  		<button @click="datoDeRegistros"></button>
	 	  	</ul>
	 	  </li>
	    		
 	  		
 	  	</div>
 	  </section>

 </template>
  <script setup>
	 import {ref,onMounted} from 'vue';
	 import {useAdmAllStore} from '@/stores/allAdmStore.ts'; 
	   import {registrarAlumno} from './viewRegistrarAlumnos.vue';


	 const storeAll = useAdmAllStore();
     const alumno = 'juan123';   //cambiar por lo que esta ingr. es decir por authtore(esta autenticarion Fbase)
     const clave_alum = 'AL0012';
    
    async function todosAlumnosRegistradosFormTabla(){
        if (alumno === form_send.nombre.value) {
    
    	  await control_alumnos = storeAll.monitoringTotal(alumno);
    	  console.warn('Alumnos Inscritos: - Mostrando:'apellido );
    	  console.log(`Alumnos  >> [Mostrando Nombres] -> - ${control_alumnos.nombre.value} - `);
    	  console.log(`Alumnos  >>  [Mostrando Carreras ] -> - ${control_alumnos.carrera.value} - `);
    	  console.log(`Alumnos  >>  [Mostrando Clasificaciónes ] -> - ${control_alumnos.curso.value} - `);
    	  console.log(`Alumnos  >> [Mostrando fechas de Registro] -> - ${control_alumnos.fechaDeRegistro.value} - `);
    	  console.log(`Alumnos  >> [Mostrando Edades] -> - ${control_alumnos.edad.value} - `);
    	  console.warn('Despliegue Total Terminado')
    	  
    	  
    	   /*${control_alumnos}*/
        }else{
        	console.error('Lo siento el nombre del Alumno no corresponde con los registros de Firebase')
        }
    }
    async function datoDeRegistros(){
            let msg_err = 'No fue posible obtener la cifra total de Alumnos Registrados';
        if(registrarAlumno()){
       	   let num_alumno = await storeAll.cuantificateTotal(clave_alum);
       	     return num_alumno;
        }else{
         	console.log(msg_err);
       	    return msg_err = 
       }
     }


     onMounted(await ()=>{
     	 let todos_al, dato_tot_al;
     	  todos_al = todosAlumnosRegistradosFormTabla();
     	  dato_tot_al = datoDeRegistros();
     	  console.log(`EL total de Alumnos en la Base es: ${todos_al}`);s
     })
  </script>

 <style scoped>
 	/*Generar un efecto para la tabla*/


 	.admin-alumnos{

 	}
 	.contador-alumnos{

 	}
 	.table_alumnos{

 	}
 	/*Mas estilos necessarios adecuados para esta vista*/


 	/*Responsividad*/
 	@media adjustMoviles {
 		
 	}

 </style>