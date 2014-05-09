mkdir tarballs
wget -i langs.txt --directory-prefix=tarballs
for filename in tarballs/*.tar.gz
do
  tar zxvf $filename
done

