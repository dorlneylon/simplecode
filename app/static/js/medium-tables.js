!function(a,b){"use strict";var c="object"==typeof module&&process&&process.versions&&process.versions.electron;c||"object"!=typeof module?"function"==typeof define&&define.amd?define(function(){return b}):a.MediumEditorTable=b:module.exports=b}(this,function(){"use strict";function a(a){return a.getSelection?a.getSelection().toString():a.selection&&"Control"!==a.selection.type?a.selection.createRange().text:""}function b(a){var b=a.getSelection().anchorNode,c=b&&3===b.nodeType?b.parentNode:b;return c}function c(a,b,c){if(void 0!==a.getSelection&&b){var d=a.createRange(),e=a.getSelection();c?d.setStartBefore(b):d.setStartAfter(b),d.collapse(!0),e.removeAllRanges(),e.addRange(d)}}function d(a,b){if(!a)return!1;for(var c=a.parentNode,d=c.tagName.toLowerCase();"body"!==d;){if(d===b)return!0;if(c=c.parentNode,!c||!c.tagName)return!1;d=c.tagName.toLowerCase()}return!1}function e(a,b){var c=!(!a||!a.tagName)&&a.tagName.toLowerCase();if(!c)return!1;for(;c&&"body"!==c;){if(c===b)return a;a=a.parentNode,c=!(!a||!a.tagName)&&a.tagName.toLowerCase()}}function f(a,b,c,d){return this.init(a,b,c,d)}function g(a){return this.init(a)}function h(a){return this.init(a)}f.prototype={init:function(a,b,c,d){return this._root=a,this._callback=b,this.rows=c,this.columns=d,this._render()},setCurrentCell:function(a){this._currentCell=a},markCells:function(){[].forEach.call(this._cellsElements,function(a){var b={column:parseInt(a.dataset.column,10),row:parseInt(a.dataset.row,10)},c=this._currentCell&&b.row<=this._currentCell.row&&b.column<=this._currentCell.column;c===!0?a.classList.add("active"):a.classList.remove("active")}.bind(this))},_generateCells:function(){var a=-1;this._cells=[];for(var b=0;b<this.rows*this.columns;b++){var c=b%this.columns;0===c&&a++,this._cells.push({column:c,row:a,active:!1})}},_html:function(){var a=this.columns*k+2*l,b=this.rows*k+2*l,c='<div class="medium-editor-table-builder-grid clearfix" style="width:'+a+"px;height:"+b+'px;">';return c+=this._cellsHTML(),c+="</div>"},_cellsHTML:function(){var a="";return this._generateCells(),this._cells.map(function(b){a+='<a href="#" class="medium-editor-table-builder-cell'+(b.active===!0?" active":"")+'" data-row="'+b.row+'" data-column="'+b.column+'">',a+="</a>"}),a},_render:function(){this._root.innerHTML=this._html(),this._cellsElements=this._root.querySelectorAll("a"),this._bindEvents()},_bindEvents:function(){[].forEach.call(this._cellsElements,function(a){this._onMouseEnter(a),this._onClick(a)}.bind(this))},_onMouseEnter:function(a){var b,c=this;a.addEventListener("mouseenter",function(){clearTimeout(b);var a=this.dataset;b=setTimeout(function(){c._currentCell={column:parseInt(a.column,10),row:parseInt(a.row,10)},c.markCells()},50)})},_onClick:function(a){var b=this;a.addEventListener("click",function(a){a.preventDefault(),b._callback(this.dataset.row,this.dataset.column)})}},g.prototype={init:function(a){this.options=a,this._doc=a.ownerDocument||document,this._root=this._doc.createElement("div"),this._root.className="medium-editor-table-builder",this.grid=new f(this._root,this.options.onClick,this.options.rows,this.options.columns),this._range=null,this._toolbar=this._doc.createElement("div"),this._toolbar.className="medium-editor-table-builder-toolbar";var b=this._doc.createElement("span");b.innerHTML="Row:",this._toolbar.appendChild(b);var c=this._doc.createElement("button");c.title="Add row before",c.innerHTML='<i class="fa fa-long-arrow-up"></i>',c.onclick=this.addRow.bind(this,!0),this._toolbar.appendChild(c);var d=this._doc.createElement("button");d.title="Add row after",d.innerHTML='<i class="fa fa-long-arrow-down"></i>',d.onclick=this.addRow.bind(this,!1),this._toolbar.appendChild(d);var e=this._doc.createElement("button");e.title="Remove row",e.innerHTML='<i class="fa fa-close"></i>',e.onclick=this.removeRow.bind(this),this._toolbar.appendChild(e);var g=this._doc.createElement("span");g.innerHTML="Column:",this._toolbar.appendChild(g);var h=this._doc.createElement("button");h.title="Add column before",h.innerHTML='<i class="fa fa-long-arrow-left"></i>',h.onclick=this.addColumn.bind(this,!0),this._toolbar.appendChild(h);var i=this._doc.createElement("button");i.title="Add column after",i.innerHTML='<i class="fa fa-long-arrow-right"></i>',i.onclick=this.addColumn.bind(this,!1),this._toolbar.appendChild(i);var j=this._doc.createElement("button");j.title="Remove column",j.innerHTML='<i class="fa fa-close"></i>',j.onclick=this.removeColumn.bind(this),this._toolbar.appendChild(j);var k=this._doc.createElement("button");k.title="Remove table",k.innerHTML='<i class="fa fa-trash-o"></i>',k.onclick=this.removeTable.bind(this),this._toolbar.appendChild(k);var l=this._root.childNodes[0];this._root.insertBefore(this._toolbar,l)},getElement:function(){return this._root},hide:function(){this._root.style.display="",this.grid.setCurrentCell({column:-1,row:-1}),this.grid.markCells()},show:function(a){this._root.style.display="block",this._root.style.left=a+"px"},setEditor:function(a,b){if(this._range=a,this._toolbar.style.display="block",b){var c=this._doc.getElementsByClassName("medium-editor-table-builder-grid");c[0].style.display="none"}},setBuilder:function(){this._range=null,this._toolbar.style.display="none";var a=this._doc.getElementsByClassName("medium-editor-table-builder-grid");a[0].style.display="block";for(var b=0;b<a.length;b++)a[b].style.height=k*this.rows+2*l+"px",a[b].style.width=k*this.columns+2*l+"px"},getParentType:function(a,b){var c=!(!a||!a.nodeName)&&a.nodeName.toLowerCase();if(!c)return!1;for(;c&&"body"!==c;){if(c===b)return a;a=a.parentNode,c=!(!a||!a.nodeName)&&a.nodeName.toLowerCase()}},addRow:function(a,b){b.preventDefault(),b.stopPropagation();for(var c,d=this.getParentType(this._range,"tbody"),e=this.getParentType(this._range,"tr"),f=this._doc.createElement("tr"),g=0;g<e.childNodes.length;g++)c=this._doc.createElement("td"),c.appendChild(this._doc.createElement("br")),f.appendChild(c);a!==!0&&e.nextSibling?d.insertBefore(f,e.nextSibling):a===!0?d.insertBefore(f,e):d.appendChild(f),this.options.onClick(0,0)},removeRow:function(a){a.preventDefault(),a.stopPropagation();var b=this.getParentType(this._range,"tbody"),c=this.getParentType(this._range,"tr");b.removeChild(c),this.options.onClick(0,0)},addColumn:function(a,b){b.preventDefault(),b.stopPropagation();for(var c,d=this.getParentType(this._range,"tr"),e=this.getParentType(this._range,"td"),f=Array.prototype.indexOf.call(d.childNodes,e),g=this.getParentType(this._range,"tbody"),h=0;h<g.childNodes.length;h++)c=this._doc.createElement("td"),c.appendChild(this._doc.createElement("br")),a===!0?g.childNodes[h].insertBefore(c,g.childNodes[h].childNodes[f]):g.childNodes[h].childNodes[f].nextSibling?g.childNodes[h].insertBefore(c,g.childNodes[h].childNodes[f].nextSibling):g.childNodes[h].appendChild(c);this.options.onClick(0,0)},removeColumn:function(a){a.preventDefault(),a.stopPropagation();for(var b=this.getParentType(this._range,"tr"),c=this.getParentType(this._range,"td"),d=Array.prototype.indexOf.call(b.childNodes,c),e=this.getParentType(this._range,"tbody"),f=e.childNodes.length,g=0;g<f;g++)e.childNodes[g].removeChild(e.childNodes[g].childNodes[d]);this.options.onClick(0,0)},removeTable:function(a){a.preventDefault(),a.stopPropagation();var b=this.getParentType(this._range,"tr"),c=this.getParentType(this._range,"td"),d=(Array.prototype.indexOf.call(b.childNodes,c),this.getParentType(this._range,"table"));d.parentNode.removeChild(d),this.options.onClick(0,0)}};var i=9;h.prototype={init:function(a){this._editor=a,this._doc=this._editor.options.ownerDocument,this._bindTabBehavior()},insert:function(a,b){var d=this._html(a,b);this._editor.pasteHTML('<table class="medium-editor-table" id="medium-editor-table" width="100%"><tbody id="medium-editor-table-tbody">'+d+"</tbody></table>",{cleanAttrs:[],cleanTags:[]});var e=this._doc.getElementById("medium-editor-table"),f=this._doc.getElementById("medium-editor-table-tbody");0===$(e).find("#medium-editor-table-tbody").length&&$(f).detach().appendTo(e),f.removeAttribute("id"),e.removeAttribute("id"),c(this._doc,e.querySelector("td"),!0),this._editor.checkSelection()},_html:function(b,c){var d,e,f="",g=a(this._doc);for(d=0;d<=b;d++){for(f+="<tr>",e=0;e<=c;e++)f+="<td>"+(0===d&&0===e?g:"<br />")+"</td>";f+="</tr>"}return f},_bindTabBehavior:function(){var a=this;[].forEach.call(this._editor.elements,function(b){b.addEventListener("keydown",function(b){a._onKeyDown(b)})})},_onKeyDown:function(a){var f,g=b(this._doc);a.which===i&&d(g,"table")&&(a.preventDefault(),a.stopPropagation(),f=this._getTableElements(g),a.shiftKey?this._tabBackwards(g.previousSibling,f.row):(this._isLastCell(g,f.row,f.root)&&this._insertRow(e(g,"tbody"),f.row.cells.length),c(this._doc,g)))},_getTableElements:function(a){return{cell:e(a,"td"),row:e(a,"tr"),root:e(a,"table")}},_tabBackwards:function(a,b){a=a||this._getPreviousRowLastCell(b),c(this._doc,a,!0)},_insertRow:function(a,b){var c,d=document.createElement("tr"),e="";for(c=0;c<b;c+=1)e+="<td><br /></td>";d.innerHTML=e,a.appendChild(d)},_isLastCell:function(a,b,c){return b.cells.length-1===a.cellIndex&&c.rows.length-1===b.rowIndex},_getPreviousRowLastCell:function(a){if(a=a.previousSibling)return a.cells[a.cells.length-1]}};var j,k=16,l=1;return j=MediumEditor.extensions.form.extend({name:"table",aria:"create table",action:"table",contentDefault:"TBL",contentFA:'<i class="fa fa-table"></i>',handleClick:function(a){a.preventDefault(),a.stopPropagation(),this[this.isActive()===!0?"hide":"show"]()},hide:function(){this.setInactive(),this.builder.hide()},show:function(){this.setActive();var a=MediumEditor.selection.getSelectionRange(this.document);"td"===a.startContainer.nodeName.toLowerCase()||"td"===a.endContainer.nodeName.toLowerCase()||MediumEditor.util.getClosestTag(MediumEditor.selection.getSelectedParentElement(a),"td")?this.builder.setEditor(MediumEditor.selection.getSelectedParentElement(a),this.restrictNestedTable):this.builder.setBuilder(),this.builder.show(this.button.offsetLeft)},getForm:function(){return this.builder||(this.builder=new g({onClick:function(a,b){(a>0||b>0)&&this.table.insert(a,b),this.hide()}.bind(this),ownerDocument:this.document,rows:this.rows||10,columns:this.columns||10}),this.table=new h(this.base)),this.builder.getElement()}})}());