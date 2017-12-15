<?php
/**
 * Twitter Module Entry Point
 * 
 * @version    1.0
 * @package    Twitter
 * @copyright  © Benjamin Hiller, 2007
 * @link http://code.google.com/p/google-highly-open-participation-joomla/issues/detail?id=139
 * @license        GNU/GPL
 * mod_twitter is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

defined('_JEXEC') or die('Restricted access');
require_once( dirname(__FILE__).DS.'helper.php');


$latesttweets = modTwitter::getLatestTweets($params);
require(JModuleHelper::getLayoutPath('mod_twitter'));
