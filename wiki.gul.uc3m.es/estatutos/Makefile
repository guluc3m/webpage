
all: estatutos.pdf


%.pdf: %.tex
	pdflatex $<
	pdflatex $<
	rm *aux
	rm *toc
	rm *log

clean:
	rm *pdf

