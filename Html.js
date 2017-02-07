class Html {
	static tag(tagname, content, attribs={}) {
		var stringAttrib = "";
		Object.keys(attribs).forEach(function(key) {
  			var val = Html.escape(attribs[key]);
 			stringAttrib += " " + key + "=\"" + val + "\"";
		});
		return '<'+tagname+stringAttrib+'>'+content+"</"+tagname+">";
	}
	static b(content, attribs={}) {
		return Html.tag('b', content, attribs);
	}
	static i(content, attribs={}) {
		return Html.tag('i', content, attribs);
	}
	static s(content, attribs={}) {
		return Html.tag('s', content, attribs);
	}
	static img(src, attribs={}) {
		var stringAttrib = "";
		Object.keys(attribs).forEach(function(key) {
  			var val = Html.escape(attribs[key]);
 			stringAttrib += " " + key + "=\"" + val + "\"";
		});
		return '<img src="'+src+'"' + stringAttrib + ">";
	}
	static br() {
		return "<br>";
	}
	static hr() {
		return "<hr>";
	}
	static h(content, level=1, attribs={}) {
		if (level>6)
			level = 6;
		if (level<1)
			level = 1;
		return Html.tag('h'+level, content, attribs);
	}
	static escape(str) {
		let stro = str.split('');
  		for (let i=0; i < stro.length; i++) {
  			if (stro[i] == '"' || stro[i] == "'") {
  				stro.splice(i, 0, "\\");
  				i++;
  			}
  		}
  		return stro.join('');
	}
}


/*
TODO: 
self-closing tags such as <img>
 */
class HtmlElement {
	constructor(tag, content='', attribs={}, isSelfClosing=false) {
		console.log(tag, content, attribs, typeof attribs)
		this.tag = tag;
		this.content = [];
		this.isSelfClosing = isSelfClosing;
		switch (typeof content) {
			case 'object':
				if (Array.isArray(content)) {
					this.content = content;
				} 
				else {
					this.content.push(content);
				}
			break;

			case 'string':
				this.content.push(content);
			break;

			default:
				throw new Error("Incorrect content");
			break;
		}
		this.attribs = attribs;
	}
	getChildren() {	
		return this.content;
	}
	setChildren(children) {
		this.content = [];
		switch (typeof content) {
			case 'object':
				if (Array.isArray(content)) {
					this.content = content;
				} 
				else {
					this.content.push(content);
				}
			break;

			case 'string':
				this.content.push(content);
			break;

			default:
				throw new Error("Incorrect content");
	}
	appendChild() {
		//we can call it with ANY number of arguments
		if (!arguments)
			throw new Error('No arguments set');
		arguments.forEach(function(a){
			switch (typeof a) {
				case 'object':
					if (Array.isArray(a)) {
						this.appendChild.apply(this,a);
					} 
					else {
						this.content.push(a);
					}
				break;
				case 'string':
					this.content.push(a);
				break;
				default:
					throw new Error("Incorrect argument "+a+" ("+typeof a+")");
				break;
			}
		});
	}
	getChildByAttribs(attribs) {
		if (typeof attribs == 'undefined')
			throw new Error('Search query is not set');
		for (var i of this.content) {
			var matches = true;
			if (typeof i == 'object') {
				Object.keys(attribs).forEach(function(key) {
					if (i.attribs[key] != attribs[key]) {
						matches = false;
					}
				}, i);
				if (matches) {
					return i;
				}
				var r = i.getChildByAttribs(attribs);
				if (r != 0)
					return r;
			}
		}
		return 0;
	}
	setAttribs(attribs) {
		if (typeof attribs!='object' || Array.isArray(attribs))
			throw new Error('Incorrect argument');
		this.attribs = attribs;
	}
	getAttribs() {
		return this.attribs; 
		//TODO: return not linked object maybe
	}
	getHtml() {
		var ret = '<'+this.tag; //opening the tag
		Object.keys(this.attribs).forEach(function(key) { //and set some attributes
  			var val = Html.escape(attribs[key]);
 			ret += " " + key + "=\"" + val + "\"";
		});
		ret += '>'; // the tag is finally opened

		this.content.forEach(function(a){ //so we can parse content
			var htmlCode = '';
			if (typeof a == 'object')
				htmlCode += a.getHtml();

		});

		ret += '</'+this.tag+'>';
	}
}
//var a = new HtmlElement('div',[new HtmlElement('p','shit'),new HtmlElement('p','suck',{"id":"kall"})])
//a.getChildByAttribs({"id":"kall"})