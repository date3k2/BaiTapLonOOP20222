# vntex-3.2.2
#
# Author: Han The Thanh <hanthethanh@gmx.net>.
# This file is part of vntex.  Public domain.

# The primary site of vntex is:
#
#       http://vntex.sf.net

# This file has been tested with GNU make and Linux only.

# Usage:
# First edit the variables below according to what you have installed.
# 
# Run `make' to produce all files.
#
# Instead, you can
#   run `make testpdf'  to produce all PDF files,
#   run `make testps'   to produce all PS files,
#   run `make samples'  to produce all samples (as PDF),
#   run `make testht'   to produce the HTML files.
# 
# To view the the output files,
#   run `make viewpdf'  to view all PDF files,
#   run `make viewps'   to view all PS files,
#   run `make viewhtml' to view all HTML files.
#   run `make viewsamples' to view all *-sample.pdf files.
#   run `make viewfonts' to view all *-test.pdf files.
#   
# Finally, to remove generated files,
#   run `make clean' to remove all temporary files,
#   run `make distclean' to remove everything except the source files.

# Select a viewer of your choice.  You can add commandline arguments.
VIEWER_PDF  = acroread
VIEWER_PS   = gv -antialias
VIEWER_HTML = firefox

# Set this variable to `false' if you don't have tex4ht installed 
# on your system (look whether the program `htlatex' exists). 
TEX4HT = true

# Comment out the next two lines if you don't have a recent version
# of the Antykwa Torunska font family (antt) with T5 support (look
# whether you have `t5-antt.enc' in your TEXMF tree).
ANTT_TEST   = t5antt-test
ANTT_SAMPLE = t5antt-sample

# Comment out the next two lines if you don't have a recent version
# of Latin Modern (look whether you have `t5-lmr10.tfm' in your TEXMF
# tree).
T5LM_TEST   = t5lm-test
T5LM_SAMPLE = t5lm-sample

# Comment out the next two lines if you don't have a recent version
# of the Iwona font family (look whether you have `iwona.map' 
# in your TEXMF tree).
IWONA_TEST   = t5iwona-test
IWONA_SAMPLE = t5iwona-sample


# Comment out the next two lines if you don't have a recent version
# of the Kurier font family (look whether you have `kurier.map' 
# in your TEXMF tree).
KURIER_TEST   = t5kurier-test
KURIER_SAMPLE = t5kurier-sample


# Comment out the next two lines if you don't have a recent version
# of the Cyklop font family (look whether you have `cyklop.map' 
# in your TEXMF tree).
CYKLOP_TEST   = t5cyklop-test
CYKLOP_SAMPLE = t5cyklop-sample


# Comment out the next two lines if you don't have a recent version
# of the Gentium font family (look whether you have `gentium.map' 
# in your TEXMF tree).
GENTIUM_TEST   = t5gentium-test
GENTIUM_SAMPLE = t5gentium-sample


# Comment out the next two lines if you don't have a recent version
# of the GrotesquVn font family (look whether you have `grotesqvn.map' 
# in your TEXMF tree).
GROTESK_TEST   = grotesqvn-test
GROTESK_SAMPLE = grotesqvn-sample


# Comment out the next two lines if you don't have a recent version
# of the GaramondVn font family (look whether you have `garamondvn.map' 
# in your TEXMF tree).
GARAMOND_TEST   = garamondvn-test
GARAMOND_SAMPLE = garamondvn-sample


# Comment out the next two lines if you don't have a recent version
# of the TeXGyre-Bonum font family (look whether you have `qbk.map' 
# in your TEXMF tree).
BONUM_TEST     = bonum-test
BONUM_SAMPLE   = bonum-sample


# Comment out the next two lines if you don't have a recent version
# of the TeXGyre-Termes font family (look whether you have `qpl.map' 
# in your TEXMF tree).
PAGELLA_TEST   = termes-test
PAGELLA_SAMPLE = termes-sample


# Comment out the next two lines if you don't have a recent version
# of the TeXGyre-Pagella font family (look whether you have `qtm.map' 
# in your TEXMF tree).
TERMES_TEST    = pagella-test
TERMES_SAMPLE  = pagella-sample


# Comment out the next two lines if you don't have a recent version
# of the TeXGyre-Adventor font family (look whether you have `qag.map' 
# in your TEXMF tree).
ADVENTOR_TEST     = adventor-test
ADVENTOR_SAMPLE   = adventor-sample


# Comment out the next two lines if you don't have a recent version
# of the TeXGyre-Chorus font family (look whether you have `qzc.map' 
# in your TEXMF tree).
CHORUS_TEST     = chorus-test
CHORUS_SAMPLE   = chorus-sample


