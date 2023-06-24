% -*-LaTeX-*-
% Copyright 2003-2006 Han The Thanh <hanthethanh@gmx.net>.
% This file is part of vntex.  License: LPPL, version 1.3 or newer,
% according to http://www.latex-project.org/lppl.txt

\ifx\documentclass\undefined\endinput\fi

\newif\ifbookmarks
\newif\iftest
\newif\ifsample

\ProvidesClass{vnsample}[2005/08/27]
\NeedsTeXFormat{LaTeX2e}

\LoadClass[a4paper]{article}

\RequirePackage{ifpdf}

\ifpdf\IfFileExists{cmap.sty}{\RequirePackage{cmap}}{
\ClassWarningNoLine{vnsample}{I can't find the file `cmap.sty'.\MessageBreak
The search tool in your PDF browser will miss many\MessageBreak
words containing Vietnamese characters}}\fi

\RequirePackage[utf8]{vntex}
\RequirePackage{multicol}
\RequirePackage{geometry}
\RequirePackage{array}
\RequirePackage{fancyhdr}
\RequirePackage[unicode]{hyperref}

\hypersetup{pdfauthor={Hàn Thế Thành and Reinhard Kotucha}}

\DeclareOption{sample}{
  \geometry{a4paper,nofoot,left=1cm,right=1cm,top=2cm,bottom=1cm}
  \pagestyle{fancy}
  \rhead{\thepage}
  \lhead{\textrm{\rightmark}}\cfoot{}\lfoot{}\rfoot{}
  \raggedright
  \parindent0pt
  \lineskiplimit -100pt
  \bookmarkstrue
  \sampletrue
}

\DeclareOption{test}{
  \geometry{a4paper,landscape,top=1cm,bottom=1cm,left=1cm,right=1cm,%
    nofoot,nohead}
  \pagestyle{empty}
  \bookmarksfalse
  \advance\oddsidemargin -7mm \evensidemargin=\oddsidemargin
  \hbadness=10000\relax\hfuzz=\maxdimen
  \AtBeginDocument{\extrarowheight=5pt}
  \testtrue
}

\ProcessOptions

\newdimen\dimenA
\newbox\boxA
\newbox\boxB

\def\vnchars{%
\dochar á
\dochar ạ
\dochar à
\dochar ả
\dochar ã
\dochar ă
\dochar ắ
\dochar ặ
\dochar ằ
\dochar ẳ
\dochar ẵ
\dochar â
\dochar ấ
\dochar ậ
\dochar ầ
\dochar ẩ
\dochar ẫ
\dochar đ
\dochar é
\dochar ẹ
\dochar è
\dochar ẻ
\dochar ẽ
\dochar ê
\dochar ế
\dochar ệ
\dochar ề
\dochar ể
\dochar ễ
\dochar í
\dochar ị
\dochar ì
\dochar ỉ
\dochar ĩ
\dochar ó
\dochar ọ
\dochar ò
\dochar ỏ
\dochar õ
\dochar ô
\dochar ố
\dochar ộ
\dochar ồ
\dochar ổ
\dochar ỗ
\dochar ơ
\dochar ớ
\dochar ợ
\dochar ờ
\dochar ở
\dochar ỡ
\dochar ú
\dochar ụ
\dochar ù
\dochar ủ
\dochar ũ
\dochar ư
\dochar ứ
\dochar ự
\dochar ừ
\dochar ử
\dochar ữ
\dochar ý
\dochar ỵ
\dochar ỳ
\dochar ỷ
\dochar ỹ
% \break
\dochar Á
\dochar Ạ
\dochar À
\dochar Ả
\dochar Ã
\dochar Ă
\dochar Ắ
\dochar Ặ
\dochar Ằ
\dochar Ẳ
\dochar Ẵ
\dochar Â
\dochar Ấ
\dochar Ậ
\dochar Ầ
\dochar Ẩ
\dochar Ẫ
\dochar Đ
\dochar É
\dochar Ẹ
\dochar È
\dochar Ẻ
\dochar Ẽ
\dochar Ê
\dochar Ế
\dochar Ệ
\dochar Ề
\dochar Ể
\dochar Ễ
\dochar Í
\dochar Ị
\dochar Ì
\dochar Ỉ
\dochar Ĩ
\dochar Ó
\dochar Ọ
\dochar Ò
\dochar Ỏ
\dochar Õ
\dochar Ô
\dochar Ố
\dochar Ộ
\dochar Ồ
\dochar Ổ
\dochar Ỗ
\dochar Ơ
\dochar Ớ
\dochar Ợ
\dochar Ờ
\dochar Ở
\dochar Ỡ
\dochar Ú
\dochar Ụ
\dochar Ù
\dochar Ủ
\dochar Ũ
\dochar Ư
\dochar Ứ
\dochar Ự
\dochar Ừ
\dochar Ử
\dochar Ữ
\dochar Ý
\dochar Ỵ
\dochar Ỳ
\dochar Ỷ
\dochar Ỹ
\par
}

