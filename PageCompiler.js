const MAJOR_VERSION = 0;
const MINOR_VERSION = 1;

var fs = require('fs');
var process = require('process');
var path = require('path');

var Params = {};
var Pages = {
	list: [],
	currentIndex: 0,
	current: function() {
		return this.list[this.currentIndex];
	}
};

function readFile(path) {
	var content = '';
	fs.access(path, fs.R_OK, (err) => {
  		if (err)
  			throw new Error("Can't read file ' "+path+" '!\nMake sure the file exists and can be read.");
  		else
  			content = fs.readFileSync(path, 'utf8');
	});
	return content;
}

function getHtml(source) {
	var html = "";
	for (let i of source) {
		var type = Object.keys(i)[0];
		switch (type) {
			case "plain": 
				html += i[type];
			break;
			//TODO: raw style script from_js comment (maybe inherit)

		}
	}
}

// MAIN PART

//Checking if script is launched correctly
if (process.argv.length < 3) {
	console.log("Usage: ", process.argv[1], ' <path_to_makefile> [output_path]');
	process.exit(0);
}

var makefilePath = process.argv[2];	 							//JSON file
var projectPath = path.dirpath(makefilePath);					//project path
var outputPath = process.argv[3] || projectPath + '/compiled/';	//output path, sets to 'output' in current dir if not set

console.info('Project Amphybia v.'+MAJOR_VERSION+'.'+MINOR_VERSION);
console.info('by t1meshift');
console.info('PRE-ALPHA VERSION!');
try 
{
	//Crucial part
	var json = JSON.parse(readFile(makefilePath));
	if (!(json.site_name && json.pages))
		throw new Error("Incorrect makefile!");
	Params = json;
	Pages.list = Params.pages;
	for (let i of Params.dependencies) { //Resolving dependencies... 
		try 
		{
			console.log('Resolving '+i+' dependency...');
			import * from (projectPath+'/'+i+'.js');
		}
		catch (c) 
		{
			throw new Error('Can\'t resolve dependency '+i+'\n'+c);
		}
	}
} 
catch (e) 
{
	console.error("An error has occured!");
	console.error(e); //TODO: debug it and make more human-readable
	console.error("Closing...");
	process.exit(1);
}
