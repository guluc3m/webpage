<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
$home = ".";
include("functions.php");
$noticia = $HTTP_GET_VARS['noticia'];
head($home, "GUL: $noticia");
?>
<body>
    <div id="page">
        <div id="header">
	    <? title($home); ?>
        </div><!--End of "header"-->
        <div id="left">
	        <? menu($home); ?>
        </div><!--End of "left"-->
        
        <div id="right">
            <div id="content"><?
		  setlocale(LC_ALL,'es_ES.ISO-8859-15@euro');
		  echo '<h3> Fichajes, guleros y dem&aacute;s especies </h3>';

		  echo '
		  <p>
		  Hay tantos socios en el GUL que hablar de todos ellos nos llevar&iacute;a
		  un buen ancho de banda. Aqu&iacute; tenemos una muestra representativa
		  de las personas que forman el motor de esta asociaci&oacute;n. Poco a 
		  poco se ir&aacute;n a&ntilde;adiendo m&aacute;s perfiles de otros guleros
		  que tambi&eacute;n tienen derecho a su minuto de gloria. Por ahora los valientes
		  que han querido dar la cara son:
		  </p>
	
		  <p> 
		  ';
		  
		  $dir = dir($home."/people/");

		  $beginning = true;

		  while($person = $dir->read())
		  {
			if (isAPerson($person))
			{
			  if (!($beginning))
				echo "<span style='color:#aaa'> | </span>";

			  echo " <a href=\"#$person\"><strong>$person</strong></a> ";
			  $beginning = false;
		    }
		  }
		
		  echo '</p>';

		  $dir->rewind();
		  while($person = $dir->read())
		  {
			if (isAPerson($person))
			{
				showPerson($person);
			}
		  }

		  /*
		  $new = fopen("$home/noticias/$noticia", 'r');
		  while (!feof($new)) {
		          $parrafo = fgets($new, 999);
		          echo '<p>'.$parrafo.'</p>';
		  }
		  fclose($new);
		  echo "<h5><a href=\"$home/index.php\">Volver</a></h5>";
		    #        }
		    #}
		    */
                    ?>
            </div><!--End of "content"-->
            <div id="publicidad">
	        <? publicidad($home); ?>
	    </div>
        </div><!--End of "right"-->
        <div id="footer">
	    <? footer($home); ?>
        </div><!--End of "footer"-->
    </div><!--End of "page"-->
</body>
</html>

<?
	function isAPerson($person)
	{
		return ($person != ".") && ($person != "..") && ($person != "__template__");
	}

    function showPerson($name)
	{
	    $basepath = "/var/www/nuevaweb";
        $xsltproc = xslt_create();
		xslt_set_encoding($xsltproc, 'ISO-8859-1');
//		xslt_setopt($xsltproc, XSLT_SABOPT_DISABLE_ADDING_META);
		$html = xslt_process($xsltproc, "$basepath/people/$name/about.xml", "$basepath/fichajes.xsl");
	
		echo "<a name=\"$name\"> </a>";
	
		// no se como quitar la cabecera XML
        $findecabecera = strpos($html, "?>");
		echo substr($html, $findecabecera+2);
	}
?>
