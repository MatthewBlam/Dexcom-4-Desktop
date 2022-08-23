cd %USERPROFILE%\Desktop
git clone https://github.com/MatthewBlam/Dexcom-4-Desktop.git
cd Dexcom-4-Desktop
del setup.bat
del setup.command

:: First use keyword 'python3', if error, use keyword 'python'
:: <CMD> && <SUCCESS_ACTION> || <FAIL_ACTION>
python3 -V && python3 setup.py || python setup.py

del setup.py
echo 'DONE INSTALLING D4D'
(goto) 2>nul & del "%~f0"
