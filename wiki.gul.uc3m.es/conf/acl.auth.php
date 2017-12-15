# acl.auth.php
# <?php exit()?>
# Don't modify the lines above
#
# Access Control
#
# none   0
# read   1
# edit   2
# create 4
# upload 8

reuniones	@editor	1
reuniones	@usuario	1
reuniones	@junta 4
*	@junta	4
pagina_privada_de_gul-root	@gulroot	2
pagina_privada_de_gul-root	@ALL	0
pagina_privada_de_gul-root	@user	0
pagina_privada_de_gul-root	@editor	0
pagina_privada_de_gul-root	@junta	1
wiki:documentacion	@gul-doc	8
votaciones_cursos_marzo_2007	@ALL	2
privadomyc	@gul%2dmyc	2
*	@admin	8
*	@user	4
*	@gulroot	4
*	@ALL	1
*	@editor	4
privadomyc	@ALL	0
privadomyc	@user	0
hispalinux:*	@hispalinux	8
hispalinux:*	prueba1234	8
