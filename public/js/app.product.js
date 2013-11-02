(function(){!function(){"use strict";var a;return null==window.myapp&&(window.myapp={}),a=window.myapp,a.model={},a.collection={},a.view={},a.util={}}()}).call(this),function(){(function(){"use strict";return this.util.cachedSync=function(a,b,c){var d;return"read"===a&&null!=b.storage&&(d=b.storage.get(),null!=d)?c.success(d):Backbone.sync(a,b,c)}}).call(myapp)}.call(this),function(){(function(){"use strict";var a;return a=function(){function a(a){this.type=a,this.storage="local"===this.type?localStorage:sessionStorage}return a.prototype.get=function(a){return this.storage.getItem(a)},a.prototype.set=function(a,b){return this.storage.setItem(a,b)},a.prototype.remove=function(a){return this.storage.removeItem(a)},a.prototype.clear=function(){return this.storage.clear()},a}(),this.util.sessionStorage=new a("session"),this.util.localStorage=new a("local")}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b;return a=this.JST,b=function(){function b(){var b,c,d,e,f,g,h;g=this.helper;for(c in g)b=g[c],Handlebars.registerHelper(c,b);for(h=this.particles,e=0,f=h.length;f>e;e++)d=h[e],Handlebars.registerPartial(d,a["particle/"+d])}return b.prototype.helper={upperCase:function(a){return a.toUpperCase()}},b.prototype.particles=["user"],b}(),this.Template=b}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b,c;return c=this.view,b=this.model,a=this.collection,this.Router=Backbone.Router.extend({routes:{"":"top","error/":"error","my/":"my","friends/":"friends"},start:function(){return Backbone.history.start()},top:function(){return(new c.Top).render()},error:function(){return(new c.Error).render()},my:function(){var a;return a=new b.User({id:1}),a.fetch({success:function(){return(new c.My).show(a)}})},friends:function(){var b;return b=new a.Users,b.fetch({success:function(){return(new c.Friends).show(b)}})}})}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b,c;return c=this,b=this.util.Storage,a=function(){function a(){this.template=new c.Template,this.router=new c.Router}return a.prototype.setupAjax=function(){return $.ajaxSettings.timeout=5e3,$.ajaxSettings.cache=!1,$.ajaxSettings.xhr=function(){var a;return a=new XMLHttpRequest}},a.prototype.start=function(){return this.setupAjax(),this.router.start()},a}(),c.app=new a}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b,c;return b=this.model,c=this.util,b.Base=Backbone.Model.extend({storage:null,sync:c.cachedSync,initialize:function(b){var c,d,e=this;return null==b&&(b={}),null!=this.storageType?(d=null!=this.idAttribute?this.idAttribute:"id",c=b[d]||"",this.storage=new a("model:"+this.constructor.name+":"+c,this.storageType),this.on("change",function(){return e.storage.set(e.toJSON())}),this.on("destroy",function(){return e.storage.remove()})):void 0}}),a=function(){function a(a,b){switch(this.key=a,b){case"session":this.storage=c.sessionStorage;break;case"local":this.storage=c.localStorage;break;default:throw new Error("storageType is allowed 'session' or 'local'")}}return a.prototype.get=function(){var a;return a=this.storage.get(this.key),null!=a?JSON.parse(a):void 0},a.prototype.set=function(a){return this.storage.set(this.key,JSON.stringify(a))},a.prototype.remove=function(){return this.storage.remove(this.key)},a}()}).call(myapp)}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};(function(){"use strict";var a,c;return a=this.model,a.User=function(a){function d(){return c=d.__super__.constructor.apply(this,arguments)}return b(d,a),d.prototype.urlRoot="/users/",d.prototype.storageType="session",d.prototype.initialize=function(a){return d.__super__.initialize.apply(this,arguments),this.name=a.name},d}(a.Base)}).call(myapp)}.call(this),function(){(function(){"use strict";var a,b,c,d;return c=this.model,b=this.collection,d=this.util,b.Base=Backbone.Collection.extend({storage:null,sync:d.cachedSync,model:c.Base,initialize:function(){var b,c=this;return null!=this.storageType?(this.storage=new a("collection:"+this.constructor.name,this.model,this.storageType),b=function(){return c.storage.set(c.toJSON())},this.on({add:b,remove:b,reset:b,destroy:function(){return c.storage.remove()}})):void 0}}),a=function(){function a(a,b,c){switch(this.key=a,this.model=b,c){case"session":this.storage=d.sessionStorage;break;case"local":this.storage=d.localStorage;break;default:throw new Error("storageType is allowed 'session' or 'local'")}}return a.prototype.get=function(){var a,b,c,d,e,f,g,h;if(e=this.storage.get(this.key),null!=e){for(b=[],e=JSON.parse(e),d=this._getModelIdAttribute(),f={},g=0,h=e.length;h>g;g++){if(c=e[g],f[d]=c,a=new this.model(f).storage.get(),null==a)return;b.push(a)}return b}},a.prototype.set=function(a,b){var c,d,e,f,g,h,i;for(f=[],e=this._getModelIdAttribute(),g={},h=0,i=a.length;i>h;h++)c=a[h],d=c[e],f.push(d),g[e]=d,new this.model(g).storage.set(c,b);return this.storage.set(this.key,JSON.stringify(f))},a.prototype.remove=function(){var a,b,c,d,e;for(b=this.storage.get(this.key),this.storage.remove(this.key),e=[],c=0,d=b.length;d>c;c++)a=b[c],e.push(new this.model({id:a}).storage.remove());return e},a.prototype._getModelIdAttribute=function(){return null!=this.model.prototype.idAttribute?this.model.prototype.idAttribute:"id"},a}()}).call(myapp)}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};(function(){"use strict";var a,c,d;return c=this.model,a=this.collection,a.Users=function(a){function e(){return d=e.__super__.constructor.apply(this,arguments)}return b(e,a),e.prototype.url="/users/",e.prototype.model=c.User,e.prototype.storageType="session",e}(a.Base)}).call(myapp)}.call(this),function(){(function(){"use strict";var a;return a=this.view,a.Base=Backbone.View.extend({el:$("#content"),render:function(a){return this.$el.html(this.tmpl(a)),this}})}).call(myapp)}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};(function(){"use strict";var a,c;return a=this.view,a.Error=function(a){function d(){return c=d.__super__.constructor.apply(this,arguments)}return b(d,a),d.prototype.tmpl=JST.error,d}(a.Base)}).call(myapp)}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};(function(){"use strict";var a,c;return a=this.view,a.Friends=function(a){function d(){return c=d.__super__.constructor.apply(this,arguments)}return b(d,a),d.prototype.tmpl=JST.friends,d.prototype.show=function(a){return this.render({friends:a.toJSON()})},d}(a.Base)}).call(myapp)}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};(function(){"use strict";var a,c;return a=this.view,a.My=function(a){function d(){return c=d.__super__.constructor.apply(this,arguments)}return b(d,a),d.prototype.tmpl=JST.my,d.prototype.show=function(a){return this.render({user:a.toJSON()})},d}(a.Base)}).call(myapp)}.call(this),function(){var a={}.hasOwnProperty,b=function(b,c){function d(){this.constructor=b}for(var e in c)a.call(c,e)&&(b[e]=c[e]);return d.prototype=c.prototype,b.prototype=new d,b.__super__=c.prototype,b};(function(){"use strict";var a,c,d;return a=this.app,c=this.view,c.Top=function(a){function c(){return d=c.__super__.constructor.apply(this,arguments)}return b(c,a),c.prototype.tmpl=JST.top,c}(c.Base)}).call(myapp)}.call(this),function(){!function(){"use strict";return myapp.app.start()}()}.call(this);