- responsive, results-div musi sie zmieniac layout flexu jak maly ekran, ogolnie UI results labelu nie jest skonczone.
- chociaz troche wieksze niech te progress bary beda nie 1:1 przelozenie bo to nie widac nic
- zmienic z querySelectorow na jQuery?
- moze back to top button na mobileu
- light / dark theme

==================================================
teraz np masz powiat otwocki i w nim sa wyniki z powiatu otwockiego z pominieciem 
otwocka.

przez to ze orygnialnie w tabelce bylo:

powiat otwock, i powiat otwocki !!!!!

jako 2 rozne powiaty

te z Otwock zostaly usuniete, i przeniesione do miasta,
wiec te z otwocka maja null w powiecie.

jakos mozna probowac to zbindowac ale to bedzie ciezkie bardzo

czyli to jest case gdzie

jest miasto na prawach powiatu, ale w sklad tego powiatu wchodza tez inne miasta.

albo zyrardow i zyrardowski

i wtedy wszyscy glosowali w zyrardowie i dla powiatu zyrardowskiego bylo 0 glosow bo wszystkie
zostaly usuniete.

==================================================

To jest priority bug do naprawienia. wyniki z miast 
bedacych nazwami powiatow maja byc includowane w wynikach 
z tego powiatu.

==================================================

JUTRO:
stestowac dla kazdego data entry czy mapka hula? do tego api key pewnie trzeba