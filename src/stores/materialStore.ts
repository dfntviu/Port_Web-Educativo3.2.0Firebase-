 import defineStore from '´pinia';
 import MaterialDeployService from '@/services/MaterialServ.js' ;
  import type {Material} from '@/types';
        // Darle una pasada al DeployService y la vista  viewMaterials_MatStore -> viewMethodsMaterials, abrir vista en siguiente de unitled
    const useMaterialStore = defineStore('material', {
   	    state: () => ({
   	   	 materials: [] as Material[],
   	   	 loading: false,
         error: "",
   	   	 errorHistory: [] as string, // 📌historial de errores
   	   	 id: "" as string | null,
   	   	});

   	    actions: {
          /** ----------------
           * SETTERS
           * ----------------*/
            setError(msg: string){
              this.error = msg;

              // 📌Traza de errores en Consola
               console.error("[MaterialStore] Error: ", msg);

               this.errorHistory.push(
                  `${new Date().toISOString() - ${msg}}`
               );
            },

            cleanError(){
              this.error = "";
            },

            clearMaterials(){
              this.materials = [];
            },

            setMaterials(list: Material[]){
               this.materials = [];
            },

            setId(id: string | null){
               this.id = id;
            },
             /* ----------------
             *   ACTIONS
            * ---------------- */
       	   	async fetchMaterials{
       	   	 	this.loading = true;
              this.cleanError();
       	   	 	   try{
                    this.setMaterials(
                         await MaterialDeployService.getAllMaterialsEduc()
                    );
       	   	 	   }catch(err: any){
       	   	 	   	  this.error = err.message;
       	   	 	   }finally{
       	   	 	   	 this.loading = false;
       	   	 	   }
       	   	},
       	   	async guardarMateriales(material: Material) {
       	   	 	this.loading = true;
              this.cleanError();
       	   	 	  try{
       	   	 	  	 await MaterialDeployService.saveMaterialsEduc(material);
                    // 🔄 Actualizar lista después de guardar
                   this.setMaterials(
                       await MaterialDeployService.getAllMaterialsEduc()
                   );

       	   	 	  }catch(err: any){
       	   	 	  	  this.setError(err.message)
       	   	 	  }finally{
       	   	 	   	 this.loading = false;
       	   	 	  }
       	   	},
       	   	async obtenerMaterialPorId(id: string) {
                this.loading = true;
                this.cleanError();
       	   	 	  try{
       	   	 	  	 const material = await MaterialDeployService.getMaterialsEducById(id);
                   console.log(`[Estado-Material] cargado por UUID: ${id}`, material);
                     return material;
       	   	 	  }catch(err: any){
                  this.setError(err.message);
       	   	 	  }finally{
                   this.loading = false;
                }
       	   	},

    	   	async eliminarLosMateriales(id: string) {
              this.loading = true;
              this.cleanError();
    	   	 	  try{
    	   	 	  	 await MaterialDeployService.deleteMaterialsEduc(id);
                    console.log(`El Material con UUID: ${id} fue eliminado correctamente`);

                    // actualizar la lista después de eliminar 
                     this.setMaterials(
                        await MaterialDeployService.getAllMaterialsEduc()
                     );
    	   	 	  }catch(err: any){
                this.cleanError();
    	   	 	  }finally{
                 this.loading = false;
              }
    	   	}
   	    },

        getters:{
          hasError: (state) => state.error !== "",
          materialCount: (state) => state.materials.length,
          materialById: (state) => {
             return (id: string) => 
                state.materials.find((m)=> m.id === id ) || null;
          },
        }
    });