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
            <div id="content"><?php
	    	echo "<h3>Tareas del gul.</h3>";	
		echo utf8_decode(file_get_contents("http://gul.uc3m.es/cgi-bin/bugs.cgi"));
		?>
            </div><!--End of "content"-->
        </div><!--End of "right"-->
        <div id="footer">
	    <? footer($home); ?>
        </div><!--End of "footer"-->
    </div><!--End of "page"-->
</body>
</html>

<?
        function showPerson($name)
	{
	        $basepath = "/var/www/www.gul.uc3m.es";

		// Load the XML source
		$xml = new DOMDocument;
		$xml->load("$basepath/people/$name/about.xml");
		
		$xsl = new DOMDocument;
		$xsl->load("$basepath/fichajes.xsl");
		
		// Configure the transformer
		$proc = new XSLTProcessor;
		$proc->importStyleSheet($xsl); // attach the xsl rules
		
		$html = $proc->transformToXML($xml);

// Obsoleto en PHP5: Modificado por Jesus Espino
//                $xsltproc = xslt_create();
//		xslt_set_encoding($xsltproc, 'ISO-8859-1');
////		xslt_setopt($xsltproc, XSLT_SABOPT_DISABLE_ADDING_META);
//		$html = xslt_process($xsltproc, 
//		  "$basepath/people/$name/about.xml", 
//  		  "$basepath/fichajes.xsl");
	
		// no se como quitar la cabecera XML
                $findecabecera = strpos($html, "?>");
		echo substr($html, $findecabecera+2);
	}
?>