\def\dochar #1 {%
    #1\kern.1em\penalty0%
}

\def\SL{-Slant}
\def\EMPH#1{\textbf{\textit{#1}}}

\long\def\vntext{%
\centerline{\textbf{Chí Phèo}}
\vskip -.5\baselineskip
\rightline{\textsc{--- Nam Cao}}
Hắn vừa đi vừa chửi. Bao giờ cũng thế, cứ rượu xong là hắn chửi. Bắt đầu
chửi trời. Có hề gì? Trời có của riêng nhà nào? Rồi hắn chửi đời. Thế
cũng chẳng sao: đời là tất cả nhưng chẳng là ai. Tức mình hắn chửi ngay tất
cả làng Vũ Đại. Nhưng cả làng Vũ Đại ai cũng nhủ, \textit{``Chắc nó trừ
mình ra!''} Không ai lên tiếng cả. Tức thật! Ồ! Thế này thì tức thật! Tức
chết đi được mất! Đã thế, hắn phải chửi cha đứa nào không chửi nhau với
hắn. Nhưng cũng không ai ra điều. Mẹ kiếp! Thế thì có phí rượu không? Thế
thì có khổ hắn không? Không biết đứa chết mẹ nào đẻ ra thân hắn cho hắn khổ
đến nông nỗi này? A ha! Phải đấy, hắn cứ thế mà chửi, hắn chửi đứa chết mẹ
nào đẻ ra thân hắn, đẻ ra cái thằng \EMPH{Chí Phèo}! Hắn nghiến răng vào
mà chửi cái đứa đã đẻ ra Chí Phèo. Nhưng mà biết đứa nào đã đẻ ra
Chí Phèo? Có trời mà biết! Hắn không biết, cả làng Vũ Đại cũng không ai
biết.

Một anh đi thả ống lươn, một buổi sáng tinh sương đã thấy hắn
trần truồng và xám ngắt trong một váy đụp để bên một lò gạch bỏ
không, anh ta rước lấy và đem về cho một người đàn bà góa mù.
Người đàn bà góa mù này bán hắn cho một bác phó cối không con, và
khi bác phó cối này chết thì hắn bơ vơ, hết đi ở cho nhà này lại đi
ở cho nhà nọ. Năm hai mươi tuổi, hắn làm canh điền cho ông lý Kiến,
bấy giờ cụ bá Kiến, ăn tiên chỉ làng. Hình như có mấy lần bà ba nhà
ông lý, còn trẻ lắm mà lại hay ốm lửng, bắt hắn bóp chân, hay xoa
bụng, đấm lưng gì đấy. Người ta bảo ông lý ra đình thì hách dịch,
cả làng phải sợ, mà về nhà thì lại sợ cái bà ba còn trẻ này. Người
bà ấy phốp pháp, má bà ấy hây hây, mà ông lý thì hay đau lưng lắm;
những người có bệnh đau lưng hay sợ vợ mà chúa đời là khoẻ ghen.
Có người bảo ông lý ghen với anh canh điền khoẻ mạnh mà sợ bà ba
không dám nói. Có người thì bảo anh canh điền ấy được bà ba quyền
thu quyền bổ trong nhà tin cẩn nên lấy trộm tiền trộm thóc nhiều.
Mỗi người nói một cách. Chẳng biết đâu mà lần. Chỉ biết một hôm
Chí bị người ta giải huyện rồi biệt tăm đến bảy, tám năm rồi một
hôm, hắn lại lù lù ở đâu lần về. Hắn về lớp này trông khác
hẳn, mới đầu chẳng ai biết hắn là ai. Trông đặc như thằng sắng
cá! Cái đầu thì trọc lốc, cái răng cạo trắng hớn, cái mặt thì đen
mà rất câng câng, hai mắt gườm gườm trông gớm chết! Hắn mặc quần
áo nái đen với áo Tây vàng. Cái ngực phanh, đầy những nét chạm trổ
rồng, phượng với một ông thày tướng cầm chuỳ, cả hai cánh tay cũng
thế. Trông gớm chết!
}

