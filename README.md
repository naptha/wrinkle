wrinkle
=======

a little nodejs server and script that extracts letters from images via tesseract


this is used by project naptha


it's also a reference to my childhood


and by childhood, i mean sixth grade reading circles


# Chapter 1: Gitting stuff ready

	sudo apt-get install git-core subversion build-essential
	
	sudo apt-get install autoconf automake libtool libpng12-dev libjpeg-dev libtiff-dev zlib1g-dev

	git clone https://github.com/antimatter15/wrinkle.git

	cd wrinkle

# Chapter 2: finding fermions

	wget http://www.leptonica.org/source/leptonica-1.70.tar.gz

	tar xvf leptonica*.tar.gz

	cd leptonica*

	./configure

	make

	sudo make install

	cd ..


# Chapter 3: subversive synthesis

	svn checkout http://tesseract-ocr.googlecode.com/svn/trunk/ tesseract-ocr-read-only

	cd tesseract-ocr-read-only

	./autogen.sh

	./configure

	make

	sudo make install

	sudo ldconfig

	cd ..


# Chapter 4: wat

	sudo apt-get install nodejs npm
	sudo apt-get install imagemagick

	g++ tessrec.cpp -o tessrec -I/usr/local/include/leptonica -I/usr/local/include/tesseract -ltesseract -llept

	npm install multiparty tmp

# Chapter 5: hank ford

	sudo apt-get install subversion
	
