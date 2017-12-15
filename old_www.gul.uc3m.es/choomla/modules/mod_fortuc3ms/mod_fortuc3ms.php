<?php
/**
* @version      $Id: mod_random_image.php 9764 2007-12-30 07:48:11Z ircmaxell $
* @package      Joomla
* @copyright   Copyright (C) 2005 - 2008 Open Source Matters. All rights reserved.
* @license      GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

// Include the helper functions only once
require_once (dirname(__FILE__).DS.'helper.php');

$folder = modFortuc3msHelper::getFolder($params);
$files = modFortuc3msHelper::getFiles($folder);

if (!count($files)) {
   echo JText::_( 'No fortunes ');
   return;
}

$fortune = modFortuc3msHelper::getFortune($params, $files);
//$fortune = $files[0]->folder.DS.$files[0]->name;
require(JModuleHelper::getLayoutPath('mod_fortuc3ms'));

