//1.JSON.stringify函数在ie6/7中不支持，如何兼容？
if(!window.JSON) {
    window.JSON = {
        parse: function(sJson) {
            return eval("(" + sJSON + ")");
        },
        stringify: function(obj) {
            var result = "";
            for(var key in obj) {
                if(typeof obj[key] == "string") {
                    result += "\"" + key + "\":\"" + obj[key] + "\",";
                } else if(obj[key] instanceof RegExp) {
                    result += "\"" + key + "\":{},";
                } else if(typeof obj[key] == "undefined" || obj[key] instanceof Function) {} else if(obj[key] instanceof Array) {
                    result += "\"" + key + "\":[";
                    var arr = obj[key];
                    for(var item in arr) {
                        if(typeof arr[item] == "string") {
                            result += "\"" + arr[item] + "\",";
                        } else if(arr[item] instanceof RegExp) {
                            result += "{},";
                        } else if(typeof arr[item] == "undefined" || arr[item] instanceof Function) {
                            result += null + ",";
                        } else if(arr[item] instanceof Object) {
                            result += this.stringify(arr[item]) + ",";
                        } else {
                            result += arr[item] + ",";
                        }
                    }
                    result = result.slice(0, -1) + "],"
 
                } else if(obj[key] instanceof Object) {} else {
                    result += "\"" + key + "\":" + obj[key] + ",";
                }
            }
            return "{" + result.slice(0, -1) + "}";
        }
    };
}

//2.element.children能够获取元素的元素子节点，但是低版本的ie不支持，如何在低版本的ie上兼容类似的功能。
function getElementChildren(element){
    if(!element.children){
        var element_arr = [];
        var list = element.ChildNodes;
        for(i=0; i<list.length; i++){
            if (list[i].nodetype==1) {
                element_arr.push(list[i]);
            }
        }
        return element_arr;
    } else{
        return element.children;
    }
}

//3.element.dataset能够获取元素的自定义属性，但是低版本的ie不支持，如何在低版本的ie上兼容类似的功能。
function dataset(element) {
	var obj = {};
	if(element.dataset) {
		return element.dataset;
	} else { // console.log(element.attributes);
		for(var i = 0; i < element.attributes.length; i++) {
			var key = element.attributes[i].nodeName;
			if(/^data-\w+$/.test(key)) { //判断是否以data-开头的属性名
				var value = element.attributes[i].nodeValue; //值
				var keyName = key.match(/^data-(\w+)/)[1]; //键名
				obj[keyName] = value; //对象添加属性
			}
		}
	}
	return obj;
}
//4.window.getComputedStyle能够获取元素的实际样式，但是低版本的ie8及以下不支持，如何在低版本的ie上兼容类似的功能。
//获取当前样式
function getStyle(element, att) {
	//特性侦测
	if(window.getComputedStyle) {
		//优先使用W3C规范
		return window.getComputedStyle(element)[att];
	} else {
		//针对IE9以下兼容
		return element.currentStyle[att];
	}
}