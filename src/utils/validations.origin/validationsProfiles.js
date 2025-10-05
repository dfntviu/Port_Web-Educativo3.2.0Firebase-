export const validacionesPerfiles = {
     /**
     * @param {string} nombre
     * @returns {booleans}
     * @param
     * */
        isValidPassword(pass){
            if( typeof pass !== "string") return false;
            if( pass.trim().length <6) return false;
               const regex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
                 return regex.test(pass);
        }

         isMatchingPassword(oldPass, newPass){
            if(!isValidPassword(newPass)) return false;
              return oldPass !== newPass;
         }


         isvalidEmail(email){
            if (typeof email !== "string") return false;
               const regex = /^[^s\@]+@[^\s@]+\.[^\s@]+$/;
                 return regex.test(email.trim());
         }

   }