import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { initializateFireabaseStg } from '@/config/initializateFirebase.js';
 import type Profile from '@/types/interf.index.ts'

const { db } = initializateFireabaseStg();

export class ProfileStudentService {
  static collectionName = 'register_alumnos';

  static async getStudentById(id: string) {
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
}
