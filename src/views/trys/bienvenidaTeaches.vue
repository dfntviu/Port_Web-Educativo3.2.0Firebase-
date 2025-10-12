<template>
	<div class="vista-welcome_alumnos">

		<WelcomeUsers v-if="profesor"/>		
	</div>
</template>
<script setup>
	import {onMounted} from 'vue';
	import { WelcomeTeachers } '@/components/WelcomeTeachers.vue';
	  // Inputs de testing instataneo
		const email ='correo@ejemplo.com';
		const password = '54321';

	  onMounted(()=>{
	   	  seeWelcomeTextRole(email,password, 'profesor');
	   })
</script>