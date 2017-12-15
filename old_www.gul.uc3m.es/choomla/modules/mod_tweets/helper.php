<?php
defined( '_JEXEC' ) or die( 'Restricted access' );

class modTweetsHelper {
	
	var $tweets = '';
	
	var $format = false;
	
	var $layout = 'default';
	
	var $errormessage = '';
	
	/**
	* The class constructor
	* 
	* The Tweets module Helper constructor
	* 
	* @access public
	* @param object $params The Joomla! parameter object
	* @return object The ModTweetsHelper object
	*/
	function modTweetsHelper( $params ) {
		
		if( $this->_checkCompatibility() ) {
			
			$this->format = $this->_checkFormat();
			
			if( $this->format ) {
			
				if( $params->get( 'enable-cache' ) === '1' ) {
				
					$cache =& JFactory::getCache();
				
					$cache->setCaching( true );
					$cache->setLifeTime( $params->get( 'cache-time', 30 ) * 60 );
				
					$this->tweets = $cache->get( array( $this, 'getTweets' ), array( $params ) );
				
				} else {
				
					$this->tweets = $this->getTweets( $params );
				
				}
				
				if( !$this->tweets ) {
					
					$this->layout = 'error';
					
				}
				
			} else {
				
				$this->layout = 'error';
				
				$this->errormessage = JText::_( 'ERROR_XML_JSON' );
				
			}
			
		} else {
			
			$this->layout = 'error';
			
			$this->errormessage = JText::_( 'ERROR_PHP_VERSION' );
			
		}
		
		return $this;
		
	}
	
	/**
	* Get the latest statuses from Twitter
	* 
	* Get the latest statuses from Twitter
	* 
	* @access public
	* @param object $params The Joomla! parameter object
	* @return mixed Returns false on failure, object on success
	*/
	function getTweets( $params ) {
		
		require_once( 'class.twitter.php' );
		
		$twitter = new Twitter( $params->get( 'username' ), $params->get( 'password' ), $this->format );
		
		$count = intval( $params->get( 'count' ) );
		
		if( $count === 0 ) {
			
			$count = 5;
			
		} elseif( $count > 200 ) {
			
			$count = 200;
			
		}
		
		switch( $params->get( 'timeline' ) ) {
			
			default:
			case 'user':
				$twitter->get( 'userTimeLine', $count );
				break;
			
			case 'friends':
				$twitter->get( 'friendsTimeLine', $count );
				break;
			
		}
		
		if( $twitter->output && $twitter->status == '200' ) {
			
			switch( $this->format ) {
				
				default:
				case 'xml':
					return $this->_decodeXML( $twitter->output );
					break;
				
				case 'json':
					return $this->_decodeJSON( $twitter->output );
					break;
				
			}
			
		} else {
			
			$this->errormessage = JText::_( 'ERROR_SERVER_RESPONSE' ) .' '. $twitter->status;
			
			return false;
			
		}
		
	}
	
	/**
	* Decode the returned XML
	* 
	* Decodes the XML string returned from the Twitter class
	* 
	* @access private
	* @param mixed $output The output string returned by the Twitter class
	* @return array Returns an array of Twitter statuses
	*/
	function _decodeXML( $output ) {
		
		$statuses = array();
		
		$xml = simplexml_load_string( $output );
		
		foreach( $xml as $status ) {
			
			$statuses[] = $status;
			
		}
		
		return $statuses;
		
	}
	
	/**
	* Decode the returned JSON
	* 
	* Decodes the JSON string returned from the Twitter class
	* 
	* @access private
	* @param mixed $output The output string returned by the Twitter class
	* @return array Returns an array of Twitter statuses
	*/
	function _decodeJSON( $output ) {
		
		return json_decode( $output );
		
	}
	
	/**
	* Select either JSON or XML format
	* 
	* Check whether there is JSON support or XML support and return the format
	* 
	* @access private
	* @return string Return lowercase name of format
	*/
	function _checkFormat() {
		
		if( function_exists( 'json_decode' ) ) {
			
			return 'json';
			
		} elseif( function_exists( 'simplexml_load_string' ) ) {
			
			return 'xml';
			
		}
		
		return false;
		
	}
	
	/**
	* Check for PHP Compatibility
	* 
	* Checks if the PHP version on the server is higher than 5
	* 
	* @access private
	* @return boolean Returns false on failure, true on succes
	*/
	function _checkCompatibility() {
		
		return version_compare( PHP_VERSION, '5.0.0', '>' );
		
	}
	
}
?>