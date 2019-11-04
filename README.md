# Welcome
These are some examples of packaged and hosted apps for Chrome OS. You can download these, zip them, upload them a Chrome developer account, and then push them to Chrome OS devices in your domain. Alternatively, you can load them into individual Chrome instances as unpacked extensions in developer mode.

If you package these apps and push them to devices, you will need to mark them as private to your domain, because they claim app URLs that belong to other people.

These examples are a work in progress and are **not finished**, but are made available as examples.

## Background
Google stopped maintaining the Chrome Web Store and it's now a toxic, scam-ridden hellscape, but it remains the only supported mechanism for pushing app and extension installs to new sign-ins on Chrome OS devices.

This repository contains a selection of common, mainstream applications that are either unavailable in the Chrome Web Store or are poorly supported. Some effort is made to keep these apps up to date with the correct URLs and icons, and maintain their availability in the store.

If you use Chrome OS devices as part of a business continuity process, these apps should allow you to push common applications to any Chrome OS device that signs into your G Suite domain, allowing you to make the desktop experience more immediately friendly and familiar.

Some apps are simple bookmarks ("hosted", in the Chrome API sense), while others inject more complex code to manage behaviour and compatibility issues ("packaged" in the Chrome API sense). Both of these models for application development are poorly supported in recent versions of Chrome and the entire API should be considered obsolete. Google's preferred replacement are PWA ("progressive web apps"), but these are not well supported by the G Suite admin console yet. In addition, the chances of every mainstream SaaS product suddenly being rewritten to Google's specific definition of PWA is approximately zero, so this repository serves as a stopgap in the meantime.

NB: You don't need to use these for personal use. Recent builds of Chrome OS include the ability to create shortcuts in the launcher to any web page. These apps are intended for use by G Suite administrators, or where the web app has a bad or non-existent manifest, icon or title.

**Security warning:** Due to a poorly-designed security feature in the Chrome Web Store, anyone with commit access to this repository can change the URL that these apps load, allowing them to capture credentials or cause other disruption. You should audit anything you download, and make your own fork to upload packages to the Chrome Web Store. If you do not understand this risk, you should not use these apps. No warranty is given, express or implied.

## Alternatives
If you need a packaged app for personal use and are finding the code here a little scary, you can use [Applicationize](https://applicationize.me/) to generate unsigned Chrome extensions you can install locally.