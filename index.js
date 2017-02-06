Window0.prototype.updateStyle = function()
{
	this.el.style.left = this.x + "px";
	this.el.style.top = this.y + "px";
	this.el.style.width = this.w + "px";
	this.el.style.height = this.h + "px";
}

Window0.prototype.push_to_top = function() {
	$(this.el).appendTo("#container");
	win_obj.sort(compare);
	var zcounter = 0
	for(var i = 0; i < win_obj.length; i++)
	{
		if(win_obj[i].id !== this.id)
		{
			win_obj[i].z = zcounter;
			//added line below to set zindex expicitly for Ace text editor
			$(win_obj[i].el).css('z-index',zcounter); 
			zcounter = zcounter+1;
		}
		else
		{
			var topz = win_obj.length-1;
			win_obj[i].z = topz;
			//added line below to set zindex expicitly for Ace text editor
			$(win_obj[i].el).css('z-index',topz); 
		}
	}
}


Window0.prototype.start = function()
{
	$(this.el).appendTo("#container");
}

Window0.prototype.destroy_win = function()
{
	$(this.el).remove();
	for (var i = 0; i < win_obj.length; i++)
	{
		if(win_obj[i] === this)
		{

			//TODO: need to fix this inheritance issue
			if(this.term)
			{
				this.term.destroy();
			}
			win_obj.splice(i,1);
		}
	}
}

//class Ace0
function Ace0(x,y,h,w,z,id0,file_name)
{
	Window0.call(this,x,y,h,w,z,id0);
	heading_div = document.createElement('div'); 
	heading_div.className = "ace-heading";
	this.file_name = file_name;
	$(heading_div).text(this.file_name);
	editor_div = document.createElement('div');
	editor_div.className = "ace";
	editor_div.style.position = "absolute";
	this.rest0.appendChild(heading_div);
	this.rest0.appendChild(editor_div);
	this.id0 = id0;
	//this.rest0.className = "rest0";
	var editor = ace.edit(editor_div);
	editor.setTheme("ace/theme/monokai");
	//TODO: find some solution to z-index to comment these out //done!
	//editor.setHighlightActiveLine(false);
	//editor.renderer.setShowGutter(false);
	var modelist = ace.require("ace/ext/modelist")
	var mode = modelist.getModeForPath(file_name).mode
	editor.getSession().setMode(mode);
	editor.getSession().setUseWrapMode(true);
	console.log("guessing mode: "+mode);
	//editor.getSession().setMode("ace/mode/python");
	//editor.setValue(""); 
	this.editor = editor;
	var this0 = this;
	editor.insert("import os\nprint os\ndef a():\n\tprint 42\n");
}



Ace0.prototype = Object.create(Window0.prototype);

Ace0.prototype.start = function()
{
	Window0.prototype.start.call(this);
}

//class Image0
function Image0(x,y,h,w,z,id0,file_name)
{
	Window0.call(this,x,y,h,w,z,id0);
	heading_div = document.createElement('div'); 
	heading_div.className = "ace-heading";
	this.file_name = file_name;
	$(heading_div).text(this.file_name);
	img_div = document.createElement('img');
	//img_div.className = "ace";
	img_div.style.position = "absolute";
	this.rest0.appendChild(heading_div);
	this.rest0.appendChild(img_div);
	this.id0 = id0;
	var this0 = this;
}

Image0.prototype = Object.create(Window0.prototype);

Image0.prototype.start = function()
{
	Window0.prototype.start.call(this);
}

//class Terminal0
function Terminal0(x,y,h,w,z,id0)
{
	Window0.call(this,x,y,h,w,z,id0);
  	var term = new Terminal();
  	this.term = term;
  	term.open(this.rest0);
  	var this0 = this;

  	this.bar.addEventListener('mousedown', function(ev){ 
  		ev.preventDefault();
  		console.log("mousedown in bar in teminal");
  		$(document).on('mousemove', function(ev2){
  			console.log("mousemove in bar in teminal");
  			this0.termrsz();
  			ev2.preventDefault();
  		});
  		$(document).on('mouseup', function(){
			$(document).off("mousemove");
			$(document).off("mouseup");
		});
  	});

  	term.on('data', function(data)
  	{
  		if(data === '\r')
  			this0.term.write('\r\n');
  		else
  			this0.term.write(data);
  	});

  	this0.term.write('\x1b[31mWelcome to terminal!\x1b[m\r\n');
}

Terminal0.prototype = Object.create(Window0.prototype);

Terminal0.prototype.termrsz = function(ft,ht,wt)
{
	console.log("in termrsz");
	var ft = parseInt($(this.rest0).css("font-size"));
	var ht = $(this.rest0).height();
	var wt = $(this.rest0).width();
	var ft_wt = ft*0.6;
	var res = Math.floor(ht/ft);
	var res_wt = Math.floor(wt/ft_wt)-1;
	this.term.resize(res_wt,res);
	console.log(res_wt+ " " + res);
	this.term.focus();
}

