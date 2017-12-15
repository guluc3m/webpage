<?php defined( '_JEXEC' ) or die( 'Restricted access' ); ?>

<?php if( $params->get( 'enable-css' ) === '1' ) : 
	
	$document = &JFactory::getDocument();
	$document->addStyleSheet( 'modules/mod_tweets/tmpl/tweets.css' );
	
endif; ?>

<?php for( $i = 0, $c = count( $twitter->tweets ); $i < $c; $i++ ) : ?>
	
	<?php $tweet = $twitter->tweets[$i]; ?>
	
	<div class="tweet">
		
		<?php if( $params->get( 'show-image' ) === '1' ) : ?>
		
			<div class="tweet-image">
				<img src="<?php echo $tweet->user->profile_image_url; ?>" />
			</div>
		
		<?php endif; ?>
	
		<?php if( $params->get( 'show-username' ) === '1' ) : ?>
		
			<div class="tweet-username">
				<a href="http://twitter.com/<?php echo $tweet->user->screen_name; ?>" target="_blank"><?php echo $tweet->user->name; ?></a>
			</div>
		
		<?php endif; ?>
		
		<?php if( $params->get( 'show-date' ) === '1' ) : ?>
			
			<?php
			$now =& JFactory::getDate();
			$date =& JFactory::getDate( strtotime( $tweet->created_at ) + ( $now->toUnix() - time() ) );
			$diff = $now->toUnix() - $date->toUnix();
						
			if( $diff < 60 ) {
				$created_date = JText::_( 'LESS THAN A MINUTE AGO' );
			} elseif( $diff < 120 ) {
				$created_date = JText::_( 'ABOUT A MINUTE AGO' );
			} elseif( $diff < ( 45 * 60 ) ) {
				$created_date = JText::sprintf( '%s MINUTES AGO', round( $diff / 60 ) );
			} elseif( $diff < ( 90 * 60 ) ) {
				$created_date = JText::_( 'ABOUT AN HOUR AGO' );
			} elseif( $diff < ( 24 * 3600 ) ) {
				$created_date = JText::sprintf( 'ABOUT %s HOURS AGO', round( $diff / 3600 ) );
			} else {
				$created_date = JHTML::_( 'date', $date->toUnix(), JText::_( 'DATE_FORMAT_LC2' ) );
			}
			?>
			
			<div class="tweet-date">
				<?php echo $created_date; ?>
			</div>
			
		<?php endif; ?>
		
		<?php if( $params->get( 'parse-links' ) === '1' ) :
			
			$rule = '/.*?((?:http|https)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*))/is';
			
			preg_match_all( $rule, $tweet->text, $matches );
			
			foreach( $matches[1] as $url ) :
				
				$tweet->text = str_replace( $url, '<a href="'. $url .'" target="_blank">'. $url .'</a>', $tweet->text );
				
			endforeach;
			
		endif; ?>
		
		<div class="tweet-message">
			<?php echo $tweet->text; ?>
		</div>
	
	</div>

<?php endfor; ?>