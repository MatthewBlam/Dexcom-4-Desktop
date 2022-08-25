#!/bin/bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )/setup.command"

cd ~/Desktop
git clone https://github.com/MatthewBlam/Dexcom-4-Desktop.git
cd Dexcom-4-Desktop
rm setup.bat
rm setup.command

# First use keyword 'python3', if error, use keyword 'python'
# <CMD> && <SUCCESS_ACTION> || <FAIL_ACTION>
python3 -V && python3 setup.py || python setup.py

rm setup.py
cd mac_run

PTH="\$( cd -- \"\$(dirname \"\$0\")\" >/dev/null 2>&1 ; pwd -P )/d4d.command"

touch d4d_startup.cmd
echo '#!/bin/bash' > d4d_startup.cmd
echo $PTH >> d4d_startup.cmd
chmod +x d4d_startup.cmd

echo 'DONE INSTALLING D4D'
rm $SCRIPTPATH
