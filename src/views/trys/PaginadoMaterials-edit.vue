<script>
     import {MaterialDeployService} from '@/services/MaterialAdmServAlumno.ts';

    /*Revisar la logica de firebase con prototypeFirebase*/
    const   currentPage = ref(0);
    const   allItems = ref([0]);
    const   pageSize = 20;
    const nextPageToken = ref(false);

     // -> [trasladado 29/09/25]
    async function siguientePagina(next = true){
        if (next) {
          if ((currentPage+1)* pageSize < allItems.value.length){
             currentPage.value++;
          }else{
              if (currentPage.value>0) {  //13 -12 //12 11 //9 -8
                currentPage.value--;
              }
          }
        }
         return {next,currentPage,pageSize}
    }

    async function cargarMaterialesPaginados(){
        try{
           const materiales = MaterialDeployService.getAllMaterialsEduc();
            allItems.value = materiales; 
            nextPageToken.value = materiales.length > pageSize;
        }catch(error){
            console.error(error);
        }
        return {materiales,allItems,nextPageToken}
    }
</script>