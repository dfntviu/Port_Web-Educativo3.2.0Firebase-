  import defineStore from 'pinia';
  import NotificationService from '@/Services/NotificationsServ.ts'
  import type  {Notification} from '@/types';

 export const useNotificationStore = defineStore('notification', {
 	 state: () => ({
 	   // Variables reactivas del Estado
 	 	  notifications: [] as Notification[],
 	 	  loading: false,
 	 	  error: null as string | null,
 	 	  type_lecture: false, // es con [,] o sin [,]
 	 }),
 	 /* ACTIONS Actions*/
 	 actions: {
 	 	/**
 	 	 * Obtener las notificaciones obtenidas de un usuario.
 	 	 * */
 	 	async consummerNotifications(userId: string){
 	 		this.loading = true;
 	 		this.error = null;
 	 		try{
       	   	 	this.notifications = await NotificationService.getNotifications(userId);
       	   	 	console.log(`[Estado Notificación(es): Las Notificaciónes Obtenidas (${this.notifications.length})] `)
   	 	   }catch(err: any){
   	 	   	  this.error = err.message;
   	 	   }finally{
   	 	   	 this.loading = false;
   	 	   }
 	 	},
 	 	/**
 	 	 * Enviar notificación y refrescar la lista de estas.
 	 	 * */
 	 	async sendNotifications(userId: string, read: boolean){
 	 		this.loading = true;
 	 		this.error = null;
 	 		try{ 
				  await NotificationService.notifyAlumno(userId,msgAdv);
				   // this.notifications = NotificationService.getNotifications(userId);
       	   	 	 console.log(`[Estado de Notificación(es)]:La Notificación enviada, esta lista y actualzia`);
   	 	   }catch(err: any){
   	 	   	  this.error = err.message;
   	 	   }finally{
   	 	   	 this.loading = false;
   	 	   }
 	 	}
 	 	/** 
 	 	 * Marcar la notificación como leida o no leida.
 	 	 * */
 	 	async readingType(notificacionId: string, notifications: Array){
 	 	      this.loading = true;
 	 	      this.type_lecture = true | false;
 	 	    try{
 	 	    	 if(read){
 	 				 NotificationService.markAsRead(notificacionId)
 	 				 this.type_lecture = true;
 	 			}else{
					  await NotificationService.markAsNotRead(notificacionId);
					   this.type_lecture = false;
 	 			}

 	 			// #Actualizarlas despues de la acción
 	 			  this.notifications = this.notifications.map(n => 
 	 			  	n.id === notificationId ? {...n, read} : n
 	 			  );
 	 			  console.log(`[EstadoNotificacion]: La Notificación #: ${notifications} fue Actualizada(lectura=${read})`);
   	 	   }catch(err: any){
   	 	   	  this.error = err.message;
   	 	   }
 	 	},
 	 }
	/* SETTERS SIMULADOS*/
 	 // Asigna mensaje de error 
 	 setError(msg: string){
 	 	this.error = msg;
 	 },
 	 // Limpia las Notificaciones
 	 clarNotifications(){
 	 	this.notifications = [];
 	 },
 	  // Estipula si se leyo o no
 	 setLectureState(value: boolean){
 	 	this.type_lecture = value;
 	 },
 })