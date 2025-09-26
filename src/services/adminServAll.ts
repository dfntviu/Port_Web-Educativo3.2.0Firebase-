	import { ProfileStudentService } from '@/Services/ProfileStudentServ.ts';
	import { MaterialsDeployService } from '@/Services/MaterialServ.ts';
	 import type Profile from '@/types/interf.index.ts';

  export class adminAllServices {
  	static todos_alumnos = 'adm_alumnos_register';
  	
  	static async  adminAlumnos(nombre): Promise <Profile[]>{
     	try{
     	    const alumnos = ProfileStudentService.getStudentById()
     	
     	console.log('============================================');
     	console.log(' Listado de Alumnos ya Registrados Previamente');
     	console.log('============================================');
 	
     	alumnos.forEach(alum => {
     		console.log(`- ${alum.nombre} - `);
     	});
     	  		  return alumnos;
     	}catch(error){
     		console.error('Error al Listar a todos los Alumnos Registrados');
     		 throw error;
     	}
  	}

  	static async adminMaterials():Promise<any>{
     	    try{
  			const materiales = MaterialsDeployService.getAllMaterialsEduc()
     	        materiales.forEach((mat,idx)=>{
     	         console.log('Material Nombre: ', mat.titulo);
     	        }); 
     	       		 return materiales
     	    }catch(error){
     	    	console.error('Error obtenido en materiales');
     	    	 throw error;
     	    }

  	}

  	static async totalDeMateriales(material_id:string): Promise<void>{
  		try{
  		  	  const materiales =	 MaterialDeployService.getAllMaterialsEduc();
  		 	const encontrados = materiales.filter(mat => mat.id === material_id);
  		 	 console.log(`El Total de Materiales con ID ${encontrados.length}`);
  		}catch(error){
  			console.error('Error al contar los materiales: ', error);
  			 throw error;
  		}
  	}
   
 
  	static async totalDeAlumnos(): Promise<void>{
  		 try{
  		   		 const todos_sus_alumnos = this.getAllAlumnos();
  		   		   console.log('El total de Alumnos es: ',todos_alumnos.length);
  		   }catch(error){	
  		   		console.error('Error en la longitud de Alumnos');
  		   		  	throw error;
  		   }
  	}

		static async getAllAlumnos():Promise<any> {
	     	try{
	           const snapshot = await getDocs(collection(db, this.todos_alumnos));
	             return snapshot.docs.map(doc =>( {id: doc.id, ...doc.data}));
	        }catch(error){
	            console.error('Error al obtener todos los Alumnos');
	             throw error;
	        }
	          return snapshot;
	    }

	    /* Constructor actualizado, utilizado
	       async getAllStudents(): Promise<Profile[]> {
    		const snapshot = await getDocs(collection(db, 'adm_alumnos_register'));
   			 return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Profile[];
  		}, */
 } //#End de la Clase
