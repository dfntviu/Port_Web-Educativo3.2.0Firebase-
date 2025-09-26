// ProfileTeachersService.ts
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { initializateFireabaseStg } from '@/config/initializateFirebase.js';
import type Profile from '@/types/interf.index.ts';

const { db } = initializateFireabaseStg();

export class ProfileTeachersService {
  static collectionNameR2 = 'teachers';

  static async getTeacherById(id: string) {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
      console.error('[ProfileTeachersService]: Error al obtener docente', error);
      throw error;
    }
  }

  static async saveTeacherProfile(teacher: { id?: string; nombre: string; email: string; asignaturas?: string[] }) {
    try {
      const docRef = teacher.id ? doc(db, this.collectionName, teacher.id) : doc(collection(db, this.collectionName));
      const data = {
        nombre: teacher.nombre,
        email: teacher.email,
        asignaturas: teacher.asignaturas || [],
        fechaActualizacion: new Date(),
      };
      await setDoc(docRef, data, { merge: true });
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('[ProfileTeachersService]: Error al guardar perfil Profesor', error);
      throw error;
    }
  }
   /** Metodos de Actualizacion & Obtencion del Perfil **/


  static async updateStudentProfile(id: string, dataProfile:Profile): Promise<void>{
    try{
        const ref = doc(db,this.collectionNameR2,id);
        await updateDoc(ref,data);
    }catch(error){
      console.error('[ProfileTeachersService]: Error al actualizar los datos del Profesor', error);
        throw error;
    }
  }

  static async getStudentProfile(id:string):Promise<Profile| null>{
     try{
        const ref = doc(db,this.collectionNameR2,id);
         const snap = await getDoc(ref,data)
           if (docSnap.exists()) {
             return snap.data() as Profile;
           } 
              return null;
     }catch(error){
        console.error('[ProfileTeachersService]: Error al obtener el  Perfil del Profesor', error);
          throw error;
     }
  }


}
