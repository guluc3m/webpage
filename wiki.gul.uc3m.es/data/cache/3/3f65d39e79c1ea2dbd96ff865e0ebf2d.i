a:87:{i:0;a:3:{i:0;s:14:"document_start";i:1;a:0:{}i:2;i:0;}i:1;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:51:"Cómo crear una aplicación ruby on rails en debian";i:1;i:4;i:2;i:1;}i:2;i:1;}i:2;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:4;}i:2;i:1;}i:3;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:60;}i:4;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:61;}i:5;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:44:"Crearemos una aplicación de prueba llamada ";}i:2;i:62;}i:6;a:3:{i:0;s:18:"doublequoteopening";i:1;a:0:{}i:2;i:106;}i:7;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:4:"pror";}i:2;i:107;}i:8;a:3:{i:0;s:18:"doublequoteclosing";i:1;a:0:{}i:2;i:111;}i:9;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:2:" (";}i:2;i:112;}i:10;a:3:{i:0;s:18:"doublequoteclosing";i:1;a:0:{}i:2;i:114;}i:11;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:20:"prueba ruby on rails";}i:2;i:115;}i:12;a:3:{i:0;s:18:"doublequoteclosing";i:1;a:0:{}i:2;i:135;}i:13;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:")";}i:2;i:136;}i:14;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:137;}i:15;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:137;}i:16;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:25:"La ubicaremos en /var/www";}i:2;i:139;}i:17;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:164;}i:18;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:164;}i:19;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:68:"Haremos un alias en apache para acceder a ella usando la dirección ";}i:2;i:166;}i:20;a:3:{i:0;s:12:"externallink";i:1;a:2:{i:0;s:17:"http://...../pror";i:1;N;}i:2;i:234;}i:21;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:251;}i:22;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:33:"Instalar los paquetes necesarios:";}i:2;i:252;}i:23;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:285;}i:24;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:286;}i:25;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:208:"aptitude update 
aptitude install rubygems build-essential 
gem install rails --include-dependencies 
aptitude install libapache2-mod-fastcgi 
aptitude install libfcgi-ruby1.8
aptitude install libmysql-ruby 
";}i:2;i:286;}i:26;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:286;}i:27;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:509;}i:28;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:12:"Los scripts ";}i:2;i:510;}i:29;a:3:{i:0;s:18:"doublequoteopening";i:1;a:0:{}i:2;i:522;}i:30;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:5:"rails";}i:2;i:523;}i:31;a:3:{i:0;s:18:"doublequoteclosing";i:1;a:0:{}i:2;i:528;}i:32;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:3:" y ";}i:2;i:529;}i:33;a:3:{i:0;s:18:"doublequoteopening";i:1;a:0:{}i:2;i:532;}i:34;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:4:"rake";}i:2;i:533;}i:35;a:3:{i:0;s:18:"doublequoteclosing";i:1;a:0:{}i:2;i:537;}i:36;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:67:", necesarios en el desarrollo de una aplicación RoR se instalan en";}i:2;i:538;}i:37;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:605;}i:38;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:606;}i:39;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:21:"/var/lib/gems/1.8/bin";}i:2;i:606;}i:40;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:633;}i:41;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:23:"Creamos la aplicación:";i:1;i:5;i:2;i:633;}i:2;i:633;}i:42;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:5;}i:2;i:633;}i:43;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:46:"cd /var/www/
/var/lib/gems/1.8/bin/rails pror
";}i:2;i:663;}i:44;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:717;}i:45;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:49:"Cedemos la aplicación al desarrollador (voiser):";i:1;i:5;i:2;i:717;}i:2;i:717;}i:46;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:5;}i:2;i:717;}i:47;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:31:"chown -R voiser /var/www/pror/
";}i:2;i:773;}i:48;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:810;}i:49;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:20:"Configuramos apache:";i:1;i:5;i:2;i:810;}i:2;i:810;}i:50;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:5;}i:2;i:810;}i:51;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:41:"vim /etc/apache2/sites-available/default
";}i:2;i:837;}i:52;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:884;}i:53;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:41:"Añadimos una nueva ubicación de apache:";i:1;i:5;i:2;i:884;}i:2;i:884;}i:54;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:5;}i:2;i:884;}i:55;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:142:"Alias /pror "/var/www/pror/public/"
<directory /var/www/pror/public/>
   AllowOverride all
   Order allow,deny
   Allow from all
</directory>
";}i:2;i:932;}i:56;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:1090;}i:57;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:28:"Configuramos la aplicación:";i:1;i:5;i:2;i:1090;}i:2;i:1090;}i:58;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:5;}i:2;i:1090;}i:59;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:82:"cd /var/www/pror
chown -R www-data log
chown -R www-data tmp
vim public/.htaccess
";}i:2;i:1125;}i:60;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:1125;}i:61;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:1218;}i:62;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:47:"Encima de las directivas RewriteRule añadimos:";}i:2;i:1219;}i:63;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:1266;}i:64;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:18:"RewriteBase /pror ";}i:2;i:1269;}i:65;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:1269;}i:66;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:1291;}i:67;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:60:"que es el alias que le dimos en apache. Además, cambiaremos";}i:2;i:1292;}i:68;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:1352;}i:69;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:1353;}i:70;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:40:"RewriteRule ^(.*)$ dispatch.cgi [QSA,L] ";}i:2;i:1353;}i:71;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:1353;}i:72;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:1397;}i:73;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:3:"por";}i:2;i:1398;}i:74;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:1401;}i:75;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:1402;}i:76;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:40:"RewriteRule ^(.*)$ dispatch.fcgi [QSA,L]";}i:2;i:1402;}i:77;a:3:{i:0;s:6:"p_open";i:1;a:0:{}i:2;i:1402;}i:78;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:1:" ";}i:2;i:1446;}i:79;a:3:{i:0;s:5:"cdata";i:1;a:1:{i:0;s:40:"(sólo cambia la extensión del archivo)";}i:2;i:1447;}i:80;a:3:{i:0;s:7:"p_close";i:1;a:0:{}i:2;i:1487;}i:81;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:1490;}i:82;a:3:{i:0;s:6:"header";i:1;a:3:{i:0;s:19:"Reiniciamos apache:";i:1;i:5;i:2;i:1490;}i:2;i:1490;}i:83;a:3:{i:0;s:12:"section_open";i:1;a:1:{i:0;i:5;}i:2;i:1490;}i:84;a:3:{i:0;s:12:"preformatted";i:1;a:1:{i:0;s:28:"/etc/init.d/apache2 restart
";}i:2;i:1516;}i:85;a:3:{i:0;s:13:"section_close";i:1;a:0:{}i:2;i:1550;}i:86;a:3:{i:0;s:12:"document_end";i:1;a:0:{}i:2;i:1550;}}