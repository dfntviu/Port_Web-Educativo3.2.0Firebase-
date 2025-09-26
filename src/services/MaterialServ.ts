import { collection, doc,docs, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { initializateFireabaseStg } from '@/config/initializateFirebase.js';
  import {Material} from '@/types/interf.index.js';

const { db } = initializateFireabaseStg();

  export class MaterialDeployService {
    static collectionName = 'materials';

    /* ------------------------------------------------
      Obtener los Servicios de los materiales
      ------------------------------------------------
     */
    static async getAllMaterialsEduc(){

      try{
          const snapshot = await getDocs(collection(db, this.collectionName));
          return snapshot.docs.map(doc => {id: doc.id, ...doc.data});
        }catch(error){
           console.error('Error al obtener materiales');
            throw error;
        }

    }
    /* ------------------------------------------------
      Obtener los Materiales por ID 
      ------------------------------------------------
     */
    static async getMaterialsEducById(id: string){
        try{
          docRef = doc(db,this.collectionName, id);
          docSnap = await getDoc(docRef);   // no sera 1 condicional y obtener el snap
            if (!docSnap.exists()) return null;
        }catch(error){
             console.error('[MaterialDeployService]: Error al obtener material', error);
              throw error;
        }
    }

    /*------------------------------------------------
      Guardar y Actualizar los materiales Educativos
      ------------------------------------------------
     */
    static async saveMaterialsEduc(material: { id?: string; titulo: string; descripcion: string; archivoURL?: string; fechaCreacion?: Date; autor?: string }){
      try{
        // Obligar a llenar los campos escenciales
          if(material.titulo || material.descripcion){
             throw new ('El titulo y la descripcion del material son obligatorios');
          }

         const docRef = material.id ? doc(db,this.collectionName,material.id) : doc(collection(db,this.collectionName))
        const dataToSave = {
           titulo: material.titulo,
           descripcion_extract: material.descripcion,
           archivoURL: material.archivoURL || null,
           fechaCreacion: material.fechaCreacion || new Date(),
           autor: material.autor || null,
        }
          await setDoc(docRef,dataToSave,{ merge: true});
      }catch(error){
          console.error('[MaterialDeployService]: Error al guardar material', error);
          throw error;
      }
  
    }

    static async deleteMaterialsEduc(material: string ){
      try{
           await deleteDoc(doc(db,this.collectionName,id));
        }catch(error){
             console.error('[MaterialDeployService]: Error al borrar el material', error);
              throw error;
        }

    }

  }