Terminal0.prototype.start = function()
{
	Window0.prototype.start.call(this);
	this.termrsz();
}

//inside callbacks: 
//this is used for the DOM target
//this0 refers to Window0 object
//here  refers to an old DOM target
function Window0(x,y,h,w,z,id0)
{
	this.x = x; this.y = y;
	this.h = h; this.w = w;
	this.z = z;
	this.id = id0;
	this.el = document.createElement('div');
	var el = this.el;
	this.updateStyle();
	el.className = "window0";
	grip = document.createElement('div');
	this.grip = grip;
	this.grip.className = 'grip';
	bar = document.createElement('div');
	this.bar = bar;
	bar.className = 'bar';
	close_btn = document.createElement('div');
	close_btn.className = 'close';
	title_bar = document.createElement('div');
	title_bar.className = 'title';
	rest0 = document.createElement('div');
	rest0.className = 'console';
	this.rest0 = rest0;
	el.appendChild(grip);
	grip.appendChild(close_btn);
	grip.appendChild(title_bar);
	$(title_bar).text(id0);
  	el.appendChild(bar);
  	el.appendChild(rest0);
  	var this0 = this;

  	close_btn.addEventListener('mousedown', function(ev){
  		console.log("close_btn clicked");
  		this0.destroy_win();
  		ev.stopPropagation();
  	});

  	el.addEventListener('mousedown', function(){
  		console.log("window clicked");
		this0.push_to_top();
	});

  	//drag window
  	grip.addEventListener('mousedown', function(ev){ 
  		console.log("grip clicked");
		var here = this;
		$(this0.el).appendTo("#container");
		$(this).css({"cursor":"-moz-grabbing","cursor":"-webkit-grabbing"});
		ev.preventDefault();
		$(document).on('mousemove', function(ev2){
			var new_x = this0.x + ev2.pageX - ev.pageX;
			var new_y = this0.y + ev2.pageY - ev.pageY;
  			if(new_x>0)	{this0.x = new_x;}
  			else{this0.x=0; }
  			if(new_y>0){this0.y = new_y;}
  			else{this0.y=0; }
			this0.updateStyle();
			ev = ev2;
			ev2.preventDefault();
		});

		$(document).on('mouseup', function(){
			$(document).off('mousemove');
			$(here).css({"cursor":"-moz-grab","cursor":"-webkit-grab"});
			//console.log("grip for "+this0.id+" just let go");
			this0.push_to_top();
			$(document).off('mouseup');
		});
  	});

  	//resize window
  	bar.addEventListener('mousedown', function(ev){ 
  		console.log("mousedown in bar in window");
		$(this0.el).appendTo("#container");
		ev.preventDefault();
		$(document).on('mousemove', function(ev2){
			console.log("mousemove in bar in window");
			ev2.preventDefault();
			this0.h = this0.h + ev2.pageY - ev.pageY;
			this0.w = this0.w + ev2.pageX - ev.pageX;
			this0.updateStyle();
			ev = ev2;
		});
		$(document).on('mouseup', function(){
			$(document).off("mousemove");
			//console.log("bar for "+this0.id+" just let go");
			socket0.emit("update_fields",{window0:this0.id,session:0,data:{x:this0.x,y:this0.y,w:this0.w,h:this0.h}});
			this0.push_to_top();
			$(document).off("mouseup");
		});
  	});
}

var socket0;
var win_obj = [];

function compare(a,b) {
  if (a.z < b.z)
    return -1;
  if (a.z > b.z)
    return 1;
  return 0;
}

function expose()
{
	alert("TODO: need to implement this");
}

//TODO: move this back to serverside only
function get_id()
{
    return "a"+Math.floor(Math.random() * 9999999999).toString();
}

function new_window(type_window)
{
	if(type_window === "ace")
	{
		var ace_edit = new Ace0(50,70,250,500,1,get_id(),"/home/ubuntu/a.py");
		ace_edit.start();
		win_obj.push(ace_edit);
	}
	else
	{
		var o1 = new Terminal0(20,40,250,500,1,get_id());
		o1.start();
		win_obj.push(o1);
	}
}

$(function(){
	var o1 = new Terminal0(20,40,250,500,1,get_id());
	var o2 = new Ace0(50,70,250,500,1,get_id(),"/home/ubuntu/a.py");
	o1.start();
	o2.start();
	win_obj.push(o1);
	win_obj.push(o2);

	var sidebar_open = false;
	$("#open-sessions").click(function(){
		if(sidebar_open){
			$("#sidebar").get(0).style.left = "-300px";
			$("#container").get(0).style.left = "0px";
			$("#open-sessions").css("background-color", "grey");
			$("#open-sessions").attr("src","/menu-button-of-three-lines.png");
		}
		else{
			$("#sidebar").get(0).style.left = "0px";
			$("#container").get(0).style.left = "300px";
			$("#open-sessions").css("background-color", "white");
			$("#open-sessions").attr("src","/three-lines-invert.png");
		}
		sidebar_open = !sidebar_open;
	});

});