# Comment out the next two lines if you don't have a recent version
# of the TeXGyre-Cursor font family (look whether you have `qcr.map' 
# in your TEXMF tree).
CURSOR_TEST     = cursor-test
CURSOR_SAMPLE   = cursor-sample


# Comment out the next two lines if you don't have a recent version
# of the TeXGyre-Schola font family (look whether you have `qcs.map' 
# in your TEXMF tree).
SCHOLA_TEST     = schola-test
SCHOLA_SAMPLE   = schola-sample


# Comment out the next two lines if you don't have a recent version
# of the TeXGyre-Heros font family (look whether you have `qhv.map' 
# in your TEXMF tree).
HEROS_TEST     = heros-test
HEROS_SAMPLE   = heros-sample


# Comment out the next two lines if you don't have a recent version
# of the ArevSansVn font family (look whether you have `arevvn.map' 
# in your TEXMF tree).
AREV_TEST       = arevvn-test
AREV_SAMPLE     = arevvn-sample


# Comment out the next two lines if you don't have a recent version
# of the CMBrightVn font family (look whether you have `cmbrightvn.map' 
# in your TEXMF tree).
CMBRIGHT_TEST	= cmbrightvn-test
CMBRIGHT_SAMPLE	= cmbrightvn-sample


# Comment out the next two lines if you don't have a recent version
# of the ClassicoVn font family (look whether you have `classicovn.map' 
# in your TEXMF tree).
CLASSICO_TEST	= classicovn-test
CLASSICO_SAMPLE	= classicovn-sample


# Comment out the next two lines if you don't have a recent version
# of the ConcreteVn font family (look whether you have `concretevn.map' 
# in your TEXMF tree).
CONCRETE_TEST	= concretevn-test
CONCRETE_SAMPLE	= concretevn-sample


# Comment out the next two lines if you don't have a recent version
# of the Vntopia font family (look whether you have `vntopia.map' 
# in your TEXMF tree).
VNTOPIA_TEST	= vntopia-test
VNTOPIA_SAMPLE	= vntopia-sample


# Comment out the next two lines if you don't have a recent version
# of the txttvn font family (look whether you have `txttvn.map' 
# in your TEXMF tree).
TXTT_TEST	= txttvn-test
TXTT_SAMPLE	= txttvn-sample


# Comment out the next two lines if you don't have a recent version
# of the ComicsansVn font family (look whether you have `comicsansvn.map' 
# in your TEXMF tree).
COMIC_TEST	= comicsansvn-test
COMIC_SAMPLE	= comicsansvn-sample


# Comment out the next two lines if you don't have the MS core font
# files like `arial.ttf' or `tahomabd.ttf' installed in your TEXMF
# tree.
MSCORE_TEST   = mscore-test
MSCORE_SAMPLE = mscore-sample

# Comment out the next line if you don't have plnfss installed on your
# system (look whether `plnfss.tex' and `t5cmr.pfd' exists. 
TEST_PLAIN  = test-plain test-plain-tcx


#====================================================#
# There is no need to edit anything below this line. #
#====================================================#


TEXOPTS    = -parse-first-line -recorder
TEX4HTOPTS = "html,uni-html4,charset=utf8" " -cunihtf -utf8"
FONTMEM    = env font_mem_size=1200000

PDFLATEX = pdflatex $(TEXOPTS)
LATEX    = latex $(TEXOPTS)
PDFTEX   = pdftex $(TEXOPTS)
TEX      = tex $(TEXOPTS)
DVIPS    = dvips


TEST_LATEX     = test-vietnam test-babel

TEST_LATEX_ALL = $(TEST_LATEX) test-vietnam-tcx

REFERENCES     = vnr-test urwvn-test chartervn-test \
		 $(ANTT_TEST) $(T5LM_TEST) \
		 $(IWONA_TEST) $(KURIER_TEST) $(CYKLOP_TEST) \
		 $(GROTESK_TEST) $(GARAMOND_TEST) \
		 $(AREV_TEST) $(VNTOPIA_TEST) $(CLASSICO_TEST) \
		 $(CMBRIGHT_TEST) $(CONCRETE_TEST) \
		 $(GENTIUM_TEST) $(TXTT_TEST) \
		 $(BONUM_TEST) $(PAGELLA_TEST) $(TERMES_TEST) \
		 $(ADVENTOR_TEST) $(CHORUS_TEST) $(CURSOR_TEST) \
		 $(SCHOLA_TEST) $(HEROS_TEST) \
		 $(MSCORE_TEST) $(COMIC_TEST)

