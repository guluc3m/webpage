<?
function head($home,$title){?>
<head>
    <meta http-equiv="Content-Type" content="text/xhtml; charset=iso-8859-15" />
    <meta name="author" content="Grupo de Usuarios de Linux, Univ. Carlos III de Madrid" />
    <meta name="publisher" content="Grupo de Usuarios de Linux, Univ. Carlos III de Madrid" />
    <link rel="stylesheet" type="text/css" href="style.css" media="screen,projection" />
    <link rel="shortcut icon" href="img/logo-gul.png" />
    <title><? echo $title ?></title>
</head>
<?}
function menu($home){?>
    <ul id="menu">
	<li class="toplink"><a href="encuentros.php">Encuentros</a></li>
        <li class="normallink"><a href="fichajes.php">Fichajes</a></li>
        <li class="bottomlink"><a href="http://planeta.gul.es">Planeta</a></li>
    </ul>
<?}
function publicidad($home){?>
    <div id="menu">
    <h4 class="patrocinadoresarriba">Patrocinadores</h4>
    <div id="banners">
        <a href="http://www.55thinking.com"><img src="<? echo "$home/img/banner1.png" ?>" alt="55thinking.com" /></a>
        <a href="http://www.salenda.es"><img src="<? echo "$home/img/banner2.png" ?>" alt="salenda.es"  /></a>
    </div>
    <h4 class="patrocinadoresabajo">&nbsp;</h4>
    </div>
<?}
function title($home){?>
        <div id="header">
	    <div id="headleft">
    		<a href="<? echo "$home/index.php"; ?>"><img src="<? echo "img/logo-gul.png" ?>" width="75" height="75" class="left" alt="Logo GUL" /></a>
    		<h1>GUL-UC3M</h1>
	    </div>
	    <div id="headright">
	        <?
		    $num = rand(1,171);
		    // patched by voiser
		    //$fortunes = fopen("$home/fortunes.php",'r');
		    $fortunes = fopen("$home/fortunes-latin-1.php",'r');
		    for ($i=1 ; $i<$num+1 ; $i++){
		    	$fortune=555555;
		    	$linea = "";
		    	while ( $linea != 555555 ){
		    		$linea = fgets($fortunes,999);
		    		if ( ($linea != 555555) ){
		    			if ($fortune == 555555){$fortune=$linea;}
		    			else {$fortune = $fortune."<br />".$linea;}
		    		}
		    	}
		    }
		    fclose($fortunes);
		    echo $fortune.'<br />';
		?>
	    </div>
	    <div id="topmenu">
	        <? $ancho = 840/5; ?>
		<table>
		    <td width="<? echo $ancho ?>px"><h2><a href="<? echo "$home/actividades.php"; ?>">Actividades</a></h2></td>
		    <td width="<? echo $ancho ?>px"><h2><a href="http://wiki.gul.es/doku.php?id=wiki:documentacion">Documentacion</a></h2></td>
		    <td width="<? echo $ancho ?>px"><h2><a href="<? echo "$home/elGul.php"; ?>">El Gul</a></h2></td>
		    <td width="<? echo $ancho ?>px"><h2><a href="<? echo "$home/servicios.php"; ?>">Servicios</a></h2></td>
		    <td width="<? echo $ancho ?>px"><h2><a href="http://wiki.gul.es">Wiki</a></h2></td>
		</table>
	    </div>
	</div>
<?}
function footer($home){?>
	Grupo de Usuarios de Linux - Universidad Carlos III de Madrid
<?}
