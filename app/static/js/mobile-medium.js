/*! 
 * medium-editor-mobile-plugin v0.0.1 - Mobile support for MediumEditor
 *
 * https://github.com/orthes/medium-editor-mobile-plugin
 * 
 * Copyright (c) 2014 Pavel Linkesch (http://linkesch.sk)
 * Released under the MIT license
 */

!function(a,b){"use strict";MediumEditor.prototype._bindSelect=MediumEditor.prototype.bindSelect,MediumEditor.prototype.bindSelect=function(){return this._bindSelect(),b.documentElement.addEventListener("touchend",this.checkSelectionWrapper),this}}(window,document);