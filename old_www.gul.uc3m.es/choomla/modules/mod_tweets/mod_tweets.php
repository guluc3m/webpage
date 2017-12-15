<?php defined( '_JEXEC' ) or die( 'Restricted access' );

require_once( dirname( __FILE__ ) . DS . 'helper.php' );

$twitter =& new modTweetsHelper( $params );

require( JModuleHelper::getLayoutPath( 'mod_tweets', $twitter->layout ) );
?>