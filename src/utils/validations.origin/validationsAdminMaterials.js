/**
 * @file validationsMaterials.ts
 * @description Validaciones necesaria para la administracion de materiales en la aplicacion
 * */
  export const materialAdmValidations = {

        /**
          * Valida que el titulo del material no este vac├¡o y tenga longitud m├¡nima
          * @param {string} titulo - Titulo del material no este vac├¡o y tenga longitud m├¡nima.
          * @returns {boolean} True si es valido, false si no.
        */
        validarTitulo(titulo){
                if (!titulo) {return false;}
                 return titulo.trim().length >= 3;
        },
                /**
                        * Valida que la descripcion del material no est├® vac├¡a y tenga longitud m├¡nima
                        * @param {string} descripcion - Descripcion del material.
                        * @returns {boolean} True si es valida, false si no lo es.
                 */
        validarDescripcion(descripcion){
                if (descripcion) return false;
                  return descripcion.trim().length >= 10;
        },
            /**
                        * Valida que la URL del material sea v├ílido (https/http)
                        *  * @param {string} url - URL del material.
                        * @returns {boolean} True si es v├ílido, falso si no lo es.
                 */
        validarURL(url){
                try{
                        const pattern  = '/^htttps?:/\/\[^\s$.?#].[^\s]*$/gm';
                          return pattern.test(url);
                }catch{
                        return false;
                }
        },
                /**
                        * Valida que la fecha de creacion sea una instancia de Date Valida
                        * @param {string} url - Fecha a validar.
                        * @returns {boolean} True si la fecha es  v├ílida, falso si no lo es.
                 */
                validarFecha(fecha){
                                 return fecha instanceOf Date && !isNaN(fecha.getTime());
                }
            /**
                        * Valida que la Fecha de creacion sea una instancia de Date v├ílida
                        * @param {any} url - fecha a validar.
                        * @returns {boolean} True si es una fecha v├ílida, falso si no.
                 */
        validarEstado(estado){
                 const estados_validos = ["aprobado", "rechazado", "pendiente"];
                  return estados_validos.includes(estado);
        }


            /**
                * Valida un Objeto  completo de material previo de env├¡arlo a la Firestore
                * @param {Object} material - Objeto el material.
                * @param {string} material.titulo - T├¡tulo del material
                * @param {string} material.url - URL del material
                * @param {Date} material creado por(Created At) - Fecha de creaci├│n
                * @param {String} material.estado - Estado del material.
                * @param {boolean} True si todos los campos son v├ílidos, falso si no.
                * @returns {boolean} True si todos los campos son validos, falso si no.
                *
            */
            validarMaterial(material: { titulo, descripcion, url, createAt, estado }      )
            {
                   return(
                          validarTitulo(material.titulo) &&
                          validarDescripcion(material.descripcion) &&
                          validarURL(material.url); &&
                          validarFecha(material.createAt) &&
                          validarEstado(material.estado) &&

                        );
            }
           // --> Dirigirse a la Vista (contenida en el script 'LoginView')
    };  // Solo exportarla, cuando este ajustada