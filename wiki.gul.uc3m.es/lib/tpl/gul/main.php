<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
/**
 * DokuWiki Default Template
 *
 * This is the template you need to change for the overall look
 * of DokuWiki.
 *
 * You should leave the doctype at the very top - It should
 * always be the very first line of a document.
 *
 * @link   http://wiki.splitbrain.org/wiki:tpl:templates
 * @author Andreas Gohr <andi@splitbrain.org>
 */
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $conf['lang']?>"
 lang="<?php echo $conf['lang']?>" dir="<?php echo $lang['direction']?>">
<head>
  <title><?php echo $ID?> [<?php echo hsc($conf['title'])?>]</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

  <?php tpl_metaheaders()?>

  <link rel="shortcut icon" href="<?php echo DOKU_BASE?>lib/images/favicon.ico" />
  <link rel="stylesheet" media="screen" type="text/css" href="<?php echo DOKU_TPL?>layout.css" />
  <link rel="stylesheet" media="screen" type="text/css" href="<?php echo DOKU_TPL?>design.css" />

  <?php if($lang['direction'] == 'rtl') {?>
  <link rel="stylesheet" media="screen" type="text/css" href="<?php echo DOKU_TPL?>rtl.css" />
  <?php } ?>

  <link rel="stylesheet" media="print" type="text/css" href="<?php echo DOKU_TPL?>print.css" />

  <!--[if gte IE 5]>
  <style type="text/css">
    /* that IE 5+ conditional comment makes this only visible in IE 5+ */
    /* IE bugfix for transparent PNGs */
    //DISABLED   img { behavior: url("<?php echo DOKU_BASE?>lib/scripts/pngbehavior.htc"); }
  </style>
  <![endif]-->

  <?php /*old includehook*/ @include(dirname(__FILE__).'/meta.html')?>
  <script src="http://www.google-analytics.com/urchin.js" type="text/javascript">
  </script>
  <script type="text/javascript">
  _uacct = "UA-65510-1";
  urchinTracker();
  </script>
 <script type="text/javascript" src="banner.js">	</script>
</head>

<body onload="banner()" >
<?php /*old includehook*/ @include(dirname(__FILE__).'/topheader.html')?>
<div class="dokuwiki">
  <?php html_msgarea()?>

  <div class="stylehead">

    <div class="header">
      <div class="pagename">
        <a onclick="banner()" ><img height="60" src="lib/tpl/gul/images/logo.png" alt="GUL Logo"/></a>
      </div>
      <div class="pagename">
        <?php 
	  tpl_link(wl(),$conf['title'],'name="top" accesskey="h" title="[ALT+H]"');
	?>
      </div>
      <div class="pagename">
        <a id="banner"></a>
      </div>
      <div class="fortunecita">
        <?php 

	  /* Fortunes
	     Cuidadito con los divs, parece que estan mal pero no lo estan!!
	   */
        #  $cmd = "perl -e 'while(\$in=<STDIN>){\$out=\$in; \$out=~s/--/\\n        <div class=\"fortunefirma\">\\n--/ig; print \$out;}'";
	#  $salida = shell_exec("/usr/games/fortune informatica | $cmd");
	# echo "<p>$salida</p>";
	?>
        </div>
      </div> 
      
    </div>
  
    <?php /*old includehook*/ @include(dirname(__FILE__).'/header.html')?>

    <div class="bar" id="bar_top">
      <div class="bar-left" id="bar_topleft">
        <?php tpl_button('edit')?>
        <?php tpl_button('history')?>
        <?php tpl_button('login')?>
      </div>
  
      <div class="bar-right" id="bar_topright">
        <?php tpl_button('recent')?>
        <?php tpl_searchform()?>&nbsp;
      </div>
    </div>

    <?php if($conf['breadcrumbs']){?>
    <div class="breadcrumbs">
      <?php tpl_breadcrumbs()?>
      <?php //tpl_youarehere() //(some people prefer this)?>
    </div>
    <?php }?>

  </div>
  <?php flush()?>

  <?php /*old includehook*/ @include(dirname(__FILE__).'/pageheader.html')?>

  <div class="page">
    <!-- wikipage start -->
    <?php tpl_content()?>
    <!-- wikipage stop -->
  </div>

  <div class="clearer">&nbsp;</div>

  <?php flush()?>

  <div class="stylefoot">

    <div class="meta">
      <div class="user">
        <?php tpl_userinfo()?>
      </div>
      <div class="doc">
        <?php tpl_pageinfo()?>
      </div>
    </div>

   <?php /*old includehook*/ @include(dirname(__FILE__).'/pagefooter.html')?>

    <div class="bar" id="bar_bottom">
      <div class="bar-left" id="bar_bottomleft">
        <?php tpl_button('edit')?>
        <?php tpl_button('history')?>
      </div>
      <div class="bar-right" id="bar_bottomright">
        <?php tpl_button('admin')?>
        <?php tpl_button('login')?>
        <?php tpl_button('index')?>
        <?php tpl_button('top')?>&nbsp;
      </div>
    </div>

  </div>

<!--/div-->
<?php /*old includehook*/ @include(dirname(__FILE__).'/footer.html')?>
</body>
</html>
