#! /bin/sh

OUTPUT_DIR=build


# cleanup
echo "Preparing..."
rm -rf $OUTPUT_DIR
mkdir $OUTPUT_DIR

# add meta files
cp manifest.json $OUTPUT_DIR/manifest.json
cp icon.png $OUTPUT_DIR/icon.png


# build dashboard page
echo "1. Building dashboard page..."
cd dashboard
yarn build
cp -a dist/. ../$OUTPUT_DIR/
cd ..

# build worker
echo "2. Building worker scripts..."
tsc worker/background.ts --outDir $OUTPUT_DIR


echo "Done."