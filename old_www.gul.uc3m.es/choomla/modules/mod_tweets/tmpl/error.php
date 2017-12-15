<?php defined( '_JEXEC' ) or die( 'Restricted access' ); ?>

<?php if( $params->get( 'enable-css' ) == 1 ) : 
	
	$document = &JFactory::getDocument();
	$document->addStyleSheet( 'modules/mod_tweets/tmpl/tweets.css' );
	
endif; ?>

<div id="tweet-error">
	
	<strong><?php echo JText::_( 'ERROR_TITLE' ); ?></strong>
	
	<p>
		<?php echo JText::_( 'ERROR_DESCRIPTION' ); ?>
	</p>
	
	<p><?php echo $twitter->errormessage; ?></p>
	
</div>