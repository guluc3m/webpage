<?php
/**
* @version $Id: mod_en_iclude.php,v 1.00 2006/01/11 10:05:00 jgobiz Exp $
* @package Mambo_4.5.1
* @copyright (C) 2006 Joern Gerken
* @email joern@gerken.de
* @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
* Official website: http://www.successwiki.com/
* Joomla! is Free Software
*/

/** ensure this file is being included by a parent file */
defined( '_VALID_MOS' ) or die( 'Direct Access to this location is not allowed.' );

$params->def( 'moduleclass_sfx_ic', '' );
$params->def( 'switch_ic', '' );
$params->def( 'pfad_ic', '' );
$params->def( 'pfad_iframeic', '' );
$params->def( 'width', '');
$params->def( 'height', '');
$params->def( 'scrolling', '');

$switch_ic = $params->get( 'switch_ic' );
switch ($switch_ic):

case 1:
?>
<!-- OUTPUT -->
<div class="<?php echo $params->get( 'moduleclass_sfx_ic' ); ?>">
<?php
$pfad_ic = $params->get('pfad_ic');
@include_once ($pfad_ic);
?>	
</div>
<?php
   break;

case 2:
?>
<!-- OUTPUT -->
<div width="100%" align="center">
	<iframe
	width="<?php echo $params->get( 'width' ); ?>"
	height="<?php echo $params->get( 'height' ); ?>"
	marginheight="0"
	marginwidth="0"
	frameborder="0"
	scrolling="<?php echo $params->get( 'scrolling' ); ?>" 
	src="<?php echo $params->get( 'pfad_iframeic' ); ?>">
	</iframe>
</div>
<?php
   break;

default:
?>
<!-- OUTPUT -->
<div width="100%" align="center">
	<iframe
	width="<?php echo $params->get( 'width' ); ?>"
	height="<?php echo $params->get( 'height' ); ?>"
	marginheight="0"
	marginwidth="0"
	frameborder="0"
	scrolling="<?php echo $params->get( 'scrolling' ); ?>" 
	src="<?php echo $params->get( 'pfad_iframeic' ); ?>">
	</iframe>
</div>
<?php
endswitch;
?>