<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
$home = ".";
include("functions.php");
head($home,"GUL: Inicio");
?>
<body>
    <div id="page">
        <? title($home); ?>

        <div id="left">
	        <? menu($home);
		   publicidad($home);
		?>
        </div><!--End of "left"-->
        
        <div id="right">
            <div id="content">
	    <h3>Bienvenidos al sitio web del GUL</h3>
	    <?
	    $directory = dir("img/portada/");
	    $numPhoto = 0;
	    while ($photo = $directory->read()){
	    	$numPhoto = $numPhoto + 1;
	    }
		$numPhoto = $numPhoto - 2;
		$directory->rewind();
		$photo1 = $photo2 = $photo3 = 0;
		while ( ($photo1 == $photo2) || ($photo1 == $photo3) || ($photo2 == $photo3) ) {
			$photo1 = rand(1,$numPhoto);
			$photo2 = rand(1,$numPhoto);
			$photo3 = rand(1,$numPhoto);
		}
		while ($photo = $directory->read()){
			if ($photo == ($photo1)){ $photo1 = $photo; }
			if ($photo == ($photo2)){ $photo2 = $photo; }
			if ($photo == ($photo3)){ $photo3 = $photo; }
		}
		$directory->rewind();
		$directory->close();
	    ?>
	    <img src="<? echo "$home/img/portada/$photo1" ?>" alt="<? echo $photo1 ?>" width="210px" />
	    <img src="<? echo "$home/img/portada/$photo2" ?>" alt="<? echo $photo2 ?>" width="210px" />
	    <img src="<? echo "$home/img/portada/$photo3" ?>" alt="<? echo $photo3 ?>" width="210px" />
	    <p>GUL significa Grupo de Usuarios de Linux, pero es mucho más. Es un punto de encuentro de gente con inquietudes, con ganas de cacharrear y aprender.</p>
	    <p>Nuestro principal punto de unión es que nos gusta el software libre y tratamos de promocionarlo, mediante cursos y ayudando cuanto podemos a la gente que empieza.</p>
	    <p>Si te apetece conocernos un poco más <a href="http://gul.uc3m.es/mailman/listinfo/gul/">puedes apuntarte a nuestra lista de correo</a>, <a href="http://foro.gul.es">entrar en nuestro foro</a> o venir a cualquiera de nuestras actividades o encuentros.  Siempre nos gusta ver caras nuevas.</p>
	    <h3>Anuncios</h3>
                    <?
		    $news = opendir("$home/noticias/");
		    # Ordenar sus fechas.
		    $i=1;
		    while ($archivo = readdir($news)){
		        if(($archivo != ".") && ($archivo != "..")){
			    $fechas[$i]=date('YmdHis', filemtime("$home/noticias/$archivo"));
			    $noticia[$i]=$archivo;
			    $i++;
			}
		    }

		    $numNoticias = $i-1;
		    if ($numNoticias >= 3){$numNoticias = 3;}
			    
		    for($i=1 ; $i<$numNoticias ; $i++){
			    for($j=1; $j<3; $j++){
				    if($fechas[$j]<$fechas[$j+1]){
					    $aux=$fechas[$j];
					    $fechas[$j]=$fechas[$j+1];
					    $fechas[$j+1]=$aux;
					    $aux=$noticia[$j];
					    $noticia[$j]=$noticia[$j+1];
					    $noticia[$j+1]=$aux;
				    }
			    }
		    }
		    for ($i=1 ; $i<=$numNoticias ; $i++){
		        	echo "<h4>".$noticia[$i].'</h4>';
		                setlocale(LC_ALL,'es_ES.ISO-8859-15@euro');
		        	echo '<h6>'.strftime('%a %e de %B de %Y %H:%M', filemtime("$home/noticias/$noticia[$i]")).'</h6>';
		        #	echo '<h5>'.date('j F Y H:i', filemtime("$home/noticias/$noticia[$i]")).'</h5>';
		                $new = fopen("$home/noticias/$noticia[$i]", 'r');
		                $parrafo = fgets($new, 999);
		                echo '<p>'.htmlentities($parrafo).'</p>';
		        	echo "<h5><a href=\"$home/noticia.php?noticia=$noticia[$i]\">Leer mas</a></h5>";
		                fclose($new);
		    }
		    #        }
		    #}
		    closedir($news);
                    ?>
            </div><!--End of "content"-->
        </div><!--End of "right"-->

    <div id="footer">
	<? footer($home); ?>
    </div><!--End of "footer"-->

</body>
</html>
