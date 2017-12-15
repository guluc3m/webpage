<?php
/**
* @version      $Id: helper.php 10043 2008-02-16 21:50:49Z ian $
* @package      Joomla
* @copyright   Copyright (C) 2005 - 2008 Open Source Matters. All rights reserved.
* @license      GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );


class modFortuc3msHelper {

   /**
    *
    */
   function getFolder(&$params) {
      $folder = $params->get( 'folder' );

      $LiveSite = JURI::base();

      // if folder includes livesite info, remove
      if ( JString::strpos($folder, $LiveSite) === 0 ) {
         $folder = str_replace( $LiveSite, '', $folder );
      }
      // if folder includes absolute path, remove
      if ( JString::strpos($folder, JPATH_SITE) === 0 ) {
         $folder= str_replace( JPATH_BASE, '', $folder );
      }
      $folder = str_replace('\\',DS,$folder);
      $folder = str_replace('/',DS,$folder);

      return $folder;
   }

   /**
    *
    */
   function getFiles($folder) {
      $all_files = array();
      $fortune_files = array();

      $dir = JPATH_BASE.DS.$folder;

      // check if directory exists
      if (is_dir($dir)) {
         if ($handle = opendir($dir)) {
            while (false !== ($file = readdir($handle))) {
               if ($file != '.' && $file != '..' && $file != 'CVS' && $file != 'index.html') {
                  $all_files[] = $file;
               }
            }
         }
         closedir($handle);

         $i = 0;
	 // TODO pillar el parametro types
	 // y formar una expresion regular con
	 // las posibles extensiones
         foreach ($all_files as $file) {
            if (!is_dir($dir .DS. $file)) {
               //if (eregi($types, $img)) {
                  $fortune_files[$i]->name = $file;
                  $fortune_files[$i]->folder = $folder;
                  ++$i;
               //}
            }
         }
      }

      return $fortune_files;
   }

   /**
    * Basado en el codigo antiguo para pillar fortunes.
    * Asume que las fortunes estan en un solo archivo.
    */
   function getFortune($params, $files) {
      $i = rand(0, count($files) - 1);
      $file = $files[$i];
      $fd = fopen(JPATH_BASE.DS.$file->folder.DS.$file->name, 'r');

      if(!$fd)
         return "Eres un manta"; 
      
      $fortunes = array();
      /* TODO arreglar esto para que pille el separador de las propieades.
       * Ya de paso se podria hacer que manejase varios separadore distintos.
       * Por pedir que no quede.
       */
      $sep = 555555;
      //$sep = $params->get( 'separator');
      //echo gettype($sep)." $sep <br />";
      $i = 0;
      do {
	 $fortune = "";
         $linea = "";
         
         while ( $linea != $sep){
	    // TODO arregla esto. En teoria no deberia
	    // hacer falta, pero son las 4:49 AM y no veo
	    // porque no tira.
            if(feof($fd)) break;

            //$linea = fgets($fd ,999);
            $linea = fgets($fd);
            if (($linea != $sep)){
               if ($fortune == "") {
                  $fortune = $linea;
               } else {
                  $fortune = $fortune."<br />".$linea;
               }
            }
         }

         $i++;
	 $fortunes[] = $fortune;
	 //if( $i > 50) break;
      } while(!feof($fd));

      fclose($fd);
      
      $num = rand(0, $i - 1);
      return $fortunes[$num];
   }
}

