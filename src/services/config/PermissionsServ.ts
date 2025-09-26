   import {Permissions} from '@/types/interf.index.js';

 /*interface Permissions {
 	puedeSubirMaterialEducAlumno: boolean;
 	puedeVisualizarMaterialesAlumno: boolean;
 	puedeSubirMaterialesProffesor: boolean;
 	puedeAccederVistasAlumno: boolean;
 	puedeAccederVistasProffesor: boolean;
 	ViewSubirMaterialPDFAlumno: boolean;
 	ViewAdmMaterialesPDFsPorSession: boolean;
 	VistaBienvenidaProffesor: boolean;
 	VistaBienvenidaAlumno: boolean;
 }*/

   class PermissionsService {
   	   permisorPorRol: Record<Role, Permissions> = {
   	   	 alumno:{
     	   puedeSubirPdfAlumno: true,
        puedeVerArchivosAlumno: true,
        puedeSubirPdfProfesor: false,
        puedeVerArchivosProfesor: false,
        puedeAccederVistaAlumno: true,
        puedeAccederVistaProfesor: false,
        ViewSubirAportePDFAlumno: true,
        ViewVerSubidaAportesPDFporSesion: true,
        VieWelcomeProfesor: false,
   	   	 },

   	   	 professor:{
     	   	 	puedeSubirPdfAlumno: false,
         puedeVerArchivosAlumno: false,
         puedeSubirPdfProfesor: false,
         puedeVerArchivosProfesor: true,
         puedeAccederVistaAlumno: false,
         puedeAccederVistaProfesor: true,
         ViewSubirAportePDFAlumno: false,
         ViewVerSubidaAportesPDFporSesion: false,
         VieWelcomeProfesor: true,
   	   	 },

   	   	 default: {
   	   	 	puedeSubirPdfAlumno: false,
         puedeVerArchivosAlumno: false,
         puedeSubirPdfProfesor: false,
         puedeVerArchivosProfesor: false,
         puedeAccederVistaAlumno: false,
         puedeAccederVistaProfesor: false,
         ViewSubirAportePDFAlumno: false,
         ViewVerSubidaAportesPDFporSesion: false,
         VieWelcomeProfesor: false,
   	   	 }
   	   };

   	    constructor(private role:Role) {}

     	    getPermission(): Permissions{
     	   	  return this.getPermission()[permissionKey] || false;
     	     }

     	    hasPermission(permissionKey: keyOf Permissions): boolean {
     	   	   this.getPermission()[permissionKey] || false;
     	    }

     	    setRole(role: Role){
     	   	   this.role = role;
     	    }
   }