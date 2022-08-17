<a name="readme-top"></a>



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/MatthewBlam/Dexcom-4-Desktop">
    <img src="web/dexcom.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Dexcom 4 Desktop (D4D) </h3>

  <p align="center">
    Display blood glucose readings on the computer with the same look as the original Dexcom G6 app!
    <br />
    <br />
    <a href="https://github.com/MatthewBlam/Dexcom-4-Desktop/issues">Report Bug</a>
    ·
    <a href="https://github.com/MatthewBlam/Dexcom-4-Desktop/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup">Setup</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#suggestions-and-contributions">Suggestions and Contributions</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![D4D Screen Shot][product-screenshot]](https://github.com/MatthewBlam/Dexcom-4-Desktop)

This project started mainly due to the fact that admittedly, I _may_ ignore my phone just a bit when working on the computer. It serves as a small widget overlay  on the screen, and looks exactly like the Dexcom G6 app to keep a consistent and familiar style. Read below for instructions on how to set it up for yourself!

### Built With

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Electron.js](https://img.shields.io/badge/Electron-191970?style=for-the-badge&logo=Electron&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

<p align="right"><a href="#readme-top">back to top</a></p>



<!-- GETTING STARTED -->
## Getting Started

To get this project running locally, there are a few things you need to do...

### Prerequisites

* [Python &nbsp;&nbsp;&nbsp;≥3.9](https://www.python.org/downloads/)
* [Node.js &nbsp;&nbsp;≥16.15](https://nodejs.org/en/download/)

### Setup

1. Make sure Python and Node.js are installed
   ```shell
   python -V  # may need to use 'python3' keyword
   npm -V
   ```
2. Download or clone the repo, then save the folder in an easy place
   ```shell
   git clone https://github.com/MatthewBlam/Dexcom-4-Desktop.git
   ```
3. Install the necessary Python packages
   ```shell
   pip install eel pydexcom  # May need to use 'pip3' keyword
   ```
4. Install the necessary Node.js packages
   ```python
   cd path\to\project-folder  # Needs to be installed in the project folder
   npm install electron  # Should create folder called 'node_modules'
   ```
5. Finally, run `windows_setup.py` or `mac_setup.py` to create the shortcut launcher `Dexcom 4 Desktop` in your project folder
   ```shell
   python windows_setup.py
   # or
   python mac_setup.py
   ```
Now you can drag the shortcut to your desktop and easily launch D4D from there! See <a href="#pinning-d4d-to-taskbar-on-windows">more directions</a> on pinning D4D to taskbar or adding it to the start menu.

<p align="right"><a href="#readme-top">back to top</a></p>


<!-- USAGE EXAMPLES -->
## Usage

For a walk-through of how to use the program and it's features, please watch <a href="https://raw.githubusercontent.com/MatthewBlam/Dexcom-4-Desktop/main/images/Dexcom%204%20Desktop%20Showcase%20Compressed.mp4?token=GHSAT0AAAAAABXPLAXTMEG5ULWMK7I5YCUMYX4HRPQ">this video</a>.

### Features
* Main Dexcom widget
  * Glucose reading based on Dexcom G6 sensors (from Dexcom Share)
  * Reading unit (mg/dL or mmol/L)
  * Trend indicated by arrow
* Movable menu
   * Settings
     * Opens a form where you can edit and save settings
       * Name (input)
       * Username (input)
       * Password (input)
       * Outside United States (y/n)
       * Military Time (y/n)
       * Unit (mg/dL or mmol/L)
       * Display Info (y/n)
         * If selected yes, a movable info box will become visible displaying the user's name, time that the current reading was recorded, and the delta difference between the current and previous reading.
       * Low (threshold range 60-100)
       * High (threshold range 120-400)
       * Hit the 'Save' button to confirm changes
         * Click outside the settings page or hit the 'esc' key to cancel changes
   * Zoom In & Zoom Out
     * Customize the size of the Dexcom widget
   * Move
     * Move the entire program window around the screen
* Log file `d4d_logs` saved in project directory containing debugging information, print statements, and errors

### Pinning D4D to taskbar on Windows
Pinning D4D to the taskbar makes launching the program incredibly easy. There are some steps you must take as you can't pin the shortcut launcher, unfortunately.
   1. Go into the `windows_run` folder in your project directory and lcoate `d4d.vbs`
   2. Rename `d4d.vbs` to `d4d.exe` and confirm when you are prompted
   3. Right-click `d4d.exe` and select 'Pin to taskbar'
   4. Rename `d4d.exe` back to `d4d.vbs` and confirm again
   5. Right-click the newly created alias in the taskbar, right-click again on 'd4d', and select 'Properties'
   6. Change the last part of the target path from `\d4d.exe` to `\d4d.vbs`
   7. Click the 'Change Icon' button, then locate and select `dexcom.ico` from the `web` folder in your project directory
   8. Apply the changes, logout, and log back to see the changes
   9. Now you should see the Dexcom icon in your taskbar, and clicking it should run D4D!

### Automatically start D4D when login for Windows
You can set D4D to automatically open every time you log in to your computer. Simply navigate to `C:\Users\[User Name]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` and copy the D4D shortcut launcher over. That's it!

<p align="right"><a href="#readme-top">back to top</a></p>



<!-- ROADMAP -->
## Roadmap

- [ ] Test and add support on Linux
- [ ] Multiple instances of the widget to allow monitoring of various people
- [ ] Implement suggestions & fix any bugs
- [ ] Change Electron icon to Dexcom icon on Mac
- [ ] Glass UI

See the [open issues](https://github.com/MatthewBlam/Dexcom-4-Desktop/issues) for a full list of proposed features (and known issues).

<p align="right"><a href="#readme-top">back to top</a></p>



<!-- CONTRIBUTING -->
## Suggestions and Contributions

If you have any suggestions or ideas, please open an issue with the tag "enhancement". All are **greatly appreciated**. You can also fork the repo and create a pull request. Thank you!



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.



<!-- CONTACT -->
## Contact

Matthew Blam - blammatthew@gmail.com

Project Link: [https://github.com/MatthewBlam/Dexcom-4-Desktop](https://github.com/github_username/repo_name)

<p align="right"><a href="#readme-top">back to top</a></p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/D4D%20Project%20Screenshot.png
[logo]: web/dexcom.png
