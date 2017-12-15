#!/bin/bash

FILE=$1

cp $FILE /tmp
iconv -f iso-8859-1 -t utf-8 /tmp/$FILE > $FILE

