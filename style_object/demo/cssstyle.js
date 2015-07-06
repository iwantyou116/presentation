
var CssStyle = (function(W){
    var doc = W['document'], bStyle = doc.createElement('div').style,
        cssEl, sheet, rules, css, stylePrefix,
        index, add, remove, i;

    cssEl = doc.createElement('style');
    doc.getElementsByTagName('head')[0].appendChild(cssEl);

    sheet = cssEl.styleSheet || cssEl.sheet;
    rules = sheet.cssRules || sheet.rules;

    index = function(sel){
        var i = 0, j = rules.length, k;
        for( ; i < j; i++ ){
            if( rules[k = i].selectorText.toLowerCase() == sel ||
                rules[k = j - i - 1].selectorText.toLowerCase() == sel ){
                return k;
            }
        }
    };

    if( sheet.insertRule ){
        add = function(sel){
            sheet.insertRule( sel + '{}', rules.length );
        };
        remove = function(sel){
            sheet.deleteRule( index(sel) );
        };
    }else{
        add = function(sel){
            sheet.addRule( sel, ' ' );
        };
        remove = function(sel){
            sheet.removeRule( index(sel) );
        }
    }

    doc.addEventListener('load',function(){
        for(i in doc.body.style){
            console.log(i);
            stylePrefix = i.indexOf('webkit') !== -1 ? 'webkit' :
                    i.indexOf('ms') !== -1 ? 'ms' :
                    i.indexOf('Moz') !== -1 ? 'Moz' : '';

            if(stylePrefix !== '') return;
        }
    });

    css = function(sel){
        add(sel);
        this.selector = sel;
        this.rule = rules[rules.length - 1];
        this.style = this.rule.style;
    };

    css.prototype.destroy = function(){
        remove(this.selector);
        this.style = this.rule = this.selector = null;
    };

    css.prototype.set = function( prop, val ){
        if( prop == 'opacity' && !( 'opacity' in bStyle ) ){
            this.style['filter'] = 'alpha(opacity=' + parseInt( val * 100 ) + ')';
            return;
        }

        var t0 = prop.replace( /-[a-z]/g, function(_0){return _0.charAt(1).toUpperCase();});

        if( t0 in bStyle || ( t0 = stylePrefix + t0.charAt(0).toUpperCase() + t0.substr(1) ) in bStyle ){
            this.style[t0] = val;
        }
    };

    return css;
})(this);