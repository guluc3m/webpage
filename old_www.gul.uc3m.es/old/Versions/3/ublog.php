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
<?php 

	/*
	 * here comes the configuration
	 */
	
	$feeds = array(
			array(
				'name' => 'voiser',
				'url' => 'http://voiser.jaiku.com/feed/rss'
				),
			array(
				'name' => 'porras',
				'url' => 'http://porras.jaiku.com/feed/rss'
				),
			array(
				'name' => 'juanra',
				'url' => 'http://juanra.jaiku.com/feed/rss'
				),
			);

	/*
	 * 
	 */
	
	class Feed
	{
		private $name = "";
		private $url = "";
		private $rss;
    
		function __construct($newName, $newUrl)
		{    
			$this->name = $newName;
			$this->url  = $newURL;
			$this->rss  = fetch_rss( $newUrl );  
		}
    
		function name()
		{
			return $this->name;
		}
    
		function url()
		{
			return $this->url;
		}
    
		function rss()
		{
			return $this->rss;
		}		
	}
    
	class Entry
	{
		private $content;
		private $feed;
    	private $date;

		function __construct($newContent, $newFeed)
		{
			$this->content = $newContent;
			$this->feed    = $newFeed;
		}
    
		function content()
		{
			return $this->content;
		}
    
		function feed()
		{
			return $this->feed;
		}
	}

	error_reporting(0);
		
	$feedsCollection   = array();	
	$entriesCollection = array();

	$nFeeds   = 0;
	$nEntries = 0;
	
	foreach($feeds as $feedDesc)
	{
		$lastNFeeds   = $nFeeds;
		$lastNEntries = $nEntries;
		
		try
		{
			$name = $feedDesc['name'];
			$url  = $feedDesc['url'];

			$feed = new Feed($name, $url);					
			$rss  = $feed->rss();

			$feedsCollection[$nFeeds] = $feed;

			foreach($rss->items as $item)
			{
				$entry = new Entry($item, $feed);
				$entriesCollection[$nEntries] = $entry;
				$nEntries++;
			}

			$nFeeds++;
		}
		catch(Exception $e)
		{
			$nFeeds = $lastNFeeds;
			$nEntries = $lastNEntries;
		}
	}
		
	/*
	 * bubblesort
	 */
	
	$i = 0;
	
	while($i < $nEntries - 1)
	{
		$entry1 = $entriesCollection[$i];
		$entry2 = $entriesCollection[$i+1];
		
		$content1 = $entry1->content();
		$content2 = $entry2->content();
		
		if ($content1['date_timestamp'] < $content2['date_timestamp'])
		{
			$entriesCollection[$i]   = $entry2;
			$entriesCollection[$i+1] = $entry1;

			$i = 0;
		}
		else
		{
			$i++;			
		}
	}
	
	
	/*
	 * dump resulting entry collection
	 */
	
	$nEntriesToShow = $nEntries;
	
	for($i = 0; $i < $nEntriesToShow; $i++)
	{
		$entry = $entriesCollection[$i];
		$content = $entry->content();

		echo "<div class='jaiku'>";

/*
		echo "<a href='" . $content['link'] . "'>";
		echo iconv("iso-8859-1", "utf-8", $content['title']);
		echo "</a><br />";
*/
		echo iconv("iso-8859-1", "utf-8", $content['description']);
		
		echo "<a href='" . $content['guid'] . "'>";
		echo "<div class='jaiku-firma'>";
		echo $entry->feed()->name();
		echo "</div>";
		
		echo "</a>";

		echo "</div>";

		echo "<!--";
		print_r($content);
		echo "-->";
	}
	
/*
	$url = "http://planeta.gul.es/rss20.xml";
        $rss = fetch_rss( $url );
        
	foreach ($rss->items as $item) 
	{
                $href = $item['link'];
                $title = iconv("iso-8859-1", "utf-8", $item['title']);
		$body = iconv("iso-8859-1", "utf-8", $item['description']);
		echo "
		<div class='planet-entry'>
                	<h2><a href=$href>$title</a></h2>
			$body
		</div>
		";
        }
*/
?>

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
