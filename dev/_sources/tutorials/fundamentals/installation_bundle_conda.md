---
jupyter:
  jupytext:
    formats: ipynb,md
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.13.0
  kernelspec:
    display_name: Python 3 (ipykernel)
    language: python
    name: python3
---

# How to install napari as a bundled app

napari can be installed as a bundled app on [MacOS](#how-to-install-the-macos-bundle), [Windows](#how-to-install-the-windows-bundle), and [Linux](#how-to-install-the-linux-bundle) with a simple one click download and guided installation process. This installation method is best if you mainly want to use napari as a standalone GUI app. However, certain plugins may not be supported.

```{note}
If you want to use napari from Python to programmatically interact with the app, please follow the [Python package installation guide](installation.md#install-as-python-package-recommended). This installation method is recommended to take full advantage of napari's features and to access additional plugins.
```

```{note}
If you want to contribute code back into napari, please follow the [development installation instructions in the contributing guide](napari-contributing).
```

To start, visit the [latest napari release page](https://github.com/napari/napari/releases/latest) and go to the 'Assets' tab and download the file that corresponds to your operating system:

- Windows users will want the `*-Windows-x86_64.exe` installer.
- For macOS users, it depends on the processor. This can be checked by going to Apple menu > About This Mac.
  - For Intel processors, download the `*-macOS-x86_64.pkg` installer
  - For Apple processors, download the `*-macOS-arm64.pkg` installer.
- Linux users will need to choose the `*-Linux-x86_64.sh` installer.

![Cropped screenshot of the GitHub Releases page for napari version 0.4.15. The expanded assets tab shows a number of installers available for different operating systems and architectures. Yellow rectangles highlight the files that correspond to the conda-based installers described in this tutorial.](../assets/tutorials/installation/bundle_02.png)

```{note}
If you are interested in an earlier version of napari, you may access those files by scrolling below the latest release on the [napari release page](https://github.com/napari/napari/releases). The instructions below will work for napari versions 0.4.15 and above.
```

## Prerequisites

This installation method does not have any prerequisites.

### How to install the macOS bundle

Once you have downloaded the appropriate macOS package file, you will have a file with a name like `napari-0.5.0-macOS-x86_64.pkg`. Double click this file to open the installer.

![Cropped screenshot of macOS desktop UI showing the icon of the PKG installer file, and an arrow pointing to the Welcome page in the opened PKG installer.](../assets/tutorials/installation/bundle_04.png)

Click 'Continue' to open the Software License Agreement.

![Cropped screenshot of the License page in an opened PKG installer, showing the BSD 3-Clause License text and four buttons: Print, Save, Go Back and Continue.](../assets/tutorials/installation/bundle_06.png)

After reading this agreement, click 'Continue' to be prompted to agree to the Software License Agreement in order to proceed with installation.

![Cropped screenshot of the License page prompting the user to agree to the napari Software License Agreement. The dialog contains three buttons: Read License, Disagree and Agree.](../assets/tutorials/installation/bundle_07.png)

Click on 'Agree'. On the following page, you will be shown how much space the installation will use and can begin the standard installation by clicking 'Install.'

![Cropped screenshot of the Installation Type page on the PKG installer. It reports the estimated space the installation will use (2.45 GB in this example) and shows four buttons: Change Install Location, Customize, Go Back and Install.](../assets/tutorials/installation/bundle_09.png)

However, if you would like to change the default location for the installation, you may specify a different location by clicking 'Change Install Location…' and following the subsequent prompts before starting the installation.

You can also optionally click on 'Customize' to disable or enable some aspects of the installation process.

The installation progress can be monitored on the following window. Some notifications will appear in the top right corner of your display with further details.

![Cropped screenshot of the Installation page of the PKG installer. This page displays a progress bar at a 10%. In the top right corner, an example of a system notification with the text 'Installing packages. This might take a few minutes' is shown](../assets/tutorials/installation/bundle_10.png)

```{note}
If an error ocurred during the installation, do not close the installer immediately. Before doing so, please inspect the logs by clicking on Window > Installer log or pressing <kbd>⌘</kbd> + <kbd>L</kbd>. In the Detail Level dropdown, choose 'Show All Logs' and click on Save to keep a copy of the contents in a text file. This will be useful if you want to [submit an issue](https://github.com/napari/napari/issues/new/choose).
```

After finishing with no errors, a new page with the text "The installation was successful" will appear, as shown below.

![Cropped screenshot of the final page of the PKG installer, Summary, reporting "The installation was successful" with a green check mark icon. A blue Close button is available.](../assets/tutorials/installation/bundle_11.png)

Click Close to finish. You can now get started using napari! Use Launchpad to open the application.

![Montage of two cropped screenshots. On the left, the macOS finder icon and the Launchpad icon, highlighted with a red circle. On the right, the opened launchpad UI showing a 4x4 grid of applications icon, with napari appearing in the bottom right corner.](../assets/tutorials/installation/bundle_13.png)

```{note}
The first time you open napari you must use the Launchpad, but in subsequent uses, the napari application should show up in Spotlight search (<kbd>⌘</kbd> + <kbd>spacebar</kbd>). The application shortcut will also be available in Finder, under 🏠 [User directory] > Applications.
```

napari comes installed with sample images from scikit-image. Use the dropdown menu File > Open Sample > napari to open a sample image, or open one of your own images using File > Open or dragging and dropping your image onto the canvas.

Next check out our [tutorial on the viewer](viewer.md) or explore any of the pages under the [Usage tab](../../usage.md).

### How to Install the Windows bundle

Once you have downloaded the Windows executable file, you will have a file with a name like `napari-0.5.0-Windows-x86_64.exe`. Double click this file to open the napari Setup.

![Montage of the napari EXE installer icon with an arrow pointing to the Welcome page of the napari EXE installer on Windows.](../assets/tutorials/installation/bundle_17.png)

Click Next to continue and go to the License page. Read the contents and, if you agree, continue by clicking 'I Agree'.

![Cropped screenshot of the License Agreement page of the napari EXE installer. A scrollable text area displays the legal text. Three buttons are available: Back, I Agree, and Cancel.](../assets/tutorials/installation/bundle_18.png)

The recommended installation method is to install napari just for the current user ("Just Me"):

![Cropped screenshot of the Setup Instalation Type page of the napari EXE installer. Two options are available: Just Me (recommended), and All Users (requires admin privileges). At the bottom, three buttons Back, Next and Cancel are displayed.](../assets/tutorials/installation/bundle_19.png)

On the next page you will be shown how much space will be used by the installation and the default destination folder, which can be changed by using the 'Browse' button. Click 'Next' to continue.

![Cropped screenshot of the Choose Install Location page of the napari EXE installer. A text field next to a Browse button shows the default installation path. Additional text below reports the required space for the installation (2.6 GB) and the total space available on disk (61.1 GB). The three buttons at the bottom read Back, Next and Cancel.](../assets/tutorials/installation/bundle_20.png)

On the next page, click 'Install' to start the installation process. Installation progress can be monitored on the following page. By clicking on 'Show details', you can obtain more information on the ongoing tasks. You can right-click on this new text area to copy the contents to the clipboard if needed.

![Cropped screenshot of the Installation process page of the napari EXE installer. A progress bar at around 95% reads "Setting up the package cache...". A button with the text "Show details" is available below. At the bottom of the dialog, three grayed out buttons read Back, Next, and Cancel.](../assets/tutorials/installation/bundle_22.png)

Once installation is complete, you will see the page below. Click 'Finish' to close the installation wizard.

![Cropped screenshot of the final page of the napari EXE installer. It reports that the installation has finished successfully and that the dialog can be closed by clicking on the Finish button at the bottom.](../assets/tutorials/installation/bundle_24.png)

You can now get started using napari! A shortcut to launch napari can be found in the Windows Start menu.

napari comes installed with sample images from scikit-image. Use the dropdown menu File > Open Sample > napari to open a sample image, or open one of your own images using File > Open or dragging and dropping your image onto the canvas.

Next check out our [tutorial on the viewer](viewer.md) or explore any of the pages under the [Usage tab](../../usage.md).

### How to Install the Linux bundle

Once you have downloaded the Linux SH file, you will have a file with a name like `napari-0.5.0-Linux-x86_64.sh`. Open a new terminal window, navigate to the downloads folder (usually `cd ~/Downloads`) and run the command `bash napari-*-Linux-x86_64.sh`.

![Montage of the SH installer icon on Ubuntu, with an arrow pointing to an open terminal instance with a pre-typed command that reads 'bash napari-0.4.14.dev73-Linux-x86_64.sh'.](../assets/tutorials/installation/bundle_28.png)

Press <kbd>Enter</kbd> to display the License Agreement.

![Cropped screenshot of the default Ubuntu terminal displaying the welcome paragraphs of the text-based installer of napari for Linux systems.](../assets/tutorials/installation/bundle_29.png)

Read through the agreement shown below. You must agree to the terms by typing out `yes` and pressing <kbd>Enter</kbd> to continue.

![Cropped screenshot of the default Ubuntu terminal displaying the first paragraphs of a BSD-3 Clause License text.](../assets/tutorials/installation/bundle_30.png)

![Cropped screenshot of the default Ubuntu terminal displaying the last paragraphs of a BSD-3 Clause License text, plus a prompt asking 'Do you accept the license terms?', to which the user must respond 'yes' or 'no'.](../assets/tutorials/installation/bundle_31.png)

Next you will be shown the default location for the installation. You may confirm this location by pressing <kbd>Enter</kbd>. Alternatively, specify a different location by typing out its absolute path. If it does not exist, it will be created. The terminal will then begin the installation process.

![Montage of two instances of the default Ubuntu terminal showing the default installation path, followed by the first extraction steps of the installation process.](../assets/tutorials/installation/bundle_32.png)

If the installation is successful, the terminal will display a message with the text 'Installation finished'.

![Cropped screenshot of the default Ubuntu terminal displaying the last steps of the installation process. The last line of text reads 'installation finished'.](../assets/tutorials/installation/bundle_33.png)

You can now get started using napari! A shortcut to launch napari should appear on your desktop or application menu. Under some Linux desktop environments, you can also search for 'napari' using the desktop search bar.

![Full screenshot of the application menu in the Ubuntu desktop environment. A 6x4 grid of application icons includes the napari icon on the third row, third column, highlighted with a red circle.](../assets/tutorials/installation/bundle_34.png)

![Full screenshot of the Ubuntu search menu, with the query 'napari', displaying some results which include the application icon for the installed napari.](../assets/tutorials/installation/bundle_35.png)

napari comes installed with sample images from scikit-image. Use the dropdown menu File > Open Sample > napari to open a sample image, or open one of your own images using File > Open or dragging and dropping your image onto the canvas.

Next check out our [tutorial on the viewer](viewer.md) or explore any of the pages under the [Usage tab](../../usage.md).
