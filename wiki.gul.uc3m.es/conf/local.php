<?php
/**
 * This is DokuWiki's Main Configuration file
 * This is a piece of PHP code so PHP syntax applies!
 *
 * For help with the configuration see http://www.splitbrain.org/dokuwiki/wiki:config
 */


/* Datastorage and Permissions */

$conf['lang']        = 'es';              //your language
$conf['allowdebug']=   1;                 //make debug possible, disable after install! 0|1
/* Display Options */

$conf['start']       = 'inicio';           //name of start page
$conf['title']       = 'GUL UC3M';        //what to show in the title
$conf['template']    = 'gul';         //see tpl directory
$conf['fullpath']    = 0;                 //show full path of the document or relative to datadir only? 0|1
$conf['htmlok']      = 1;                 //may raw HTML be embedded? This may break layout and XHTML validity 0|1
$conf['phpok']       = 0;                 //may PHP code be embedded? Never do this on the internet! 0|1
$conf['dformat']     = 'Y/m/d H:i';       //dateformat accepted by PHPs date() function
$conf['signature']   = ' --- //[[@MAIL@|@NAME@]] @DATE@//'; //signature see wiki:config for details

$conf['datadir']     = "./data/pages";
$conf['mediadir']     = "./data/media";
$conf['metadir']     = "./data/meta";
$conf['cachedir']     = "./data/cache";
$conf['lockdir']     = "./data/locks";
$conf['changelog']     = "./data/changes.log";
$conf['olddir']     = "./olddir";

/* Authentication Options - read http://www.splitbrain.org/dokuwiki/wiki:acl */
$conf['useacl']      = 1;                //Use Access Control Lists to restrict access?
$conf['openregister']= 0;                //Should users to be allowed to register?
#$conf['authtype']    = 'ldap';          //which authentication backend should be used
$conf['authtype']    = 'plain';          //which authentication backend should be used
$conf['superuser']   = '@admin';    //The admin can be user or @group

 
$conf['auth']['ldap']['server']      = 'ldap://163.117.156.80:389';
$conf['auth']['ldap']['usertree']    = 'ou=People, dc=gul, dc=uc3m, dc=es';
$conf['auth']['ldap']['grouptree']   = 'ou=People, dc=gul, dc=uc3m, dc=es';
$conf['auth']['ldap']['userfilter']  = '(&(uid=%{user})(objectClass=posixAccount))';
$conf['auth']['ldap']['groupfilter'] = '(&(objectClass=posixGroup)(|(gidNumber=%{gid})(memberUID=%{user})))';
$conf['auth']['ldap']['version']    = 3;
 

