 import {socialUser, socialProfile,error,message,loading, profileStore} from '@/Teacher/views/viewRegisterTeacher';
   let dom_universitario = /@alumno.uaemex.mx$/;

export const validationesRegistro = {
 	resetTraditionalForm(): function{
	  	tradicional.nombre = '';
	  	tradicional.apellido = '';
	  	tradicional.email = '';
	  	tradicional.password = '';
	  	tradicional.numCuenta = '';
	  	tradicional.area = '';
	  	tradicional.role = 'profesor';
	  	
	}
    
    clearSocial(provider:'facebook' |  'google' ){
		socialUser.value = null;
		socialProfile.name  = '';
		socialProfile.apellido = '';
		socialProfile.email = '';
    }
        
    	// Validacion para el acceso mediante Google
    	isvalidEmail(email){
            if (typeof email !== "string") return false;
               const regex_gmail = /^[a-zA-Z0-9+-]+@gmail.com$/

                 return regex_gmail.test(email.trim());
        }

        // Validacion de correo del dominio universitario(Alumno)
            isCollegeEmail(email: String):function{
                const aceptable = false; 

                 if(typeof === 'string'){
                    // const domain = ;
                    if(email === regex_universitario){
                        const structure_body_mail = /^[a-zA-z]/;
                           aceptable = true;
                         return aceptable;
                        if(email === structure_body_mail){
                            aceptable = true
                            return aceptable;
                        }
                    }
                      email = structure_body_mail+domain;
                      return email;
                    console.log('El Correo Intitucional fue aceptado: ', email);

                }else if(typeof !== 'string') return error;

            }


        // Restriciciones para dominios de correo diferentes al universitario
           providerEmailAny(option: Number, email:String):function{

                switch(option){
                case 1:
                    // validacion por domino
                    const domProviderUno = 'outlook.com';
                       if (dom_universitario !== domProviderUno ){
                         console.error('error: Dominio no valido, para el Portal');
                           return false;
                       }

                    break;
                case 2:
                     const domProviderDos = 'live.com';
                     if (dom_universitario !== domProviderDos ){
                         console.error('error: Dominio no valido, para el Portal');
                           return false;
                       }
                    break;
                case 3:
                     const domProviderTres = 'hotmail.com';
                     if (dom_universitario !== domProviderTres ){
                         console.error('error: Dominio no valido, para el Portal');
                           return false;
                       }
                    break;
                case 4:
                     const domProviderCuatro = 'yahoo.mx';
                     if (dom_universitario !== domProviderCuatro ){
                         console.error('error: Dominio no valido, para el Portal');
                           return false;
                       }
                case 5:
                    const regex_domCorporate = /@^[a-z].com|.gob/;
                     if (dom_universitario !== regex_domCorporate) {
                        return;
                        alert('Dominio corporativo, no aceptable');
                     }

                 case 6:
                    const regex_email_any = /^[a-z]+.com | gob | edu $/
                default:{
                          const regex_notemail = isvalidEmail(!email);
                              if(regex_notemail){
                                 return;
                                 console.error('dominio no valido de cualquier correo');
                              }
                        }
                }
           }


        // Permitir entradas de registro en cadenas


        // El unico rol que da acceso a llenar el campo Num. de Cuenta es el profesor
            fieldCuentaRequerid(auth: Role, numCuenta:String):function{
                if (auth.role === 'profesor') {
                   if(numCuenta.isEmpty()){
                       return null;
                   }else{
                       alert('es necesario, registra el campo');
                       numCuenta = numCuenta.value;
                   }
               }
           }


        // El campo Area Academica es opcional para el rol Profesor
           optionRequiredTeacher(area: String): function{
             const academic_area = perfilR2.area.value;
                if (!academic_area) {
                    alert('Seleccion Obligtoria, Escriba su Especialidad de su carrera');
                }else{
                     console.log('el campo fue llenado, gracias');
                    return academic_area;
                }
           }

         
        // Todos los campos de Alumno son obligatorios a excepsion de su Edad

        // El Alumno deberá de registrar su ingreso con dominio institucional
           optionRequeriedDomainStudent(domain: String): function{
             const options = 'outlook.com' | 'live.com' | 'live.com' |  'yahoo.com'
              if(!providerEmailAny(options,domain)){
                 alert('El dominio Intitucional se registro correctamente');
                return 0;
              }else{
                 alert('Error el dominio no corresponde al Intitucional');
              
                return domain;
              }
           }

        // El Profesor tiene libertad de registrar su ingreso con cualquier naturaleza de dominio
        	// (Cuenta correo personal o instuticional)


        // El Alumno debera llenar el campo Apellido Paterno, y el profesor solo el Materno

            optionsRequeriedRoles(role: Role,ap_patero:String, ap_materno:String):function{
                role = ref(<'profesor'| 'alumno'> ('profesor'))
                if(role[0]){
                   if(!ap_patero.isRequerid()){
                     alert('Ingrese su apellido, para continuar con su registro');
                   }
                   
                }else if(role[1]){
                    if(!ap_materno.isRequerid()){
                        alert('El campo es escencial, para continuar con su registro');
                    }
                }
            }

        // Cancelar Registro, al identificar correos identicos (ambos roles)


        // Cancelar registro en contrasenias sencillas o contrasenias de tamano menor a 6
            notEasyPassword(password: String): function{
                  let regex_easy =  /[0-9]|[{0-9}{'a-z'}]|[{1-30}/{01-12}][]/
                if(password.length>6){
                    console.error('Las contraseñas de 4 o 5 caracteres no se permiten');
                   if(password.isAccept(regex_easy)){
                     console.error('Su contraseña es debil, no ingrese contraseñas que sean facil de predecir');
                   }else if(!password.isAccept(regex_easy)){
                     console.log('Contraseña aceptada, Bienvenido al Portal Educativo');
                   } 
                }
                
                // Genera el met. auxiliar de isAccept()
            }

        // Uso Obligatorio de mayusculas en Nombre y Apellido


        // Uso obligatorio del usuario en ambos roles para elegir el tipo de Role


        // f(n) un solo tipo de registro: El usuario debera de elegir cualquiera de las 3 formas de registro


            /*GPT ayudame con las validaciones restantes, genera todo teniendo como base el estilo
            de programación Lógica propuesta.*/
 }