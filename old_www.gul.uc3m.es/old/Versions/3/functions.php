<?
function head($home,$title){?>
<head>
    <meta http-equiv="Content-Type" content="text/xhtml; charset=utf-8" />
    <meta name="author" content="Grupo de Usuarios de Linux, Univ. Carlos III de Madrid" />
    <meta name="publisher" content="Grupo de Usuarios de Linux, Univ. Carlos III de Madrid" />
    <link rel="stylesheet" type="text/css" href="style.css" media="screen,projection" />
    <link rel="shortcut icon" href="img/logo-gul.png" />
    <title><? echo $title ?></title>
</head>
<?}
function menu($home){?>
    <ul id="menu">
		<li class="menutitle"> Asociación </li>
		<li class="normallink"><a href="index.php">Inicio</a></li>
		<li class="normallink"><a href="<? echo "$home/actividades.php"; ?>">Actividades</a></li>
		<li class="normallink"><a href="http://wiki.gul.es/doku.php?id=wiki:documentacion">Documentación</a></li>
		<li class="normallink"><a href="<? echo "$home/elGul.php"; ?>">El Gul</a></li>
		<li class="normallink"><a href="<? echo "$home/servicios.php"; ?>">Servicios</a></li>
		<li class="normallink"><a href="http://tracs.gul.es">Proyectos</a></li>
		<li class="bottomlink"><a href="http://wiki.gul.es">Wiki</a></li>
    </ul>
    <ul id="menu">
		<li class="menutitle"> Miembros </li>
		<li class="normallink"><a href="encuentros.php">Encuentros</a></li>
        <li class="normallink"><a href="fichajes.php">Fichajes</a></li>
       	<li class="bottomlink"><a href="http://planeta.gul.es">Planeta</a></li>
    </ul>

<?php 
// voiser: dejo esto para que podamos reutilizarlo en el futuro. Lo comento en PHP para que no aparezca en el HTML
/*
	<a href="http://cursos.gul.es/courses/view/6">
		<img alt="" src="/img/marzo08s.png" style="margin-left:-6px;margin-top:15px" width="160" border="0"/>
	</a>

*/
?>
	<br />
	<a href="http://www.mozilla-europe.org/es/">
		<img alt="Usa firefox!" src="http://www.difundefirefox.com/files/banners/otros-ff4.png" border="0"/>	
	</a>
<?}

function publicidad($home){?>
<div id="rightmenu">
    <div class="menutitle">Patrocinadores</div>
    <div id="banners">
    	<p> <a href="http://www.uc3m.es"><img src="/img/c3mlogo.gif" alt="uc3m.es" style="width:50px" /></a> </p>
	<p> <a href="http://www.55thinking.com"><img src="<? echo "$home/img/banner1.png" ?>" alt="55thinking.com" /></a> </p>
	<p> <a href="http://www.salenda.es"><img src="<? echo "$home/img/banner2.png" ?>" alt="salenda.es"  /></a> </p>
	<p> <a href="/patrocinadores.php"><img src="<? echo "$home/img/hakin9_logo.png" ?>" alt="hackin9"  style="margin-top:5px"/></a> </p>
	<p> <a href="/patrocinadores.php"><img src="<? echo "$home/img/lp.png" ?>" alt="linux+"  /></a> </p>
    </div>
    <h4 class="patrocinadoresabajo">&nbsp;</h4>
    <br />
    <div class="menutitle">Amigos</div>
    <div id="banners">
	<p> <a href="http://www.esp.uem.es/jornadas08"> <img src="<? echo "$home/img/gulem.png" ?>" alt="GULEM"  /></a> </p>
	<!--p> <a href="http://www.esp.uem.es/jcl08/"> <img src="<? echo "$home/img/gulem.png" ?>" alt="GULEM"  /></a> </p-->
	<p> <a href="http://softwarelibre.deusto.es/conferencias-en-la-semana-eside/"><img src="<? echo "$home/img/eside.png" ?>" alt="e-ghost"  /></a> </p>
	<p> <a href="http://www.debian.com"><img src="<? echo "$home/img/debian.png" ?>" alt="debian.com"  /></a> </p>
	<p> <a href="http://www.gentoo.org"><img src="<? echo "$home/img/gentoo.png" ?>" alt="gentoo.org"  /></a> </p>
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
	    <div id="search">

<!-- Google CSE Search Box Begins  -->
<form action="search.php" id="searchbox">
  Buscar:
  <input type="hidden" name="cx" value="006349228144114008603:wggzv1pflom" />
  <input type="hidden" name="cof" value="FORID:11" />
  <input type="text" name="q" size="20" />
  <input type="submit" name="sa" value="Search" style='display:none' />
</form>
<!-- Google CSE Search Box Ends -->
	    
	    </div>

	    <div id="headright">
	        <?
		    $num = rand(1,171);
		    $fortunes = fopen("$home/fortunes.utf8",'r');
		    for ($i=1 ; $i<$num+1 ; $i++){
		    	$fortune=555555;
		    	$linea = "";
		    	while ( $linea != 555555 ){
		    		$linea = fgets($fortunes,999);
		    		if ( ($linea != 555555) ){
		    			if ($fortune == 555555) {
						$fortune=$linea;
					} else {
						$fortune = $fortune."<br />".$linea;
					}
		    		}
		    	}
		    }
		    fclose($fortunes);
		    echo $fortune.'<br />';
		?>
	    </div>
	</div>
<!--
	<div style="background:#faa;border:1px solid #f00;text-align:center;padding:1em"> 
		Estamos de reformas, si algo no funciona bien vuelve en unos minutos 
	</div>
-->
<?}
function footer($home){?>
	Grupo de Usuarios de Linux - Universidad Carlos III de Madrid
<?}
