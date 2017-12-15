<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml10-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<?
require_once("rss/magpierss/rss_fetch.inc");
$home = ".";
include("functions.php");
head($home, "GUL embedded planet");
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

		<p>
<?php 
	$url = "http://planeta.gul.es/rss20.xml";
        $rss = fetch_rss( $url );
        
	foreach ($rss->items as $item) 
	{
                $href = $item['link'];
                $title = iconv("iso-8859-1", "utf-8", $item['title']);
		$body = iconv("iso-8859-1", "utf-8", $item['description']);
		echo "
		<div class='planet-entry'>
                	<h2><a href=$href>$title</a></h2>
			$body
		</div>
		";
        }
?>

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

<?php

function readRSS($url)
{
}

?>
