
<xsl:stylesheet version = '1.0' xmlns:xsl='http://www.w3.org/1999/XSL/Transform'>

  <xsl:template match="/humano">
     
     <h3 style="clear:right">

		<xsl:value-of select="./nombre"/> <em> (<xsl:value-of select="./nick"/>)</em>

<!--
		<xsl:element name="a">
			<xsl:attribute name="name">
				<xsl:value-of select="./nick"/>
			</xsl:attribute>
			<xsl:value-of select="./nombre"/> <em> (<xsl:value-of select="./nick"/>)</em>
		</xsl:element>
-->
     </h3>

     <p style="text-align:justify">
       <span style="float:right">
       <xsl:element name="img">
         <xsl:attribute name="src">
           <xsl:value-of select="./foto"/>
         </xsl:attribute>
         <xsl:attribute name="alt">Foto de <xsl:value-of select="./nombre"/></xsl:attribute>
<!--         <xsl:attribute name="width">240</xsl:attribute> -->
       </xsl:element>
       </span>
       <xsl:value-of select="./rollo"/>
     </p>

     <p>
       <em>
         <xsl:value-of select="mail"/>
       </em>
     </p>
     <p>
       <xsl:element name="a">
         <xsl:attribute name="href">http://<xsl:value-of select="page"/>
         </xsl:attribute>Web personal</xsl:element>
     |
       <xsl:element name="a">
         <xsl:attribute name="href">http://<xsl:value-of select="blog"/>
         </xsl:attribute>Blog</xsl:element>
     |
       <xsl:element name="a">
         <xsl:attribute name="href"><xsl:value-of select="key"/>
         </xsl:attribute>Clave GPG</xsl:element>
     </p>

  </xsl:template>

</xsl:stylesheet>


