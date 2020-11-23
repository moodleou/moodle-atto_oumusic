YUI.add("moodle-atto_oumusic-button",function(e,t){var n="moodle-recent-oumusic",r=10,i,s="atto_oumusic",o={CHARACTER:s+"_character",LIBRARY:s+"_library",LIBRARY_GROUPS:s+"_groups",LIBRARY_GROUP_PREFIX:s+"_group",WRAPPER:s+"_wrapper"},u={LIBRARY:"."+o.LIBRARY,LIBRARY_GROUP:"."+o.LIBRARY_GROUPS+" > div > div",LIBRARY_BUTTON:"button"},a={LIBRARY:'<div class="{{CSS.LIBRARY}}"><ul>{{#each library}}<li><a aria-label="{{this.[0]}}" title="{{this.[0]}}" href="#{{../elementid}}_{{../CSS.LIBRARY_GROUP_PREFIX}}_{{@key}}">{{this.[0]}}</a></li>{{/each}}</ul><div class="{{CSS.LIBRARY_GROUPS}}">{{#each library}}<div id="{{../elementid}}_{{../CSS.LIBRARY_GROUP_PREFIX}}_{{@key}}"><div role="toolbar">{{#each this.[1]}}<button class="btn btn-secondary btn-sm {{../../CSS.CHARACTER}}"tabindex="-1" aria-label="{{this.[1]}}" title="{{this.[1]}}"data-character="{{this.[0]}}">{{{this.[0]}}}</button>{{/each}}</div></div>{{/each}}</div></div>'};e.namespace("M.atto_oumusic").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_groupFocus:null,initializer:function(){if(!this.get("capability"))return;this.addButton({icon:"icon",iconComponent:s,callback:this._displayDialogue}),this._groupFocus={};var t=this.get("host");t.on("atto:selectionchanged",function(n){e.soon(e.bind(function(e){t.selectionFilterMatches('span[class*="'+o.WRAPPER+'"]',e.selectedNodes,!1)?this.highlightButtons():this.unHighlightButtons()},this,n))},this)},_displayDialogue:function(){this._currentSelection=this.get("host").getSelection();if(this._currentSelection===!1)return;i||(i=require("core/localstorage"));var t=this.getDialogue({headerContent:M.util.get_string("insertcharacter",s),focusAfterHide:!0,width:550},!0),n=this._getDialogueContent();t.set("bodyContent",n);var r=new e.TabView({srcNode:n}),u=M.util.get_string("recent",s),a=M.util.get_string("recent",s),f="#"+o.LIBRARY_GROUP_PREFIX+"_recent",l=this.getRecentOUMusic(),c="",h=M.util.get_string("recently_selected_symbols",s),p='<div id="atto_oumusic_group_recent_inner">'+h+"</div>";if(l){c=p;for(var d=0;d<l.length;d++){var v=l[d].title,m=l[d].character,g=escape(m),y=g.slice(6),b=y.replace("%3B",";"),w="&amp#"+b,E=String(w);c=c+'<button class="btn btn-secondary btn-sm atto_oumusic_character" '+' tabindex="-1" '+'aria-label="'+v+'" '+'title="'+v+'"'+' data-character="'+E+'">'+m+"</button>"}}var S=new e.Tab({label:u,href:f,content:c,title:a});S.get("panelNode").setAttribute("id",o.LIBRARY_GROUP_PREFIX+"_recent"),r.add(S,0),r.render(),t.show(),e.fire(M.core.event.FILTER_CONTENT_UPDATED,{nodes:new e.NodeList(t.get("boundingBox"))})},_getDialogueContent:function(){var t=e.Handlebars.compile(a.LIBRARY),n=e.Node.create(t({elementid:this.get("host").get("elementid"),component:s,library:this.get("metadata"),CSS:o}));return n.all(u.LIBRARY_GROUP).each(function(e){this._setGroupTabFocus(e,e.one("button")),e.all("button a").setAttribute("tabindex","-1")},this),n.delegate("key",this._groupNavigation,"down:37,39",u.LIBRARY_BUTTON,this),n.delegate("click",this._insertChar,"."+o.CHARACTER,this),n},_insertChar:function(e){var t=e.target.getData("character"),n='<span class="'+o.WRAPPER+'">'+t+"</span>";this.getDialogue({focusAfterHide:null}).hide();var r=this.get("host");r.setSelection(this._currentSelection),r.insertContentAtFocusPoint(n),this.markUpdated(),this.addCharacterToRecent(e)},_groupNavigation:function(e){e.preventDefault();var t=e.currentTarget,n=t.get("parentNode"),r=n.all("button"),i=e.keyCode!==37?1:-1,s=r.indexOf(t),o;s<0&&(s=0),s+=i,s<0?s=r.size()-1:s>=r.size()&&(s=0),o=r.item(s),this._setGroupTabFocus(n,o),o.focus()},_setGroupTabFocus:function(e,t){var n=e.generateID();typeof this._groupFocus[n]!="undefined"&&this._groupFocus[n].setAttribute("tabindex","-1"),this._groupFocus[n]=t,t.setAttribute("tabindex",0),e.setAttribute("aria-activedescendant",t.generateID())},addCharacterToRecent:function(e){var t=this.getRecentOUMusic(),n=e.target.getAttribute("data-character"),i=e.target.getAttribute("title"),s={title:i,character:n},o=[s];if(t)for(var u=0;u<t.length;u++)t[u].character!=n&&typeof t[u].character!="undefined"&&t[u].character.length>1&&o.push(t[u]);o=o.slice(0,r),this.saveRecentOUMusic(o)},getRecentOUMusic:function(){var e=[],t="";return t=i.get(n),e=JSON.parse(t),e},saveRecentOUMusic:function(e){i.set(n,JSON.stringify(e))}},{ATTRS:{capability:{value:!1},metadata:{}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin","moodle-core-event","tabview"]});
