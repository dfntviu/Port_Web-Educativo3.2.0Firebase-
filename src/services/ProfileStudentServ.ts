import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {updatePassword,reuthenticateWihCredential,EmailAuthProvider} from 'firebase/firesbase';
import { initializateFireabaseStg } from '@/config/initializateFirebase.js';
 import {SearchMaterial} from '@/components/SearchMaterials.vue';/*Nuevo metodo de componente de Busqueda*/
import  {AuthService} from '@/services/AuthService.ts'; /*servicios  p/cargar el perfil del usuario */
import  {ProfileTeachersService} from '@/services/ProfileTeachersServ.ts';
/* End_servs loadUser*/
 import type Profile from '@/types/interf.index.ts'


const { db } = initializateFireabaseStg();

export class ProfileStudentService {
  static collectionName = 'register_alumnos';
    /*a revisar, sino solo al role alumno.*/
  static async getStudentById(id: string,role:'alumno') {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
      console.error('[ProfileStudentService]: Error al obtener alumno', error);
      throw error;
    }
  }

  static async saveStudentProfile(student: { id?: string; nombre: string; apellido: string; email: string;
                                     carrera: string, curso?: string, edad: number}) {
    try {
      const docRef = student.id ? doc(db, this.collectionName, student.id) : doc(collection(db, this.collectionName));
      const data = {
        nombre: student.nombre,
        apellido: student.apellido
        email: student.email,
        carrera: student.carrera,
        curso: student.curso || '',
        fechaActualizacion: new Date(),
        edad: student.edad,
      };
      await setDoc(docRef, data, { merge: true });
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('[ProfileStudentService]: Error al guardar perfil de alumno', error);
      throw error;
    }
   } 

  /*------------------------------------------------
      Editar el Perfil del Alumno
    ------------------------------------------------
  */
  static async updateStudentProfile(id: string, data: Materiales<Profile>): Promise<void>{
    try{
        const ref = doc(db,this.collectionName,id);
        await updateDoc(ref,data);
    }catch(error){
      console.error('[ProfileStudentService]: Error al guardar la actualización del Alumno', error);
        throw error;
    }
  }

  /*------------------------------------------------
      Mostrar el Perfil del Alumno
    ------------------------------------------------
  */
  static async getStudentProfile(id:string):Promise<Profile| null>{
     try{
        const ref = doc(db,this.collectionName,id);
         const snap = await getDoc(ref,data)
           if (docSnap.exists()) {
             return snap.data() as Profile;
           } 
              return null;
     }catch(error){
        console.error('[MaterialDeployService]: Error al obtener el  Perfil del Alumno', error);
          throw error;
     }
  }
  /*Nuevo metodo para conseguir info basica por correo*/
  static getDataPorCorreo(correo:strin) {
    // logica del metodo, buscar en la (version de prototipo)
  }

  /** Metodo Lógico_4 -> (29/09/2025)
   * Nuevo Met. de Cambio de Password: Cambiar la contrase del Rol de Estudiante -> [trasladado 29/09/25] */
  static async changePasswordAlumno(passwd, new_passwd){
    try{
       const user_current = auth.currentUser;
         if (user_current || user_current.email) {
           throw new Error("No hay usuario autenticado")
         }
         /*1. Obtener la reutenticacion de credenciales*/
         const crendential = EmailAuthProvider.crendential(user_current,passwd);
           await reuthenticateWihCredential(user_current, passwd);

          /*2. Actualizamos la contrasenia*/
           await updatePassword(user_current, new_passwd);
          // 2a Notificar al  usuario desde el Front-E
           alert('La nueva contraseña fue modificada correctamente');

    }catch(error){
       console.error('Error al cambiar la contraseña. Verifica que se cumplan los criterios de Autenticación');
        throw error;
    }
  }
  /*Se encarga de traer los datos del Alumno -> Metodo necesarios del Back-End [Metodo-L4] ->(29/09/2025)*/
  static async busquedaDelAlumnoPorNombre(nombre){
    try{
      // Paso 0: Conseguir la referencia del Alumno
      
      const consul_students = query(collection(db,this.collectionName),
                                  where('nombre' '===', nombre)
                                 );
              const snapshot = await getDocs(consul_students);
                // Si esta vacio, avisale                
                 if (snapshot.empty)  return null;
                // Si la consulta tiene mayor a 1,  devuelvela
                const doc_Snap = snapshot.docs[0];
                  return {id: docSnap.id, ...docSnap.data()};
    }catch(error){
        console.error('[Serv. de Perfil de Estudiante] - Error al Obtener la referencia por Nombre');
         throw error;
    }
  }
  /*Prop: Traer cualquier rol que inicie sesion y animarlo desde el componente ->'WelcomeUsers' >> Metodo-Animado-2 */
    static async loadUserProfile(email:string, password:string, role: 'alumno' |'profesor'){
      const loggin = await AuthService.login(email,passwd);
      try{
        if(!login){
           throw new Error(`No fue posible autenticar el Correo-Electrónico ${email}`);
        }

        /*2. Obtener los datos del usuario segun correponda el rol*/
         let curent_user;
           if (role=== 'alumno') {
               curent_user = await this.getDataPorCorreo(email);
           }else if(role=== 'profesor'){
                curent_user = await ProfileTeachersService.getDataPorCorreo(email);
           }
            // Todo lo que no pertenezca a la reglas de asociacion de los roles
           if (!user_current) {
             throw new Error(`El Usuario no ha sido registrado en la colección ${role}`);
           }

          /*3. Obtener el perfil desde la Firestore(guardamos la coleccion de registros de ambos roles) */
           const profile = await this.getStudentProfile(curent_user,role);

           /*4. Construi una respuesta uniforme*/
            return {
              email: curent_user.email
              nombre: profile.nombre
              apellido: profile.apellido;
               fullName: `${profile.nombre}+${ profile.apellido}`;
               role;
            };
        }else {
            console.error('[UserProfileService]: Error al cargar el perfil', error);
             throw error;
        }
    }
}