SAMPLES        = vnr-sample urwvn-sample chartervn-sample \
		 $(ANTT_SAMPLE) $(T5LM_SAMPLE) \
		 $(IWONA_SAMPLE) $(KURIER_SAMPLE) $(CYKLOP_SAMPLE) \
		 $(GROTESK_SAMPLE) $(GARAMOND_SAMPLE) \
		 $(AREV_SAMPLE) $(VNTOPIA_SAMPLE) $(CLASSICO_SAMPLE) \
		 $(CMBRIGHT_SAMPLE) $(CONCRETE_SAMPLE) \
		 $(GENTIUM_SAMPLE) $(TXTT_SAMPLE) \
		 $(BONUM_SAMPLE) $(PAGELLA_SAMPLE) $(TERMES_SAMPLE) \
		 $(ADVENTOR_SAMPLE) $(CHORUS_SAMPLE) $(CURSOR_SAMPLE) \
		 $(SCHOLA_SAMPLE) $(HEROS_SAMPLE) \
		 $(MSCORE_SAMPLE) $(COMIC_SAMPLE)


default: testpdf testps samples


vntovn:  test-tcvn.tex test-utf8.tex


test-tcvn.tex: test-viscii.tex
	vntovn viscii tcvn $< > $@


test-utf8.tex: test-viscii.tex
	vntovn viscii utf8 $< > $@


testpdf:
	for f in $(TEST_LATEX_ALL); do \
	   test -f $$f.aux || $(PDFLATEX) $$f.tex; \
	   $(PDFLATEX) $$f.tex; \
	done	
	for f in $(TEST_PLAIN); do \
	   $(PDFTEX) $$f.tex; \
	done


testps:
	for f in $(TEST_LATEX_ALL); do \
	   test -f $$f.aux || $(LATEX) $$f.tex; \
	   $(LATEX) $$f.tex ; $(DVIPS) $$f.dvi -o; \
	done	
	for f in $(TEST_PLAIN); do \
	   $(TEX) $$f.tex ; $(DVIPS) $$f.dvi -o; \
	done


testht:
	   for f in $(TEST_LATEX) $(REFERENCES); do \
	      htlatex $$f.tex $(TEX4HTOPTS); \
	   done


samples:
	for f in $(SAMPLES) ; do \
	    test -f $$f.aux || \
	    $(FONTMEM) $(PDFLATEX) $$f.tex; \
	done
	for f in $(REFERENCES) $(SAMPLES) ; do \
	    $(FONTMEM) $(PDFLATEX) $$f.tex; \
	done


refs:
	for f in $(REFERENCES) ; do \
	    $(FONTMEM) $(PDFLATEX) $$f.tex; \
	done



viewpdf:
	for f in $(TEST_LATEX_ALL) $(TEST_PLAIN); do \
	   (test ! -f $$f.pdf && \
		echo "WARNING: File \"$$f.pdf\" not found.") \
	   	|| $(VIEWER_PDF) $$f.pdf; \
	done


viewps:
	for f in $(TEST_LATEX_ALL) $(TEST_PLAIN); do \
	   (test ! -f $$f.ps && \
		echo "WARNING: File \"$$f.ps\" not found.") \
	   	|| $(VIEWER_PS) $$f.ps; \
	done


viewhtml:
	for f in $(TEST_LATEX) $(REFERENCES); do \
	   (test ! -f $$f.html && \
		echo "WARNING: File \"$$f.html\" not found.") \
		|| $(VIEWER_HTML) file://`pwd`/$$f.html; \
	done


viewsamples:
	for f in $(SAMPLES); do \
	   (test ! -f $$f.pdf && \
		echo "WARNING: File \"$$f.pdf\" not found.") \
		|| $(VIEWER_PDF) $$f.pdf; \
	done


viewfonts:
	for f in $(REFERENCES); do \
	   (test ! -f $$f.pdf && \
		echo "WARNING: File \"$$f.pdf\" not found.") \
		|| $(VIEWER_PDF) $$f.pdf; \
	done

htmldir:
	test -d vntex-html || mkdir vntex-html
	rm -f vntex-html/*
	cp -p *.html *.css vntex-html
	echo '<html><head>' > vntex-html/index.html 
	echo '<title>VnTeX HTML Fonts</title>' >> vntex-html/index.html
	echo '</head>' >> vntex-html/index.html 
	echo '<body><h1>VnTeX HTML Fonts</h1><p>' >> vntex-html/index.html
	for f in $(TEST_LATEX) $(REFERENCES); do \
          echo "<a href=\"$$f.html\">$$f</a><p>" >> vntex-html/index.html; \
	done
	echo '</body></html>' >> vntex-html/index.html
	tar -cjvf vntex-html.tar.bz2 vntex-html

clean:
	rm -f *.dvi *.out *.toc *.aux *.log *.4ct *.4tc *.idv *.lg \
              *.tmp *.xref *.fls *.lof


distclean: clean
	rm -f *.pdf *.ps *.css *.html nocompress vntex-html.tar.bz2
	rm -rf vntex-html

