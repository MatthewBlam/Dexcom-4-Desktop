import subprocess
import time
import sys
import os


class Clown(Exception):
    pass


class CommandError(Clown):
    def __init__(self, message):
        sys.exit(message)


def command(cmd):
    out = subprocess.getstatusoutput(cmd)
    time.sleep(2)
    if out[0] == 0:
        return out[1]
    else:
        raise CommandError(f'Command Error: {out[1]}')


def python_version():
    version = str(command('python -V').split()[1][0])
    word = 'python'
    if version == '2':
        word = 'python3'
    return word


class WindowsSetup:
    def __init__(self):
        if os.path.isdir('windows_run'):
            print('Already ran windows_setup.py')
            return
        os.makedirs('windows_run')
        self.current_directory = os.getcwd()
        self.python = python_version()
        self.make_bat()
        self.make_vbs()
        self.make_shortcut()

    def make_bat(self):
        with open('windows_run/d4d.bat', 'w') as f:
            f.write(f'@echo off\ncd {self.current_directory}\n{self.python} dexcom4desktop.py %*')
        time.sleep(0.2)

    def make_vbs(self):
        with open('windows_run/d4d.vbs', 'w') as f:
            f.write(f'CreateObject("Wscript.Shell").Run "{self.current_directory}\\windows_run\\d4d.bat",0,True')
        time.sleep(0.2)

    def make_shortcut(self):
        with open('CreateShortcut.vbs', 'w') as f:
            f.write(f'Set oWS = WScript.CreateObject("WScript.Shell")\nsLinkFile = "{self.current_directory}\\d4d.lnk"\nSet oLink = oWS.CreateShortcut(sLinkFile)\noLink.TargetPath = "{self.current_directory}\\windows_run\\d4d.vbs"\noLink.IconLocation = "{self.current_directory}\\web\\dexcom.ico, 0"\noLink.Save')
        time.sleep(0.2)
        command('start CreateShortcut.vbs')
        time.sleep(0.2)
        os.remove('CreateShortcut.vbs')
        time.sleep(0.2)
        os.rename('d4d.lnk', 'Dexcom 4 Desktop.lnk')


if __name__ == '__main__':
    WindowsSetup()
