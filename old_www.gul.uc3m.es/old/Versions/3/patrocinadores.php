<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
$home = ".";
include("functions.php");
head($home, "GUL: Encuentros");
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
	    <h3>Patrocinadores</h3>
	
		<h3> hackin9 </h3>
	    <p>
			<strong>hackin9, ¿cómo defenderse? </strong> es una revista de seguridad que se publica en siete versiones lingüísticas: española, francesa, italiana, inglesa, alemana, checa y polaca.
		</p>
			
		<p>
			<strong>hakin9</strong> trata de cuestiones relacionadas con la seguridad de los sistemas informáticos: tanto desde el punto de vista de la persona que rompe la seguridad, como desde el punto de vista de la persona que la asegura. Aconsejamos cómo eficazmente proteger el sistema ante los crackers, gusanos y cualquier otra amenaza. Enseñamos a los Lectores los secretos de las aplicaciones antivirus más populares, de los sistemas de detección de las fracturas, de las herramientas indispensables para los administradores.
		</p>
		<p>
			<strong>hakin9</strong> la leen las personas responsables de la seguridad de los sistemas informáticos, programadores, especialistas de la seguridad de ordenadores, administradores profesionales y otros aficionados a la seguridad informática.
		</p>
		
		<p>
			<a href="http://hakin9.org"> Ir a la web de <strong>hakin9</strong> </a>
		</p>

        <h3> LiNUX+ DVD </h3>

		<p>
		<strong>LiNUX+ DVD</strong> es una revista sobre Linux y Software Libre que se publica en España e Hispanoamérica, Polonia, Francia, República Checa y Estados Unidos.
		</p>
		<p>
		<strong>LiNUX+ DVD</strong> se dirige a profesionales IT, ingenieros y personas que buscan una alternativa para MS Windows. Los lectores de LiNUX+ DVD se interesan por las novedades del Mundo Linux. De gran interés son también para ellos las secciones fijas de nuestra revista, tales como: Linux en la empresa, Seguridad, Para Principiantes, Programación, Gráfica, Internet y Hardware.
		Cada número es una útil fuente de información sobre el uso habitual de Linux y proporciona noticias más recientes del mundo de software libre.
		</p>

		<p>
			<a href="http://lpmagazine.org"> Ir a la web de <strong>LiNUX+ DVD</strong> </a>
		</p>


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