\def\mksample#1{%
    \leftline{\normalsize\bf\fbox{line spacing #1}\hrulefill}
    \vskip 5pt
    \ifnum\pdftexversion<130\relax
      \dimenA=\pdffontsize\font pt\relax
    \else
      \dimenA=\pdffontsize\font
    \fi
    \setbox\boxA=\vbox{%
        \baselineskip=#1\dimenA
        \parskip=.5\baselineskip
        \noindent\vntext\par}%
    \setbox\boxB=\vsplit\boxA to 3in
    \nobreak
    \box\boxB
    \vskip 10pt
}

\def\showfontsize#1#2#3{{%
    \leftline{\large\bf\fbox{#2}\hrulefill}
    \nobreak
    \font\f=#1 at #2\f
    \baselineskip=#3
    \noindent
    \vnchars\par
    \vskip .5\baselineskip
}}

\def\mkfontname#1#2#3{\hbox{%
    \hbox to .25\textwidth{NFSS:\kern1em \texttt{#1}\hss}%
    \hbox to .25\textwidth{TFM:\kern1em \texttt{#2}\hss}%
    PostScript:\kern1em \texttt{#3}}}


\def\HasDesignSizes{\let\hasdesignsizes\relax}

\def\getdesignsize#1{\xdef\designsize{}%
  \expandafter\@tfor\expandafter\x\expandafter:\expandafter=#1
  \do{\ifcat\x0\edef\designsize{\designsize\x}\fi%
    \if\x-\def\designsize{}\fi}}


\def\showletters#1#2#3#4#5#6{%
    \ifx\hasdesignsizes\undefined
      \subsection{#2-#3-#4}{#5}%
    \else
      \getdesignsize{#5}%
      \subsection{#2-#3-#4 (\designsize pt)}{#5}%
    \fi
    \markright{\mkfontname{#1/#2/#3/#4}{#5}{#6}}
    \showfontsize{#5}{18pt}{27pt}
    \showfontsize{#5}{36pt}{54pt}
    \showfontsize{#5}{72pt}{108pt}
    \clearpage
}

\def\showCMfont#1#2#3#4#5#6{
    \showletters{#1}{#2}{#3}{#4}{#5}{#6}
    \clearpage
    \markright{#5}
    \subsection{Text}{#5-text}%
    \showtextsize{%
        \font\f=#5\f 
        \let\EMPH=\relax 
        \let\textit=\relax
        \let\textsc=\relax}
}

\def\showtextsize#1{
    \columnsep=20pt
    \columnseprule=.4pt
    \begin{multicols}{2}
    #1
    \mksample{1}
    \mksample{1.2}
    \mksample{1.4}
    \mksample{1.1}
    \mksample{1.3}
    \mksample{1.5}
    \end{multicols}
    \clearpage
}

\def\showtext#1#2#3#4#5#6{\subsection{Text}{#5-text}%
    \markright{#6 at 8pt}\showtextsize
        {\fontsize{8pt}{8pt}\usefont{#1}{#2}{#3}{#4}}
    \markright{#6 at 10pt}\showtextsize
        {\fontsize{10pt}{10pt}\usefont{#1}{#2}{#3}{#4}}
    \markright{#6 at 12pt}\showtextsize
        {\fontsize{12pt}{12pt}\usefont{#1}{#2}{#3}{#4}}
    \clearpage
}

\def\samplesentence{%
     Hắn nghiến răng vào mà chửi cái đứa đã đẻ ra Chí Phèo làng Vũ Đại}

\newenvironment{shortsample}
    {\normalfont\fontencoding{OT1}\ttfamily \selectfont
     \begin{tabular*}{\textwidth}{llll<{\samplesentence}}
     NFSS&TFM&PostScript&\multicolumn{1}{l}{Sample}\\ \hline
    }
    {\end{tabular*}}

\def\shorttext#1#2#3#4#5#6{%
    #1/#2/#3/#4 & #5 & #6 & \normalsize\usefont{#1}{#2}{#3}{#4}\\}

\ifbookmarks\RequirePackage{hyperref}
  \def\section#1{\gdef\currsec{#1}\hypertarget{#1}{}\pdfbookmark[0]{#1}{#1}}
%\subsection{<Text>}{<label>}
  \def\subsection#1#2{\def\target{\currsec-#2}%
    \hypertarget{\target}{}\pdfbookmark[1]{#1}{\target}}
\fi

\def\title#1{
  \iftest\hypersetup{pdftitle={#1 Test File}}\fi
  \ifsample\hypersetup{pdftitle={#1 Font Samples}}\fi
}

\def\mapfile#1{\ifpdf\IfFileExists{./useinternalmap}{\pdfmapfile{=#1.map}}{}\fi}
\IfFileExists{./nocompress}{\pdfcompresslevel0 }{\pdfcompresslevel9 }

% Local Variables:
% coding: utf-8
% End:
