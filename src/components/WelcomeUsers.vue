<!-- Dar la Bienvenida a los Alumnos en forma animada utilizando 
  animaciones intermedias de CSS, esta informacion es obtenida de la Firestore 
  del Back. -->
<template>
	<div class="welcome-container">
		<div class="fade-slide">
			<div v-if="fullName" class="welcome-message">
			  <h2 class="welcome-title">Bienvenido:{{full_name}}</h2>
		        <p class="carrer-text role-text">{role} - {carrera}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	  // Es el Metodo-Animado-2 ya con Bak-End NoSQL incluido
	import { ref, onMounted} from 'vue';
	import {ProfileStudentService} from '@/services/ProfileStudentServ.ts';

	const user_who = ref('');

	    const name = ref('');
	const apellido = ref('');
   const full_name = ref('');  //var nueva, vital pues la logica principal
	       const role = ref<'alumno' |'profesor'>('alumno'); // ('role_name') es el role predeterminado

	    async function seeWelcomeTextRole(email: string, password: string){
	   	    try{
	   	    	   	 /*Se consume el servicio del metd. cargadePerfil del servicio de Estudiante*/		
	   	    	  const profile =  ProfileStudentService.loadUserProfile(email,password);
	   	    
    	   		user_who.value = profile.value;
    	   		    name.value = profile.value
    	   		apellido.value = profile.value;
    	   		full_name.value = profile.value;
	   	    
	   	    	   		console.log(`Bienvenido ${full_name}, con El Rol: ${role.value}`);
	   	    }catch(error){
	   	   	   console.log('Error al cargar la animación de Texto de Bienvenida',error);
	   	    }
	   }

	   onMounted(()=>{
	   	  seeWelcomeTextRole('correo@ejemplo.com','54321');
	   })

</script>

<style scoped>
    /** UserExperience->UX **/
  .welcome-container{
 	@apply flex items-center justify-center h-screen w-full;

 	 background: linear-gradient(
 	  	135deg,
 	  	#ffd700/*Color doraddo*/
 	  	#0057b7  /*azul rey*/
 	  	#ffffff /*blanco*/ 
 	 );

 	 background: 400%  400%;
 	 animation: gradientShif 8s ease-in-out forwards;
  }

 @keyframes gradientShif {
 	0% {background-position: left;}
 	50% {background-position: center;}
 	100% {background:#ffffff }
 }

 .welcome-message{
	text-align: center;
	animation: fadeInUp 2s ease forwards;
 }

 .welcome-title{
   	  font-size: 2.5rem;
     font-weight: bold;
    color: gold;
    -web-text-stoke: 1px black;
    margin-bottom:0.5rem;
 }

 /*animacion simular luz*/
 .highlight {
 	color:0057b7;
 	color: #333;
 	 opacity: 0.9; /*muestra leve salida d cambio de color*/
 }
 /*carrera que estudia el alumno en gris obscuro*/
 .carrer-text{
 	font-size: 1.25rem; /*1rem === 10px*/
 	color: #333; /** (gris semi-obs) variar color uaemex */
 	opacity: 0.9s;
 }
 /*nombre del alumno en semigris*/
 .role-text{
 	font-size: 1.25rem; /*1rem === 10px*/
 	color: #222; /** gris obscuro */
 	opacity: 0.9s;
 }


 @keyframes fadeInUp {
 	from { opacity: 0; transform: translateX(30px); }
 	to {opacity: 1; transform: translate(0px);}
 }

 /*transiciones entre contenedores internos*/
   /*Activacion de los barridos de las transiciones*/
   .fade-slide-enter-active,
   .fade-slide-leave-active{
   	  transition:  all 1s ease;
   }
      /*Moviento Destino*/
  .fade-slide-enter-from{
  	opacity: 0;
  	transform: translateY(20px);
  }
  /*Moviento Origen*/
  .fade-slide-leave-to{
  	opacity: 0;
  	transform: translateY(-20px);
  }
</style>