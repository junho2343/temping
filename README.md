<p align="center"><img width="200" src="https://junho2343.github.io/image/temping_logo.jpg"/></p>


# Temping
Temporary files & directorires easy CREATE and DELETE

> The folder created by the temp module below during parallel processing was deleted by other requests, so I made it myself.   
> Referring to temp module for source-based.    
>  
> https://www.npmjs.com/package/temp
   
## :gear: Installation

### Npm

```
$ npm install temping
```

## :runner: Quick Start

### Example

```
import temping from 'temping'


// tracking
const temp = temping.track();

// create directory 
temp.mkdir();

// clean create directory
temp.clean();
```


## :books: function 

### mkdir
create temporary direcotry and return directory path
```
// /var/folders/cv/qcwshmd52_5bptvrrpclp6y40000gn/T/2021321-9700-4lgcj5cuik
temp.mkdir(); 

// /var/folders/cv/qcwshmd52_5bptvrrpclp6y40000gn/T/junho_2021321-9700-4lgcj5cuik
temp.mkdir("junho_"); 
```


### path
generate random name and return path
```
// /var/folders/cv/qcwshmd52_5bptvrrpclp6y40000gn/T/2021321-9700-4lgcj5cuik
temping.path();

// /var/folders/cv/qcwshmd52_5bptvrrpclp6y40000gn/T/junho_2021321-9700-4lgcj5cuik
temping.path("junho_"); 

// /Users/junho/repo/temping/example/2021321-9700-2amxgp4dmm8
temping.path({ dir: __dirname});

// /Users/junho/repo/temping/example/2021321-9700-2amxgp4dmm8.zip
temping.path({ dir: __dirname, suffix:".zip" });

// /Users/junho/repo/temping/example/junho_2021321-9700-2amxgp4dmm8.zip
temping.path({ dir: __dirname, suffix:".zip", prefix: "junho_" });

// You can use it like this.
const temp = temping.track()
temp.path();
```

### clean
Delete Tracked Folder
```
const temp = temping.track()

const newDir1 = temp.mkdir();
const newDir2 = temp.mkdir();

// delete two directory
temp.clean()

```

