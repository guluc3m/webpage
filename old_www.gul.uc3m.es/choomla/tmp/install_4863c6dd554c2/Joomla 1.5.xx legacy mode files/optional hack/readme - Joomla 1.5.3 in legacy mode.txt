HOW TO ENABLE BASED-ON-KEYWORDS FEEDS FEATURE FOR JOOMLA CONTENT ITEMS (optional)

Feederator has a nice feature you may want to use - it can create RSS feeds based on admin selected keywords used in the metatags of the content items.
Say, if we have keyword "football" in 20 different content items. Then the admin can create an RSS feed just for that keyword. However, to enable this feature, you'd need to make a small change to a core file. Here's a couple of options:

OPTION #1 - Overwrite core files (in the current version, we have just ONE modified core file)
Just unpack joomla_1.5.3_corefiles_modified.zip and overwrite several of Joomla 1.5.3 core files. If you previously applied custom hacks to the core files, overwriting the files would obviously remove those hacks. And therefore the 2nd option might be more appropriate. 

OPTION #2 - Modify several files by hand 

Locate controller.php here

+---administrator
    \---components
        \---com_content
                controller.php

Find line # 692 with the following code:

>>start--------------------------------------------------------------------------

		// Store the content to the database
		if (!$row->store()) {
			JError::raiseError( 500, $db->stderr() );
			return false;
		}
		
		// Check the article and update item order
		$row->checkin();
		$row->reorder('catid = '.(int) $row->catid.' AND state >= 0');

<<end----------------------------------------------------------------------------

Modify it to look like

>>start--------------------------------------------------------------------------

		// Store the content to the database
		if (!$row->store()) {
			JError::raiseError( 500, $db->stderr() );
			return false;
		}

/* start: added for feederator*/

    require_once($GLOBALS['mosConfig_absolute_path'] . "/components/Recly/Recly_Keywords/Recly_Keywords.php");

    $keywords = new Recly_Keywords('id_content', 'keyword', '#__fdr_', 'ku');
    $keywords->saveKeywords($row->id, $row->metakey);
    
    $keywordsArray = Recly_String::tokenizeQuoted($row->metakey);
	for ($j = 0; $j < sizeof($keywordsArray); $j++) {
	   $query = "SELECT id_rss FROM #__fdr_kurss WHERE keyword = '$keywordsArray[$j]'";    
	   $db->setQuery($query); 
	   $feeds = $db->loadObjectList();
	   
	   foreach ($feeds as $feed) {
	       $query = "UPDATE #__fdr_feeds SET modified = NOW() WHERE Id = '$feed->id_rss' AND keywords_based = '1' AND internal = '1'";
	       $db->setQuery($query);
	       $db->query();	   
	   }
	}

	$query = "UPDATE #__fdr_feeds SET modified = NOW() WHERE Id = '$feed->id_rss' AND section_based = '1' AND id_section = '$row->sectionid' AND internal = '1'";
	$db->setQuery($query);
	$db->query();		
	    
/* end: added for feederator*/ 	

		// Check the article and update item order
		$row->checkin();
		$row->reorder('catid = '.(int) $row->catid.' AND state >= 0');



<<end----------------------------------------------------------------------------

