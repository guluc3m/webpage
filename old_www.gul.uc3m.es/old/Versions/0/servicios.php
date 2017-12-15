<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
$home = ".";
include("functions.php");
head($home,"GUL: Servicios");
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
            <div id="content">
                <h3>Lista de Correo</h3>
		<p>En nuestra lista de correo se resuelven dudas sobre Linux y cosas por el estilo, se habla de temas relacionados con el software libre y con el GUL, adem&aacute;s de cualquier tema que se considere interesante.</p>
		<p><a href="http://gul.uc3m.es/mailman/listinfo/gul/">Pulsa aquí para acceder</a></p>
                <h3>Foro</h3>
		<p>Como hay gente a la que no le gusta las listas de correo hemos puesto una interfaz foro que está sincronizada con la lista de correo. Puedes usar la interfaz que quieras, cualquier mensaje llega a ambos sitios.</p>
		<p><a href="http://foro.gul.es">Pulsa aqu&iacute; para acceder</a></p>
		<p>Si ya eras un usuario de la lista de correo, te interesará leer <a href="foro.php">esto</a></p>
                <h3>FTP</h3>
		<p>Nuestro servidor de ficheros FTP contiene un mirror completo de Debian, toda la documentaci&oacute;n que generamos y alguna que otra cosa m&aacute;s.</p>
		<p><a href="http://ftp.gul.uc3m.es">Pulsa aquí para acceder</a></p>
                <h3>Planeta GUL</h3>
		<p>Es un planeta de blogs, donde se recogen mensajes de las bitácoras de aquellos miembros del GUL que han decidido participar.</p>
		<p><a href="http://planeta.gul.es">Pulsa aqu&iacute; para acceder</a></p>
		<h3>Tracs</h3>
		<p>Tenemos montado un servidor de proyectos para albergar el desarrollo de los proyectos de software libre que quieras publicar. El gestor de proyectos es un sistema de tickets con gestor de versiones incluido y se puede crear una lista de correo al efecto. Entre estos proyecto est&aacute; el de la propia asoaci&oacute;n.</p>
		<p>Puedes verlo en <a href="http://tracs.gul.es">tracs.gul.es</a>.</p>
		<h3>gentoo-es.org</h3>
		<p>Una de nuestras m&aacute;quinas aloja a los chicos de gentoo-es</p>
		<p><a href="http://gentoo-es.org"><img src="http://www.gentoo-es.org/themes/gentoo-es/logo.png" alt="logo de Gentoo" /></a></p>
		<h3>Retrolinux</h3>
		<p>El proyecto retrolinux est&aacute; basado en recopilar distribuciones antiguas de sistemas operativos</p>
		<p><a href="http://retrolinux.gul.es">Pulsa aqu&iacute; para acceder</a></p>
		</div><!--End of "content"-->
        </div><!--End of "right"-->
        <div id="footer">
	    <? footer($home); ?>
        </div><!--End of "footer"-->
    </div><!--End of "page"-->
</body>
</html>
