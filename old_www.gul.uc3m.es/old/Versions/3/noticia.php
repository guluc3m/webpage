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
//		  setlocale(LC_ALL,'es_ES.ISO-8859-15@euro');
		  echo '<h3>'.$noticia.'</h3>';
		  echo '<h5>'.strftime('%a %e de %B de %Y %H:%M', filemtime("$home/noticias/$noticia")).'</h5>';
		# echo '<h5>'.date('j F Y H:i', filemtime("$home/noticias/$noticia")).'</h5>';
		  $new = fopen("$home/noticias/$noticia", 'r');
		  while (!feof($new)) {
		          //$parrafo = fgets($new, 999);
		          $parrafo = fgets($new, 1999);
		          echo '<p>'.$parrafo.'</p>';
		  }
		  fclose($new);
		  echo "<h5><a href=\"$home/index.php\">Volver</a></h5>";
		    #        }
		    #}
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
