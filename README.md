#messageResource.js
**messageResource.js** is a simple JavaScript library for reading message resource property files of following format.
```
#example.properties

home.title = My Tile
home.welcome = Welcome Message
description = This is a brief description message.
```
##Basic Usage
[Clik here](https://raw.githubusercontent.com/suhaibkhan/messageResource.js/master/dist/messageResource.min.js) to download compressed version of messageResource.js.  
**OR**  
[Clik here](https://raw.githubusercontent.com/suhaibkhan/messageResource.js/master/dist/messageResource.js) to download uncompressed version of messageResource.js.
####HTML
```html
<!-- Include messageResource.min.js in the html -->
<script src="messageResource.min.js"></script>
```
####JavaScript
```js

// initialize messageResource.js with settings
messageResource.init({
  // path to directory containing message resource files(.properties files),
  // give empty string or discard this configuration if files are in the
  // same directory as that of html file.
  filePath : 'path/messageresource/'
});

// will load the file 'path/messageresource/moduleName.properties'
// and callbackFunction will be executed when loading is complete.
messageResource.load('moduleName', callbackFunction); 
// file name without extension is taken as module name.

// use messageResource.get function to get values from loaded file. 
var value = messageResource.get('sample.key', 'moduleName');

```
###Loading files with locale.
You can also specify locale while loading a file.
```js

// will load the file moduleName_fr_FR.properties.
messageResource.load('moduleName', callbackFunction, 'fr_FR');

// get value based on locale from moduleName_fr_FR.properties.
var value = messageResource.get('sample.key', 'moduleName', 'fr_FR');

```
###Specifying current locale.
You can specify the current locale to remove locale argument from further function calls.
```js

// set current locale
messageResource.setCurrentLocale('fr_FR');

// will load the file moduleName_fr_FR.properties.
messageResource.load('moduleName', callbackFunction);

// get value from file moduleName_fr_FR.properties.
var value = messageResource.get('sample.key', 'moduleName');

```
If current locale is not set, then default locale which is en_US will be taken can as the current locale. You can change the default locale from en_US to another locale.
```js

// initialize messageResource.js with defaultLocale in settings
messageResource.init({
  filePath : 'path/messageresource/',
  defaultLocale : 'en_GB'
});

```
Locale in the file name is not necessary for message resource file corresponding to default locale. 
```js

// initialize messageResource.js
messageResource.init({
  filePath : 'path/messageresource/',
  defaultLocale : 'en_GB'
});

// will load moduleName.properties and data will be saved.
// corrsponding to defaultLocale en_GB
messageResource.load('moduleName', callbackFunction);

// both value and valueWithLocale will be same.
var value = messageResource.get('sample.key', 'moduleName');
var valueWithLocale = messageResource.get('sample.key', 'moduleName', 'en_GB');

// set current locale 
messageResource.setCurrentLocale('fr_FR');

// since current locale and default locale are different, the 
// below statement will load the file moduleName_fr_FR.properties.
messageResource.load('moduleName', callbackFunction);

```
###Specifying different file extension.
By default the expected file extension for message resource files is .properties. You can change this default extension using the following configuration while initializing messageResource.js.
```js

// initialize messageResource.js
messageResource.init({
  filePath : 'path/messageresource/',
  fileExtension : 'txt' // changes file extension to .txt
});

```
## API

#### messageResource 
messageResource variable is added to the global scope.
 
----------------

#### messageResource.init([config])
Initialize messageResource.js with configuration options.
##### Parameters
**config** *Object* : Object with configuration options.  
##### Available configuration options  
**filePath** *String* : Path(directory) containing message resource files to be loaded. Default value is empty string and it points to the same path as that of html file.  
**fileExtension** *String* : File extension of message resource files. Default value is *.properties*.   
**defaultLocale** *String* : Default locale to be used. Default value is *en_US*.  
**fileNameResolver** *Function* : Specify custom file name resolver. Default file name resolver will be used if not specified.  
**ajaxFunction** *Function* : Specify custom ajax function for loading files. The function should accept only 2 arguments, url/path of the file and callback with response text as argument. Default ajax function will be used if not specified.  
**debugMode** *Boolean* : Enable or disable debug mode. Default value is *false*.

----------------------

#### messageResource.setCurrentLocale(locale)
Set current locale to be used. This configured locale will be used by *load* and *get* functions if locale not specified. If current locale is not set then default locale will be used as current locale.
##### Parameters
**locale** *String* : Locale identifier like en_US.

----------------------

#### messageResource.load([module], [locale], [callback])
Loads a message resource file. The file name is constructed based on the given module name and locale. File name is constructed with default configuration in different cases as follows : 
* case 1 : Module name and locale empty or null, then the file name will be *_default.properties*. 
* case 2 : Module name *HomePage* and locale empty, then file name will be *HomePage.properties*.
* case 3 : Module name empty and locale *en_US*, then file name will be *_default_en_US.properties*.
* case 4 : Module name *HomePage* and locale *en_US*, then file name will be *HomePage_en_US.properties*.

##### Parameters
**module** *String* | *Array* : Module name or list of module names to be loaded. By Default it loads module with name *_default*.  
**locale** *String* : Locale identifier like en_US. Current locale will be used as default.  
**callback** *Function* : Callback to be executed after loading message resource.

-----------------------

#### messageResource.get(key, [module], [locale], [defaultValue])
Get value of a property from loaded message resource files.
##### Parameters
**key** *String* : Message resource property key.  
**module** *String* : Module name. Default value is *_default*.  
**locale** *String* : Locale identifier like en_US. Current locale will be used as default.  
**defaultValue** *String* : Default value to return if entry corresponding to the given key not found. By default the given key will be used as default value.  
##### Returns
*String* : Message resource property value corresponding to the key. If entry doesn't exist, then default value will be returned.

-----------------------

## Copyright
Copyright 2014 [Suhaib Khan](http://khansuhaib.wordpress.com/). See [MIT-LICENCE](https://github.com/suhaibkhan/messageResource.js/blob/master/LICENSE) for details.