YUI.add("moodle-atto_oumusic-button",function(e,t){var n="atto_oumusic",r={CHARACTER:n+"_character",LIBRARY:n+"_library",LIBRARY_GROUPS:n+"_groups",LIBRARY_GROUP_PREFIX:n+"_group",WRAPPER:n+"_wrapper"},i={LIBRARY:"."+r.LIBRARY,LIBRARY_GROUP:"."+r.LIBRARY_GROUPS+" > div > div",LIBRARY_BUTTON:"button"},s={LIBRARY:'<div class="{{CSS.LIBRARY}}"><ul>{{#each library}}<li><a aria-label="{{this.[0]}}" title="{{this.[0]}}" href="#{{../elementid}}_{{../CSS.LIBRARY_GROUP_PREFIX}}_{{@key}}">{{this.[0]}}</a></li>{{/each}}</ul><div class="{{CSS.LIBRARY_GROUPS}}">{{#each library}}<div id="{{../elementid}}_{{../CSS.LIBRARY_GROUP_PREFIX}}_{{@key}}"><div role="toolbar">{{#each this.[1]}}<button class="btn btn-secondary btn-sm {{../../CSS.CHARACTER}}"tabindex="-1" aria-label="{{this.[1]}}" title="{{this.[1]}}"data-character="{{this.[0]}}">{{{this.[0]}}}</button>{{/each}}</div></div>{{/each}}</div></div>'};e.namespace("M.atto_oumusic").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_groupFocus:null,initializer:function(){if(!this.get("capability"))return;this.addButton({icon:"icon",iconComponent:n,callback:this._displayDialogue}),this._groupFocus={};var t=this.get("host");t.on("atto:selectionchanged",function(n){e.soon(e.bind(function(e){t.selectionFilterMatches('span[class*="'+r.WRAPPER+'"]',e.selectedNodes,!1)?this.highlightButtons():this.unHighlightButtons()},this,n))},this)},_displayDialogue:function(){this._currentSelection=this.get("host").getSelection();if(this._currentSelection===!1)return;var t=this.getDialogue({headerContent:M.util.get_string("insertcharacter",n),focusAfterHide:!0,width:550},!0),r=this._getDialogueContent();t.set("bodyContent",r);var i=new e.TabView({srcNode:r});i.render(),t.show(),e.fire(M.core.event.FILTER_CONTENT_UPDATED,{nodes:new e.NodeList(t.get("boundingBox"))})},_getDialogueContent:function(){var t=e.Handlebars.compile(s.LIBRARY),o=e.Node.create(t({elementid:this.get("host").get("elementid"),component:n,library:this.get("metadata"),CSS:r}));return o.all(i.LIBRARY_GROUP).each(function(e){this._setGroupTabFocus(e,e.one("button")),e.all("button a").setAttribute("tabindex","-1")},this),o.delegate("key",this._groupNavigation,"down:37,39",i.LIBRARY_BUTTON,this),o.delegate("click",this._insertChar,"."+r.CHARACTER,this),o},_insertChar:function(e){var t=e.target.getData("character"),n='<span class="'+r.WRAPPER+'">'+t+"</span>";this.getDialogue({focusAfterHide:null}).hide();var i=this.get("host");i.setSelection(this._currentSelection),i.insertContentAtFocusPoint(n),this.markUpdated()},_groupNavigation:function(e){e.preventDefault();var t=e.currentTarget,n=t.get("parentNode"),r=n.all("button"),i=e.keyCode!==37?1:-1,s=r.indexOf(t),o;s<0&&(s=0),s+=i,s<0?s=r.size()-1:s>=r.size()&&(s=0),o=r.item(s),this._setGroupTabFocus(n,o),o.focus()},_setGroupTabFocus:function(e,t){var n=e.generateID();typeof this._groupFocus[n]!="undefined"&&this._groupFocus[n].setAttribute("tabindex","-1"),this._groupFocus[n]=t,t.setAttribute("tabindex",0),e.setAttribute("aria-activedescendant",t.generateID())}},{ATTRS:{capability:{value:!1},metadata:{}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin","moodle-core-event","tabview"]});