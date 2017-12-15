<?php
/**
 * Helper class for Twitter module
 * 
 * @version 1.0
 * @package Twitter
 * @copyright  © Benjamin Hiller, 2007
 * @link http://code.google.com/p/google-highly-open-participation-joomla/issues/detail?id=139
 * @license        GNU/GPL
 * mod_twitter is free software. This version may have been modified pursuant
 * to the GNU General Public License, and as distributed it includes or
 * is derivative of works licensed under the GNU General Public License or
 * other free or open source software licenses.
 */

// no direct access
defined('_JEXEC') or die('Restricted access');

require_once (JPATH_SITE.DS.'components'.DS.'com_content'.DS.'helpers'.DS.'route.php');

class modTwitter
{			
	//This function returns each twitter message and the date it was 
	function getLatestTweets(&$params)
    {
		$current = "";
		$displayed = 0;
		function  start_tag($parser, $name){
		    global $current, $displayed, $posts;
			$current = $name;
			if($name == "TEXT" && $displayed < $posts) echo "<li>"; 
		}

		function end_tag($parser, $name){
			global $current, $displayed, $posts;
		    if($current == "TEXT" && $displayed < $posts) {
				echo "</li>";
				$displayed++;
			}
		}

		function contents($parser, $data){
			global $current, $displayed, $posts;
			if ($current == "TEXT" && $displayed < $posts) echo $data;
		}
		
		global $posts;
		$posts = (int)($params->get('posts'));
		$username = $params->get('username');
		$parser = xml_parser_create();
		xml_set_element_handler($parser, "start_tag", "end_tag");
		xml_set_character_data_handler($parser, "contents");
		$url = 'http://twitter.com/statuses/user_timeline/' . $username . '.xml';
		$fp = fopen($url, "r");
		echo "<ul>";
		while ($data = fread($fp, 4096)){ 		  
			$data=eregi_replace(">"."[[:space:]]+"."< ",">< ",$data);
			if (!xml_parse($parser, $data, feof($fp))) {
		    	$reason = xml_error_string(xml_get_error_code($parser));
		        $reason .= xml_get_current_line_number($parser);
		        die($reason);
		    }
		}
		echo "</ul>";
		xml_parser_free($parser);
	}
	

}