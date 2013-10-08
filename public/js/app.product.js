(function(){!function(){"use strict";var a;return null==window.myapp&&(window.myapp={}),a=window.myapp,a.model={},a.collection={},a.view={main:{},sub:{}},a.util={}}()}).call(this),function(){(function(a){"use strict";var b;return b=function(){function a(){}return a.prototype.sync=function(a,b,c){var d,e,f;return c.error=function(){return window.location="#/error/"},f=function(d){return null!=d&&(c.success=d),Backbone.sync(a,b,c)},b.storageKey?(e=c.success,"delete"===a?f(function(a){return b.removeStorage(),e(a)}):"read"===a&&(d=b.getStorage(),null!=d)?e(d):f(function(c){return b.saveStorage(a,c),e(c)})):f()},a}(),a.CacheSync=new b}).call(this,myapp.util)}.call(this),function(){!function(){"use strict";var a,b;return b=this,a=function(){function a(){this.storage=sessionStorage}return a.prototype.get=function(a){return this.storage.getItem(a)},a.prototype.set=function(a,b){return this.storage.setItem(a,b)},a.prototype.remove=function(a){return this.storage.removeItem(a)},a.prototype.clear=function(){return this.storage.clear()},a}(),myapp.util.Storage=new a}()}.call(this),function(){(function(a,b){"use strict";return a.Base=Backbone.Model.extend({storageKey:null,sync:b.CacheSync.sync,getStorage:function(){var a;return a=b.Storage.get(this.storageKey),null!=a?JSON.parse(a):void 0},saveStorage:function(a,c){return b.Storage.set(this.storageKey,JSON.stringify(c))},removeStorage:function(){return b.Storage.remove(this.storageKey)}})}).call(this,myapp.model,myapp.util)}.call(this),function(){(function(a){"use strict";return a.User=a.Base.extend({urlRoot:"/api/users/",initialize:function(a){return this.storageKey="model:user:"+a.id,this.name=a.name},say:function(){return"I am "+this.name}})}).call(this,myapp.model)}.call(this),function(){(function(a,b,c){"use strict";return b.Base=Backbone.Collection.extend({storageKey:null,sync:c.CacheSync.sync,model:a.Base,getStorage:function(){var b,d,e,f,g,h;if(f=c.Storage.get(this.storageKey),null!=f){for(d=[],g=0,h=f.length;h>g;g++){if(e=f[g],a=new this.model({id:e}),b=c.Storage.get(a.storageKey),null==b)return;d.push(b)}return d}},saveStorage:function(b,d){var e,f,g,h;for(f=[],g=0,h=d.length;h>g;g++)e=d[g],f.push(e.id),a=new this.model({id:e.id}),c.Storage.set(a.storageKey,JSON.stringify(e));return c.Storage.set(this.storageKey,JSON.stringify(f))},removeStorage:function(){var b,d,e,f,g;for(d=c.Storage.get(this.storageKey),c.Storage.remove(this.storageKey),g=[],e=0,f=d.length;f>e;e++)b=d[e],a=new this.model({id:b}),g.push(c.Storage.remove(a.storageKey));return g}})}).call(this,myapp.model,myapp.collection,myapp.util)}.call(this),function(){(function(a,b){"use strict";return b.Users=b.Base.extend({url:"/api/users/",model:a.User,storageKey:"collection:users"})}).call(this,myapp.model,myapp.collection)}.call(this),function(){(function(a,b){"use strict";return a.Base=Backbone.View.extend({render:function(a){return this.$el.html(this.tmpl(a))}},{JST:function(a){return b[a]}})}).call(this,myapp.view,myapp.JST)}.call(this),function(){(function(a){"use strict";return a.MainView=a.Base.extend({el:$("#mainview")})}).call(this,myapp.view)}.call(this),function(){(function(a){"use strict";return a.SubView=a.Base.extend({el:$("#subview")})}).call(this,myapp.view)}.call(this),function(){(function(a,b){"use strict";return b.Default=a.extend({tmpl:a.JST("main/default"),show:function(a){return this.render(a)}})}).call(this,myapp.view.MainView,myapp.view.main)}.call(this),function(){(function(a,b){"use strict";return b.Top=a.extend({tmpl:a.JST("main/top")})}).call(this,myapp.view.MainView,myapp.view.main)}.call(this),function(){(function(a,b){"use strict";return b.Friends=a.extend({tmpl:a.JST("sub/friends"),show:function(a){return this.render({friends:a})}})}).call(this,myapp.view.SubView,myapp.view.sub)}.call(this),function(){(function(a,b){"use strict";return b.My=a.extend({tmpl:a.JST("sub/my"),show:function(a){return this.render(a)}})}).call(this,myapp.view.SubView,myapp.view.sub)}.call(this),function(){(function(a,b){"use strict";return b.Top=a.extend({tmpl:a.JST("sub/top")})}).call(this,myapp.view.SubView,myapp.view.sub)}.call(this),function(){(function(a,b,c){"use strict";var d;return d=Backbone.Router.extend({routes:{"":"top","my/":"my","friends/":"friends"},top:function(){return(new b.sub.Top).render(),(new b.main.Top).render()},my:function(){var c;return c=new a.User({id:1}),c.fetch({success:function(){var a;return a=c.toJSON(),(new b.main.Default).show(a),(new b.sub.My).show(a)}})},friends:function(){var d;return d=new c.Users,d.fetch({success:function(){var c;return(new b.sub.Friends).show(d.toJSON()),c=new a.User({id:1}),c.fetch({success:function(){return(new b.main.Default).show(c.toJSON())}})}})}}),myapp.Router=new d,Backbone.history.start()}).call(this,myapp.model,myapp.view,myapp.collection)}.call(this),function(){(function(a){"use strict";var b;return b=function(){function b(){a.Storage.clear(),$.ajaxSettings.timeout=5e3,$.ajaxSettings.xhr=function(){var a;return a=new XMLHttpRequest}}return b}(),myapp.App=new b}).call(this,myapp.util)}.call(this);