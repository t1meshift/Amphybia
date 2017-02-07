//index.html template
//Dependencies are set in Makefile
function render() {
	var container = new HtmlElement('div','',)
	/*
	Or use T H I S
	return Html.tag('div',
		Html.h('Hello World!')+
		Html.br()+
		Html.tag('p','Lorem ipsim dolor si amet xui peezda\
		Lorem ipsim dolor si amet xui peezda\
		Lorem ipsim dolor si amet xui peezda'),

		{"class": "container"});
		*/
	
}

var kal = new HtmlElement('div', 'container goes here', {"id": "container"});
kal.getChildren() //returns ['container goes here']
kal.setChildren(new HtmlElement('span', 'SOSI XUI'));
kal.getChildren(); //returns [HtmlElement]
kal.appendChild(new HtmlElement('br'));
kal.appendChild(['pis', 'os']);
kal.getChildren(); //returns [HtmlElement, HtmlElement, 'pis', 'os']
//и потом эту залупу превращать в хтмл
kal.getHtml()