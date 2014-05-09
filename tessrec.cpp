#include <baseapi.h>
#include <allheaders.h>
#include <sys/time.h>
#include <stdio.h>

// g++ tessrec.cpp -o tessrec -I/usr/local/include/leptonica -I/usr/local/include/tesseract -ltesseract -llept

int main(int argc, char* argv[]) {
	tesseract::TessBaseAPI *tess = new tesseract::TessBaseAPI();

	if (tess->Init(NULL, argv[1])) {
	  fprintf(stderr, "Could not initialize tesseract.\n");
	  exit(1);
	}

	tess->SetVariable("save_best_choices", "T");
	// tess->SetVariable("tessedit_char_whitelist", "ABCDEFGHIJKLMNOPQRSTUVWXYZ");

	Pix *pix = pixRead(argv[2]);
	tess->SetImage(pix);
	tess->Recognize(0);

	tesseract::ResultIterator* ri = tess->GetIterator();
	tesseract::ChoiceIterator* ci; 
	FILE * wFile;
	wFile = fopen(argv[3], "w");

	do {
		const char* symbol = ri->GetUTF8Text(tesseract::RIL_SYMBOL);

		if(symbol != 0)
		{
			float conf = ri->Confidence(tesseract::RIL_SYMBOL); 

			int left, top, right, bottom;
			ri->BoundingBox(tesseract::RIL_SYMBOL, &left, &top, &right, &bottom);
			fprintf(wFile, "%d %d %d %d %.0f", left, top, right - left, bottom - top, conf);
			
			if(ri->IsAtBeginningOf(tesseract::RIL_WORD)){
				fprintf(wFile, " SW");

				// bool is_bold, is_italic, is_underlined, is_monospace, is_serif, is_smallcaps;
				// int pointsize, fontid;

				// const char* fontname = ri->WordFontAttributes(&is_bold, &is_italic, &is_underlined, &is_monospace, &is_serif, &is_smallcaps, &pointsize, &fontid);

				// fprintf(wFile, " {%s bold %d serif: %d size: %d}", fontname, is_bold, is_serif, pointsize);
			}

			fprintf(wFile, "\t%s", symbol);
			fprintf(wFile, "\n");


		}

		delete[] symbol;
	} while((ri->Next(tesseract::RIL_SYMBOL)));
	fclose(wFile);

	// [6]
	tess->Clear();
	tess->End();
	// delete [] outText;
	pixDestroy(&pix);
	return 0;
}
