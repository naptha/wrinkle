wrinkle
=======

a little nodejs server and script that extracts letters from images via tesseract


this is used by project naptha


it's also a reference to my childhood


and by childhood, i mean sixth grade reading circles


#### Installing

	sudo apt-get install git-core subversion build-essential
	sudo apt-get install nodejs npm
	sudo apt-get install autoconf automake libtool libpng12-dev libjpeg-dev libtiff-dev zlib1g-dev

	git clone https://github.com/antimatter15/wrinkle.git

	cd wrinkle

	svn checkout http://tesseract-ocr.googlecode.com/svn/trunk/ tesseract-ocr-read-only

	wget http://www.leptonica.org/source/leptonica-1.70.tar.gz

	tar xvf leptonica*.tar.gz

	cd leptonica*

	./configure

	make

	sudo make install

	cd ..

	cd tesseract-ocr-read-only

	./autogen.sh

	./configure

	make

	sudo make install

	sudo ldconfig

	cd ..

	g++ tessrec.cpp -o tessrec -I/usr/local/include/leptonica -I/usr/local/include/tesseract -ltesseract -llept
	

Then it should commence the long process of hammering google code's download server, like the android played by michael fassbender in the artsy prologue of prometheus until it can understand all human language.

	wget https://tesseract-ocr.googlecode.com/files/tesseract-ocr-3.02.02.tar.gz

	tar xvf tesseract-ocr*.tar.gz

