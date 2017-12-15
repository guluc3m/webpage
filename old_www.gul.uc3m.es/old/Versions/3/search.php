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

<!-- Google Search Result Snippet Begins -->
<div id="results_"></div>
<script type="text/javascript">
  var googleSearchIframeName = "results_";
  var googleSearchFormName = "searchbox_";
  var googleSearchFrameWidth = 600;
  var googleSearchFrameborder = 0;
  var googleSearchDomain = "www.google.com";
  var googleSearchPath = "/cse";
</script>
<script type="text/javascript" src="http://www.google.com/afsonline/show_afs_search.js"></script>
<!-- Google Search Result Snippet Ends -->

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
