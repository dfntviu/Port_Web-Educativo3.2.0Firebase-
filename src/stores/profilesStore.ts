  import defineStore from 'pinia';
  import ProfileStudentService from '@/Services/ProfileStudentServ.ts'
  import ProfileTeachersService from '@/Services/ProfileTeacherServ.ts'
  import type  {Profile} from '@/types';

   export const useProfilesStore = defineStore('profiles', {
     	state() => ({
    	 	   // Dec. de las variables reactivas de ambos roles
     	 	  profile:  profile as Profile;
              typeUser: null as User;
     	 	  loading: false,
     	 	    error: "";
     	}),

 	    actions: {
 	 	  async fetchProfileUno(userId: string){
 	 		this.loading = true;
 	 		   
 	 		try{
                    // Identificar que se guardo
                 const perfilR1 = await ProfileStudentService.getStudentById(userId);
                if(perfilR1){
                     this.profile = perfilR1;
                     this.typeUser = {uid: perfilR1.uid_alumno, name: perfilR1.name,  email: perfilR1.email, role: 'alumno'};
                     console.log('El perfil del Alumno fue obtenido correctamente de la Base Firebase');
                }
                return perfilR1; // en fase de prueba (cambios)
   	 	   }catch(err: any){
   	 	   	  this.error = err.message;
   	 	   }finally{
   	 	   	 this.loading = false;
   	 	   }
 	 	  },

 	 	  async fetchProfileDos(userId: string){
 	 		this.loading = true;
 	 		
 	 		try{
                   const perfilR2 = await ProfileTeachersService.getTeacherById(userId);

                   if(perfilR2){
                       this.profile = perfilR2;
                        this.typeUser = { uid: perfilR2.uid_proffe, name: perfilR2.name, email: perfilR2.email, role: 'profesor'}
                        console.log('El perfil del Profesor fue obtenido correctamente de la Base Firebase');
                        return perfilR2; // en fase de prueba (cambios)
                   }

   	 	    }catch(err: any){
   	 	   	  this.error = err.message;
   	 	    }finally{
   	 	   	 this.loading = false;
   	 	    }
 	 	  },
 	 	  async whyProfileToSave(userId: string, data_perfil: Profile){
 	 		this.loading = true;

 	 		try{ 	
                   if (this.typeUser?.role === 'alumno' && this.typeUser.uid === userId) {
 	 				    await ProfileStudentService.saveStudentProfile(data_perfil);
                       console.log('El Perfil del ALUMNO ha sido guardado en la Firestore')
                   }else
                   if (this.typeUser?.role === 'profesor' && this.typeUser.uid === userId) {
                        await ProfileTeachersService.saveStudentProfile(data_perfil);
                        console.log('El Perfil del PROFESOR ha sido guardado en la Firestore');
                    } else {
                        console.warn('[Estado de Perfil]: No se reconoció el tipo de usuario para guardar el perfil ');
                    }
                    
   	 	    }catch(err: any){
   	 	   	  this.error = err.message;
   	 	    }finally{
   	 	   	  this.loading = false;
   	 	    }
 	      }  // (,) si se necesitan mas metodos

          async EditProfileAlumno(userId: string, dataPerfil: Profile){
            try{
                 if(this.typeUser?.role=='alumno' && typeUser.uid === userId)
                await ProfileStudentService.updateStudentProfile(userId,dataPerfil);
            }catch{
                 this.error = err.message;
            }
          }

            /* setters: { }*/
    });