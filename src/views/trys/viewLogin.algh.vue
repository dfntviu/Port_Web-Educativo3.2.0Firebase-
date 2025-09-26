

<script setup>
	 import {useAuthStore} from '@/stores/authStore.ts';
	 import {useProfilesStore} from '@/stores/profilesStore.ts';
	  import {User} from '@/types/intef.index.ts';  //podria utilizarse, desp de la 1era validacion (en: resp_usuario)?
	
	/*instanciar al metodo de autenticacion*/
	const tipoSession = useAuthStore();
	const profileState = useProfilesStore();

	   const bandera = email | contrasenia

	    if(bandera === email){
	       	   const correo = tipoSession.credencialesDeSession();
	     }else if (bandera === contrasenia) {
	     	const password = tipoSession.credencialesDeSession();	
	     }
     
     /*const correo_default = 'correo@example.core.com'
     const password_default = '643210';*/
	     const  resp_usuario = await tipoSession.getCurrentUser();
       
       // const user_sesion = ;

	/*mostrar opciones de autentificacion*/
	 async function clasificacionSession() {
	 	   if (seRequiereIniciarSesion()) {
	 	   	 let anwer_session = await tipoSession.login(correo, password);
	 	   	  // const userCredential = await signInWithEmailAndPassword(auth, email, password);
	 	   	 
	 	   }
	 	else if (seRequiereSalirSesion()) {
	 		let anwer_session = await tipoSession.logout(correo_default, password_default);

	 	} else if(siRequiereAnunciarUser()){
	 		let anwer_session =  await tipoSession.getCurrentUser(identidadUser);

	 	}
	 }
		// El usuario requiere comenzar la sesion...
	 function seRequiereIniciarSesion(argument) {
	 		console.log(`El correo: ${correo}, y el usuario: ${resp_usuario} ha Iniciado su sesión`);
	 	 return user_sesion;
	 }
      // El usuario requiere terminar la sesion ...
     function seRequiereSalirSesion() {
     		console.log(`Estas cerrando Sesión, el Usuario: ${resp_usuario} ha Salido de su sesión`);

     }
       // El usuario requiere enunciar su origen (quien es)...
     function siRequiereAnunciarUser() {
     		  const user_identify = await profileState.fetchProfileUno(resp_usuario);
     		  /*Mostrar información personalizada del usuario q inicia sesión*/
     		if(user_identify === resp_usuario.value ){
     		  console.log('Identificación del Rol:'uid_proffe)
     		  console.log('Nombre:',name);
     		  console.log('Nombre:',email);
     		  console.log('Nombre:',role 'profesor');

     		}else if(user_identify === resp_usuario.value){
     		     		console.log('Identificación del Rol:'uid_alumno)
     		     		  console.log('Nombre:'name);
     		     		  console.log('Nombre:'email);
     		     		  console.log('Nombre:',role 'profesor');
     		 }else{
     		 	  console.error('Error tú identidad como Usuario es desconocida');
     		 }
     			/*igual que la linea 31, pero esta vez para informa  quien  ingreso*/     	
     }	
</script>