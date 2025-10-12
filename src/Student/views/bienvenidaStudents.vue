<template>
	<div class="vista-welcome_alumnos">
		<WelcomeUsers  v-if="alumno" :role="'alumno'"/>	

	</div>
</template>

<script setup lang="ts">
	/*Realizado el 08 de Octubre del 2025*/
	import { ref, onMounted} from 'vue';
	import { WelcomeUsers } '@/components/WelcomeUsers.vue';

	// Variables de testing
	const    email: "correo@college.mx";
	const password: "123654";

	const alumno = ref(false);

	onMounted(()=>{
		seeWelcomeTextRole(email,password,'alumno');
	})

	async function animarBienvenidaRole(email: string, password: string, role: 'alumno') {
		try{
			 // invocamos al metodo del servicio correspondiente
		  const carga_perfil = await ProfileStudentService.loadUserProfile(email,password, role);

		   // si se cargo correctame el perfil, se asigna el rol y se muestra el componente
		   if (carga_perfil && carga_perfil.role === 'alumno')  alumno.value = true;

		}catch(error){
			console.error('Error al cargar el perfil de Bienvenida', error);
		}
	}
	
</script>